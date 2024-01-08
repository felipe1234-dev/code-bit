import { useState, useMemo, useEffect } from "react";
import { useWindowSize } from "hooks";
import { TextEditor, Resizable } from "components";
import styles from "./styles.module.scss";

function Panels() {
    const [windowWidth, windowHeight] = useWindowSize();
    const [leftPanelWidth, setLeftPanelWidth] = useState(windowWidth / 2);
    const [value, setValue] = useState("<h1>Hello!</h1>");

    const rightPanelWidth = useMemo(() => {
        return windowWidth - leftPanelWidth;
    }, [windowWidth, leftPanelWidth]);

    const handleChangeLeftPanelSize = (size: {
        width: number;
        height: number;
    }) => {
        const { width } = size;
        setLeftPanelWidth(width);
    };

    useEffect(() => {
        setLeftPanelWidth(windowWidth / 2);
    }, [windowWidth]);

    return (
        <div className={styles.Panels}>
            <Resizable
                axis="x"
                onResize={(_, { size }) => handleChangeLeftPanelSize(size)}
                width={leftPanelWidth}
                height={windowHeight}
            >
                <div
                    className={styles.PanelsLeft}
                    style={{ width: leftPanelWidth, height: windowHeight }}
                >
                    <TextEditor
                        onChange={setValue}
                        value={value}
                    />
                </div>
            </Resizable>

            <div
                className={styles.PanelsRight}
                style={{ width: rightPanelWidth, height: windowHeight }}
            ></div>
        </div>
    );
}

export default Panels;
export { Panels };
