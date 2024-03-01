function deepCompare(a: any, b: any): boolean {
    if (typeof a !== typeof b) {
        return false;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }
        
        for (let i = 0; i < a.length; i++) {
            if (!deepCompare(a[i], b[i])) {
                return false;
            }
        }

        return true;
    }

    if (
        !!a &&
        a instanceof Object &&
        !!b &&
        b instanceof Object
    ) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);

        if (keysA.length !== keysB.length) {
            return false;
        }

        for (const key of keysA) {
            if (!keysB.includes(key)) {
                return false;
            }
            if (!deepCompare(a[key], b[key])) {
                return false;
            }
        }

        return true;
    }

    return a === b;
}

export default deepCompare;
export { deepCompare };
