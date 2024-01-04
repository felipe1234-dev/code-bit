import logo from "assets/images/logo.svg";
import styles from "./styles.module.scss";

function Home() {
    return (
        <div className={styles.Home}>
            <header className={styles.HomeHeader}>
                <img
                    className={styles.HomeLogo}
                    src={logo}
                    alt="logo"
                />
                <p>
                    Edit <code>src/Home.tsx</code> and save to reload.
                </p>
                <a
                    className={styles.HomeLink}
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default Home;
export { Home };
