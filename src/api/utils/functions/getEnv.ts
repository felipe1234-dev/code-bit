function getEnv(prop: string) {
    return process.env[`REACT_APP_${prop}`];
}

export default getEnv;
export { getEnv };
