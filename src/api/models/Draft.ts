import { generateUid, toDate } from "api/utils/functions";
import Challenge from "./Challenge";

class Draft extends Challenge {
    public lastSavedAt: Date;
    public published: boolean;
    public publishedAt?: Date;

    constructor(data: Partial<Draft> = {}) {
        const {
            uid = generateUid("drft-"),
            lastSavedAt = new Date(),
            published = false,
            publishedAt,
            ...rest
        } = data;
        super(rest);

        this.uid = uid;
        this.lastSavedAt = toDate(lastSavedAt);
        this.published = !!published;
        if (publishedAt) this.publishedAt = toDate(publishedAt);
    }
}

export default Draft;
export { Draft };
