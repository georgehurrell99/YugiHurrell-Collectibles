export default async function handler(req, res) {
  const shop = process.env.SHOPIFY_SHOP;
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  // Check that the required environment variables exist.
  if (!shop || !clientId || !clientSecret) {
    return res.status(500).json({
      error: "Shopify configuration is incomplete",
      details:
        "Check SHOPIFY_SHOP, SHOPIFY_CLIENT_ID and SHOPIFY_CLIENT_SECRET in Vercel.",
    });
  }

  // Accept either the shop name or its myshopify.com domain.
  const shopName = shop
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/$/, "")
    .replace(/\.myshopify\.com$/i, "");

  const shopDomain = `${shopName}.myshopify.com`;
  const apiVersion = "2026-07";

  try {
    // 1. Authenticate with Shopify.
    const tokenResponse = await fetch(
      `https://${shopDomain}/admin/oauth/access_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Shopify authentication failed:", tokenData);

      return res.status(502).json({
        error: "Failed to authenticate with Shopify",
        details: tokenData.error || "Shopify did not return an access token.",
      });
    }

    // 2. Retrieve every page of products.
    const allProducts = [];

    let nextUrl =
      `https://${shopDomain}/admin/api/${apiVersion}/products.json?limit=250`;

    while (nextUrl) {
      // Prevent the access token from being sent to another domain.
      const parsedUrl = new URL(nextUrl);

      if (
        parsedUrl.hostname !== shopDomain ||
        parsedUrl.protocol !== "https:" ||
        !parsedUrl.pathname.includes(
          `/admin/api/${apiVersion}/products.json`
        )
      ) {
        throw new Error("Shopify returned an unexpected pagination URL.");
      }

      const productsResponse = await fetch(nextUrl, {
        headers: {
          "X-Shopify-Access-Token": tokenData.access_token,
          "Content-Type": "application/json",
        },
      });

      const productsData = await productsResponse.json();

      if (!productsResponse.ok) {
        console.error(
          "Shopify product retrieval failed:",
          productsResponse.status,
          productsData
        );

        return res.status(502).json({
          error: "Failed to retrieve Shopify products",
          details:
            productsData.errors ||
            productsData.error ||
            "Shopify returned an unsuccessful response.",
        });
      }

      if (!Array.isArray(productsData.products)) {
        throw new Error("Shopify returned an unexpected products response.");
      }

      // Add this page to the complete product list.
      allProducts.push(...productsData.products);

      // Shopify supplies the next-page URL in the Link response header.
      const linkHeader = productsResponse.headers.get("link");

      nextUrl = null;

      if (linkHeader) {
        const nextLink = linkHeader
          .split(",")
          .find((link) => link.includes('rel="next"'));

        if (nextLink) {
          const match = nextLink.match(/<([^>]+)>/);

          if (match) {
            nextUrl = match[1];
          }
        }
      }
    }

    // 3. Return the same response structure as the existing API.
    res.setHeader("Cache-Control", "no-store");

    return res.status(200).json({
      products: allProducts,
    });
  } catch (error) {
    console.error("Shopify products API error:", error);

    return res.status(500).json({
      error: "Server error while retrieving Shopify products",
      details: error.message,
    });
  }
}
