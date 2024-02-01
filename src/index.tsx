import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Composer } from "components";
import {
    I18nProvider,
    NavigationProvider,
    ToastProvider,
    ModalProvider,
    LoaderProvider,
    AuthProvider,
} from "providers";

import App from "./App";

import "assets/styles/reset.scss";
import "assets/styles/index.scss";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const providers = [
    BrowserRouter,
    I18nProvider,
    NavigationProvider,
    ToastProvider,
    ModalProvider,
    LoaderProvider,
    AuthProvider,
];

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <Composer components={providers}>
            <App />
        </Composer>
    </React.StrictMode>
);
