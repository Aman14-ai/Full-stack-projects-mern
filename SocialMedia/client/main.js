import React from "react";
import { createRoot } from "react-dom/client";
import HelloWorld from "./HelloWorld.js";

const rootElement = document.getElementById("root");
const reactRoot = createRoot(rootElement);

reactRoot.render(<HelloWorld />);

// Enable Hot Module Replacement (HMR) with Fast Refresh
if (import.meta.webpackHot) {
    import.meta.webpackHot.accept();
}
