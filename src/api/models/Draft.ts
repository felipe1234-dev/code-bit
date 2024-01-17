import { generateUid, toDate } from "api/utils/functions";
import Challenge from "./Challenge";

class Draft extends Challenge {
    public lastSavedAt: Date;

    constructor(data: Partial<Draft> = {}) {
        const {
            uid = generateUid("drft-"),
            lastSavedAt = new Date(),
            ...rest
        } = data;
        super(rest);
        
        this.uid = uid;
        this.lastSavedAt = toDate(lastSavedAt);
    }
}

export default Draft;
export { Draft };
