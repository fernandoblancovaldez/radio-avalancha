import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const $promo = document.querySelector(
  'a[title="Hosted on free web hosting 000webhost.com. Host your own website for FREE."]'
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

document.addEventListener("DOMContentLoaded", () => {
  $promo.innerHTML = "";
});
