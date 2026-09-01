export default async function handler(req, res) {
  const shop = "cttn1c-aj.myshopify.com";

  try {
    // Step 1: Get an access token from Shopify
    const tokenResponse = await fetch(
      `https://${shop}/admin/oauth/access_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: process.env.SHOPIFY_CLIENT_ID,
          client_secret: process.env.SHOPIFY_CLIENT_SECRET,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      return res.status(tokenResponse.status).json({
        error: "Failed to get Shopify access token",
        details: tokenData,
      });
    }

    // Step 2: Use the access token to retrieve products
    const response = await fetch(
      `https://${shop}/admin/api/2025-01/products.json`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": tokenData.access_token,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      return res.status(response.status).json({
        error: "Failed to retrieve Shopify products",
        details: errorText,
      });
    }

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
}
