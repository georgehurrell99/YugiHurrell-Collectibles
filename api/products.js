export default async function handler(req, res) {
  const shop = process.env.SHOPIFY_SHOP;
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  return res.status(200).json({
    shop,
    shopUrl: `https://${shop}.myshopify.com`,
    hasClientId: !!clientId,
    hasClientSecret: !!clientSecret,
    clientIdLength: clientId ? clientId.length : 0,
    clientSecretLength: clientSecret ? clientSecret.length : 0,
  });
}
