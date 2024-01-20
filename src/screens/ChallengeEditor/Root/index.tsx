import { useEffect, useMemo, useState } from "react";

import { useWindowSize } from "hooks";
import { Resizable } from "components";
import { Header, Instructions, Code, Tests } from "../components";

import styles from "./styles.module.scss";

function Root() {
    const [windowWidth, windowHeight] = useWindowSize();
    const [leftPanelWidth, setLeftPanelWidth] = useState(0);
    const [topPanelHeight, setTopPanelHeight] = useState(0);

    const rightPanelWidth = useMemo(() => {
        return windowWidth - leftPanelWidth;
    }, [windowWidth, leftPanelWidth]);

    const bottomPanelHeight = useMemo(() => {
        return windowHeight - topPanelHeight;
    }, [windowHeight, topPanelHeight]);

    useEffect(() => {
        setLeftPanelWidth(windowWidth / 2);
    }, [windowWidth]);

    useEffect(() => {
        setTopPanelHeight(windowHeight / 2);
    }, [windowHeight]);

    return (
        <div className={styles.Editor}>
            <Header />
            <div className={styles.EditorPanels}>
                <Resizable
                    axis="x"
                    onResize={(_, { size }) => setLeftPanelWidth(size.width)}
                    width={leftPanelWidth}
                >
                    <article
                        className={styles.EditorPanel}
                        style={{ width: leftPanelWidth }}
                    >
                        <Instructions />
                    </article>
                </Resizable>
                <aside
                    className={styles.EditorPanel}
                    style={{ width: rightPanelWidth }}
                >
                    <Resizable
                        axis="y"
                        onResize={(_, { size }) =>
                            setTopPanelHeight(size.height)
                        }
                        height={topPanelHeight}
                    >
                        <div
                            className={styles.EditorPanel}
                            style={{ height: topPanelHeight }}
                        >
                            <Code />
                        </div>
                    </Resizable>
                    <div
                        className={styles.EditorTests}
                        style={{ height: bottomPanelHeight }}
                    >
                        <Tests />
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Root;
