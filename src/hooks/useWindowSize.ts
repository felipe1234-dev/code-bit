import { useState, useLayoutEffect } from "react";

function useWindowSize() {
    const [size, setSize] = useState<[width: number, height: number]>([0, 0]);

    const updateSize = () => {
        setSize([window.innerWidth, window.innerHeight]);
    };

    useLayoutEffect(() => {
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return size;
}

export default useWindowSize;
export { useWindowSize };
