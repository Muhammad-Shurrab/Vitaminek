exports.getPayPalClientId = (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
};
