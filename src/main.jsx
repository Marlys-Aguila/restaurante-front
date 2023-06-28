import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <App />
  </StrictMode>
);
