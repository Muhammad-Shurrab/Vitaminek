import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import store from "./store.js";
import { ThemeProvider } from "@material-tailwind/react";
ThemeProvider;
const paypalOptions = {
  "client-id":
    "AQqIkq6cI_lSJjn4C8PPnlOpliftd5aNrFWHmv-2PVOJQPq9_4Ki_fcUu6NkedyLjBaEDf90O_XSEu5Y", // Store this in your .env file
  currency: "USD",
  intent: "capture",
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
