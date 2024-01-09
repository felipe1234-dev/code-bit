import { useState, useMemo } from "react";
import { IconButton, Menu, MenuItem, Avatar } from "@mui/material";

import { useAuth, useI18n, useLoader, useNavigation } from "providers";
import { getNameInitials } from "utils/functions";
import { User } from "api/models";

import styles from "./styles.module.scss";

const menuProps = {
    anchorOrigin: {
        vertical: "bottom" as "bottom",
        horizontal: "left" as "left",
    },
    transformOrigin: {
        vertical: "top" as "top",
        horizontal: "left" as "left",
    },
};

function UserAvatar() {
    const [userAnchorEl, setUserAnchorEl] = useState<HTMLButtonElement | null>(
        null
    );

    const { user, logout } = useAuth();
    const { translate, ...i18n } = useI18n();
    const { navigate } = useNavigation();
    const loader = useLoader();

    const userMenuOpen = Boolean(userAnchorEl);

    const handleOpenUserMenu = (evt: React.MouseEvent<HTMLButtonElement>) => {
        setUserAnchorEl(evt.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setUserAnchorEl(null);
    };

    const handleLogout = async () => {
        loader.show();

        try {
            handleCloseUserMenu();
            await logout();
            navigate("/");
        } finally {
            loader.hide();
        }
    };

    const handleProfile = () => {
        if (!user) return;
        navigate(`/profile/${user.uid}`);
    };

    const nameInitials = useMemo(() => {
        if (!user) return "";
        return getNameInitials(user.fullName);
    }, [user]);

    if (!user) return <></>;

    return (
        <>
            <IconButton
                className={styles.UserAvatar}
                onClick={handleOpenUserMenu}
            >
                <Avatar
                    className={styles.UserAvatarPhoto}
                    src={user.photo}
                    alt={user.fullName}
                >
                    {nameInitials}
                </Avatar>
                <span>{user.firstName}</span>
            </IconButton>
            <Menu
                anchorEl={userAnchorEl}
                open={userMenuOpen}
                onClose={handleCloseUserMenu}
                {...menuProps}
            >
                <MenuItem onClick={handleProfile}>
                    {translate("Seu perfil")}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    {translate("Sair da conta")}
                </MenuItem>
            </Menu>
        </>
    );
}

export default UserAvatar;
export { UserAvatar };
