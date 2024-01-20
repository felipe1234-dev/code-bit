import React, { forwardRef } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    ButtonProps,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import { useModal, useI18n } from "providers";

import styles from "./styles.module.scss";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return (
        <Slide
            direction="up"
            ref={ref}
            {...props}
        />
    );
});

interface ModalProps {
    visible: boolean;
    title?: React.ReactNode;
    description?: React.ReactNode;
    buttons?: ButtonProps[];
    hide?: () => void;
    variant?: "success" | "error" | "warning" | "info";
}

function Modal(props: ModalProps) {
    const { visible, title, description, buttons = [], hide, variant } = props;
    const { translate } = useI18n();
    const modal = useModal();

    const handleHide = () => {
        if (!hide) {
            modal.hide();
        } else {
            hide();
        }
    };

    return (
        <Dialog
            keepMounted
            open={visible}
            TransitionComponent={Transition}
            onClose={handleHide}
            PaperProps={{
                className: styles.Modal,
                "data-variant": variant,
            }}
            sx={{
                zIndex: 9999,
            }}
        >
            {title && (
                <DialogTitle>
                    {typeof title === "string" ? translate(title) : title}
                </DialogTitle>
            )}
            <DialogContent>
                {description && (
                    <DialogContentText>
                        {typeof description === "string"
                            ? translate(description)
                            : description}
                    </DialogContentText>
                )}
            </DialogContent>
            <DialogActions>
                {buttons.map((buttonProps) => (
                    <Button {...buttonProps} />
                ))}
            </DialogActions>
        </Dialog>
    );
}

export default Modal;
export { Modal };
export type { ModalProps };
