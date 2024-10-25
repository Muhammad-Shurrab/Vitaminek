// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   useStripe,
//   useElements,
//   CardElement,
// } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe("your-stripe-public-key");

// function CheckoutForm() {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement),
//     });

//     if (!error) {
//       // Handle successful payment method creation
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// }

// export default function Checkout() {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// }

import React from "react";
import {
  Button,
  Input,
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";

export default function Checkout() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardBody>
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-4 text-center"
          >
            Checkout
          </Typography>
          <form className="space-y-4">
            <Input label="Name" size="lg" required />
            <Input label="Email" type="email" size="lg" required />
            <Input label="Shipping Address" size="lg" required />
            <Input label="Credit Card Number" type="text" size="lg" required />
            <Input
              label="Expiration Date"
              type="text"
              size="lg"
              placeholder="MM/YY"
              required
            />
            <Input label="CVV" type="text" size="lg" required />
          </form>
          <Button color="lightBlue" className="mt-4 w-full" size="lg">
            Pay
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
