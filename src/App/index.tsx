import { Routes, Route } from "react-router-dom";
import ParticlesBg from "particles-bg";

import { AppHeader } from "components";
import { useNavigation } from "providers";
import routes from "constants/routes";

import styles from "./styles.module.scss";

function App() {
    const { currentRoute } = useNavigation();

    return (
        <div className={styles.App}>
            {!currentRoute?.hideHeader && <AppHeader />}
            <Routes>
                {routes.map((route) => (
                    <Route
                        key={route.key}
                        index={route.index}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
            <ParticlesBg
                bg
                color="#5f687b"
                num={20}
                type="cobweb"
            />
        </div>
    );
}

export default App;
