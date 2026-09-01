export default async function handler(req, res) {
  const shop = process.env.SHOPIFY_SHOP;
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  try {
    // 1. Get a temporary Shopify access token
    const tokenResponse = await fetch(
      `https://${shop}.myshopify.com/admin/oauth/access_token`,
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

    if (!tokenResponse.ok) {
      return res.status(tokenResponse.status).json({
        error: "Failed to authenticate with Shopify",
        details: tokenData,
      });
    }

    // 2. Get products from Shopify
    const productsResponse = await fetch(
      `https://${shop}.myshopify.com/admin/api/2026-07/products.json`,
      {
        headers: {
          "X-Shopify-Access-Token": tokenData.access_token,
          "Content-Type": "application/json",
        },
      }
    );

    const productsData = await productsResponse.json();

    if (!productsResponse.ok) {
      return res.status(productsResponse.status).json({
        error: "Failed to retrieve Shopify products",
        details: productsData,
      });
    }

    // 3. Return Shopify products to your website
    return res.status(200).json(productsData);

  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
}
