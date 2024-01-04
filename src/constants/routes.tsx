import { Home, Login, Register } from "screens";
import { Protected } from "components/Protected";

const routes = [
    {
        key: "home",
        index: true,
        hideHeader: false,
        path: "/",
        element: (
            <Protected>
                <Home />
            </Protected>
        ),
    },
    {
        key: "login",
        index: false,
        hideHeader: false,
        path: "/login",
        element: <Login />,
    },
    {
        key: "register",
        index: false,
        hideHeader: false,
        path: "/register",
        element: <Register />,
    },
];

export default routes;
export { routes };
