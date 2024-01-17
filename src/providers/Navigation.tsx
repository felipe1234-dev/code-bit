import React, { createContext, useContext, useMemo } from "react";
import {
    useLocation,
    Location,
    useNavigate,
    useParams,
    NavigateFunction,
} from "react-router-dom";

import routes from "constants/routes";

type Route = (typeof routes)[number];

interface NavigationValue {
    currentLocation: Location;
    currentRoute: Route | undefined;
    params: {
        [key: string]: string | undefined;
    };
    navigate: NavigateFunction;
}

const NavigationContext = createContext<NavigationValue | undefined>(undefined);

function NavigationProvider(props: { children: React.ReactNode }) {
    const currentLocation = useLocation();
    const navigate = useNavigate();

    const getPathParts = (path: string) => {
        return path.split("/").filter(Boolean);
    };

    const testRoute = (route: Route) => {
        return getPathParts(route.path).every((part, i) => {
            const locationParts = getPathParts(currentLocation.pathname);
            const isPattern = part.includes(":");

            if (isPattern) {
                const isOptional = part.includes("?");

                if (isOptional) return true;
                return !!locationParts[i];
            } else {
                return part === locationParts[i];
            }
        });
    };

    const currentRoute = useMemo(() => {
        const matches = routes.filter(testRoute);
        return matches[matches.length - 1];
    }, [currentLocation]);

    const params = useMemo(() => {
        if (!currentLocation || !currentRoute) return {};

        const pathParts = getPathParts(currentLocation.pathname);
        const params: { [key: string]: string | undefined } = {};

        for (const part of pathParts) {
            const i = pathParts.indexOf(part);
            const routePathPart = getPathParts(currentRoute.path)[i];

            const isPattern = routePathPart.includes(":");
            if (isPattern) {
                const property = routePathPart
                    .replace(":", "")
                    .replace("?", "");
                const value = part;
                params[property] = value;
            }
        }

        return params;
    }, [currentLocation, currentRoute]);

    return (
        <NavigationContext.Provider
            value={{
                currentRoute,
                currentLocation,
                params,
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
