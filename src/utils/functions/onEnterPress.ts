const onEnterPress =
    (callback: (evt: React.KeyboardEvent<HTMLInputElement>) => void) =>
    (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (evt.keyCode === 13 || evt.key === "Enter") {
            callback(evt);
        }
    };

export default onEnterPress;
export { onEnterPress };
