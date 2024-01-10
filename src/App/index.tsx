import { Routes, Route } from "react-router-dom";
import ParticlesBg from "particles-bg";

import { AppHeader, Spinner } from "components";
import { useLoader, useNavigation } from "providers";
import routes from "constants/routes";

import styles from "./styles.module.scss";

function App() {
    const loader = useLoader();
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
            <Spinner
                open={loader.visible}
                onClose={loader.hide}
            />
            {currentRoute?.showParticlesBg && (
                <ParticlesBg
                    bg
                    color="#5f687b"
                    num={30}
                    type="cobweb"
                />
            )}
        </div>
    );
}

export default App;
