import React, { createContext, useContext, useMemo } from "react";
import {
    useLocation,
    Location,
    useNavigate,
    NavigateFunction,
} from "react-router-dom";

import routes from "constants/routes";

type Route = (typeof routes)[number];

interface NavigationValue {
    currentLocation: Location;
    currentRoute: Route | undefined;
    navigate: NavigateFunction;
}

const NavigationContext = createContext<NavigationValue | undefined>(undefined);

function NavigationProvider(props: { children: React.ReactNode }) {
    const currentLocation = useLocation();
    const navigate = useNavigate();

    const currentRoute = useMemo(() => {
        return routes.find((route) => route.path === currentLocation.pathname);
    }, [currentLocation]);

    return (
        <NavigationContext.Provider
            value={{
                currentRoute,
                currentLocation,
                navigate,
            }}
        >
            {props.children}
        </NavigationContext.Provider>
    );
}

function useNavigation() {
    const context = useContext(NavigationContext);
    if (!context)
        throw new Error(
            "useNavigation must be used within an NavigationProvider"
        );
    return context;
}

export { NavigationContext, NavigationProvider, useNavigation };
