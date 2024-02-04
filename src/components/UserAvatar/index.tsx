import { IconButton, Menu, MenuItem, Avatar } from "@mui/material";

import { useI18n } from "providers";
import { User } from "api/models";

import useUserAvatar from "./useUserAvatar";

import styles from "./styles.module.scss";

interface UserAvatarProps {
    user: User;
}

function UserAvatar(props: UserAvatarProps) {
    const { user } = props;
    const {
        menuProps,
        nameInitials,
        userMenuOpen,
        userAnchorEl,
        isAuthUser,
        handleOpenUserMenu,
        handleCloseUserMenu,
        handleOpenProfile,
        handleLogout,
    } = useUserAvatar(props);

    const { translate } = useI18n();

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
                <MenuItem onClick={handleOpenProfile}>
                    {translate(isAuthUser ? "Seu perfil" : "Perfil")}
                </MenuItem>
                {isAuthUser && (
                    <MenuItem onClick={handleLogout}>
                        {translate("Sair da conta")}
                    </MenuItem>
                )}
            </Menu>
        </>
    );
}

export default UserAvatar;
export { UserAvatar };
export type { UserAvatarProps };
