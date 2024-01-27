import React, { createContext, useContext, useState, ReactNode } from "react";
import { ModalProps } from "../components/Modal";
import { Optional } from "types";

type ModalOptions = Optional<ModalProps, "visible">;

interface ModalValue {
    modalProps: ModalProps;
    show: (params?: ModalOptions) => void;
    success: (params?: ModalOptions) => void;
    error: (params?: ModalOptions) => void;
    info: (params?: ModalOptions) => void;
    hide: () => void;
}

const ModalContext = createContext<ModalValue | undefined>(undefined);

function ModalProvider(props: { children: ReactNode }) {
    const [modalProps, setModalProps] = useState<ModalProps>({
        visible: false,
    });

    const show = (params?: ModalOptions) => {
        setModalProps({
            ...params,
            visible: true,
        });
    };

    const success = (params?: ModalOptions) => {
        show({
            ...params,
            variant: "success",
            visible: true,
        });
    };

    const error = (params?: ModalOptions) => {
        show({
            ...params,
            variant: "error",
            visible: true,
        });
    };

    const info = (params?: ModalOptions) => {
        show({
            ...params,
            variant: "info",
            visible: true,
        });
    };

    const hide = () => {
        setModalProps({ visible: false });
    };

    return (
        <ModalContext.Provider
            value={{ modalProps, show, success, error, info, hide }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}

function useModal() {
    const context = useContext(ModalContext);
    if (!context)
        throw new Error("useModal must be used within a ModalProvider");
    return context;
}

export { ModalContext, ModalProvider, useModal };
export type { ModalValue, ModalOptions };
