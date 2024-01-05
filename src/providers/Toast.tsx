import { createContext, useContext, ReactNode } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import i18n, { ReplaceMatrix } from "i18n";
import "react-toastify/dist/ReactToastify.css";

type Text = string | [string, ReplaceMatrix];

interface ToastValue {
    show: (text: Text, params?: ToastOptions) => void;
    success: (text: Text, params?: ToastOptions) => void;
    error: (text: Text, params?: ToastOptions) => void;
    info: (text: Text, params?: ToastOptions) => void;
}

const ToastContext = createContext<ToastValue | undefined>(undefined);

function ToastProvider(props: { children: ReactNode }) {
    const show = (text: Text, params?: ToastOptions) => {
        if (Array.isArray(text)) {
            text = i18n(...text);
        } else {
            text = i18n(text);
        }

        toast(text, params);
    };

    const success = (text: Text, params?: ToastOptions) => {
        show(text, {
            ...params,
            type: "success",
        });
    };

    const error = (text: Text, params?: ToastOptions) => {
        show(text, {
            ...params,
            type: "error",
        });
    };

    const info = (text: Text, params?: ToastOptions) => {
        show(text, {
            ...params,
            type: "info",
        });
    };

    return (
        <ToastContext.Provider value={{ show, success, error, info }}>
            {props.children}
            <ToastContainer />
        </ToastContext.Provider>
    );
}

function useToast() {
    const context = useContext(ToastContext);
    if (!context)
        throw new Error("useToast must be used within a ToastProvider");
    return context;
}

export { ToastContext, ToastProvider, useToast };
export type { ToastValue, ToastOptions };