import {DragHandleOutlined as HandleIcon } from '@mui/icons-material';
import { Resizable as ReactResizable, ResizableProps } from "react-resizable";
import styles from "./styles.module.scss";

function Resizable(props: ResizableProps) {
    const { axis = "both", height = 0, width = 0, ...rest } = props;

    return (
        <ReactResizable
            axis={axis}
            width={width}
            height={height}
            {...rest}
            handle={
                <div
                    className={styles.ResizableHandle}
                    data-axis={axis}
                >
                    <HandleIcon />
                </div>
            }
        />
    );
}

export default Resizable;
export { Resizable };
export type { ResizableProps };
