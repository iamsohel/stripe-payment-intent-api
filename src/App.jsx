import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("public key");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const callPayment = () => {
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bundleId: 1 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}

      {!clientSecret && (
        <button onClick={callPayment}>Recharge</button>
      )}

    </div>
  );
}