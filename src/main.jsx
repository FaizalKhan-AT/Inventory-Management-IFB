import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import EditContext from "./contexts/EditContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <EditContext>
        <App />
      </EditContext>
    </BrowserRouter>
  </React.StrictMode>
);
