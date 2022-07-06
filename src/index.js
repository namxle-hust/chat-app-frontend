import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { VideoSocketContextProvider } from "./context/VideoSocketContext";
import "./styles/app.css";
import "./styles/app2.css";
import "./styles/app3.css";
import "./styles/app4.css";
import "./styles/icono.min.css";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <VideoSocketContextProvider>
        <App />
      </VideoSocketContextProvider>
    </AuthContextProvider> 
  </React.StrictMode>,
  document.getElementById("root")
);
