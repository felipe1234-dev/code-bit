import { Routes, Route } from "react-router-dom";
import ParticlesBg from "particles-bg";

import { AppHeader, Spinner, Modal } from "components";
import { useLoader, useNavigation, useModal } from "providers";
import routes from "constants/routes";

import styles from "./styles.module.scss";

function App() {
    const { currentRoute } = useNavigation();
    const { modalProps } = useModal();
    const loader = useLoader();

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
            <Modal {...modalProps} />
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
