import { ChallengeEditor, Challenges, Home, Login, Register } from "screens";
import { Protected } from "components/Protected";

const routes = [
    {
        key: "home",
        index: true,
        hideHeader: false,
        showParticlesBg: true,
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
        showParticlesBg: true,
        path: "/login",
        element: <Login />,
    },
    {
        key: "register",
        index: false,
        hideHeader: false,
        showParticlesBg: true,
        path: "/register",
        element: <Register />,
    },
    {
        key: "challenges",
        index: false,
        hideHeader: false,
        showParticlesBg: false,
        path: "/challenges",
        element: <Challenges />,
    },
    {
        key: "editor",
        index: false,
        hideHeader: false,
        showParticlesBg: true,
        path: "/editor/:draftUid?",
        element: (
            <Protected>
                <ChallengeEditor />
            </Protected>
        ),
    },
];

export default routes;
export { routes };
