import React from "react";
import reactDom from "react-dom";
import App from "./src/App";
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById("root"));
root.render(<App />);