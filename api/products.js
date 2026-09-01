export default async function handler(req, res) {
  const shop = process.env.SHOPIFY_SHOP;
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  const tokenUrl =
    `https://${shop}.myshopify.com/admin/oauth/access_token`;

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const responseText = await response.text();

    return res.status(200).json({
      tokenUrl,
      status: response.status,
      statusText: response.statusText,
      response: responseText,
    });

  } catch (error) {
    return res.status(500).json({
      tokenUrl,
      error: error.message,
      cause: error.cause
        ? {
            message: error.cause.message,
            code: error.cause.code,
          }
        : null,
    });
  }
}
