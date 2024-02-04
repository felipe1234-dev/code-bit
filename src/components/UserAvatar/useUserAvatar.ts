import { useState, useMemo } from "react";
import { useAuth, useLoader, useNavigation } from "providers";
import { getNameInitials } from "utils/functions";
import { UserAvatarProps } from "./index";

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

function useUserAvatar(props: UserAvatarProps) {
    const { user } = props;
    const { user: authUser, logout } = useAuth();
    const { navigate } = useNavigation();
    const loader = useLoader();

    const [userAnchorEl, setUserAnchorEl] = useState<HTMLButtonElement | null>(
        null
    );

    const isAuthUser = user.uid === authUser?.uid;
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

    const handleOpenProfile = () => {
        if (!user) return;
        navigate(`/profile/${user.uid}`);
    };

    const nameInitials = useMemo(() => {
        if (!user) return "";
        return getNameInitials(user.fullName);
    }, [user]);

    return {
        menuProps,
        userAnchorEl,
        isAuthUser,
        userMenuOpen,
        nameInitials,
        handleOpenUserMenu,
        handleCloseUserMenu,
        handleLogout,
        handleOpenProfile,
    };
}

export default useUserAvatar;
