export default async function handler(req, res) {
  const shop = "cttn1c-aj.myshopify.com";

  try {
    const response = await fetch(
      `https://${shop}/admin/api/2025-01/products.json`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.SHOPIFY_CLIENT_SECRET,
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
