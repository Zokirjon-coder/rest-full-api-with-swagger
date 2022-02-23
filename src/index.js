import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthContext from "./context/Auth";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContext>
      <App />
    </AuthContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
