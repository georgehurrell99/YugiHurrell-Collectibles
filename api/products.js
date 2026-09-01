export default async function handler(req, res) {
  const shop = process.env.SHOPIFY_SHOP;
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  try {
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

    const tokenText = await tokenResponse.text();

    let tokenData;
    try {
      tokenData = JSON.parse(tokenText);
    } catch {
      return res.status(500).json({
        error: "Shopify returned a non-JSON authentication response",
        details: tokenText,
      });
    }

    if (!tokenResponse.ok) {
      return res.status(tokenResponse.status).json({
        error: "Failed to authenticate with Shopify",
        details: tokenData,
      });
    }

    const response = await fetch(
      `https://${shop}.myshopify.com/admin/api/2026-07/products.json`,
      {
        headers: {
          "X-Shopify-Access-Token": tokenData.access_token,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Failed to retrieve Shopify products",
        details: data,
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message,
      shop: shop,
    });
  }
}
