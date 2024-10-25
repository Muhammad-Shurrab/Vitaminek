const Stripe = require("stripe");
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  const { amount } = req.body;
  const { email } = req.user;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: "usd",
      receipt_email: email,
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
