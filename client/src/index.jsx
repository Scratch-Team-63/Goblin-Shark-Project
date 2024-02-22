import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import "./input.css";
// import "./styles.scss";
import "tailwindcss/tailwind.css";
// import {NextUIProvider} from "@nextui-org/react";

const mountNode = document.getElementById("root");
createRoot(mountNode).render(<App/>);