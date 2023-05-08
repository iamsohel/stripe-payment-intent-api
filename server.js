const express = require("express");
const cors = require("cors");
const app = express();
// This is a public sample test API key.
const stripe = require("stripe")('');

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  return 2000;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    customer: "",
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));