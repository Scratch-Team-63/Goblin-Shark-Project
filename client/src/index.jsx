import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react"; 
import App from "./components/App.jsx";
// import "./styles.css";
// import "./styles.scss";
import "tailwindcss/tailwind.css";
// import {NextUIProvider} from "@nextui-org/react";

const mountNode = document.getElementById("root");
createRoot(mountNode).render(
<ChakraProvider>
<App/>
</ChakraProvider>
);