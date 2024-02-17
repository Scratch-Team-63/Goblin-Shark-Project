import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
// import "./styles.css";
// import "./styles.scss";

const mountNode = document.getElementById("root");
createRoot(mountNode).render(<App/>);