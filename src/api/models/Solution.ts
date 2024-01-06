import { generateUid } from "api/utils/functions";
import BaseModel from "./BaseModel";

class Solution extends BaseModel {
    public challenge: string;
    public code: string;
    public unblockedSolutions: boolean;
    public upvotes: string[];
    public downvotes: string[];

    constructor(data: Partial<Solution> = {}) {
        const {
            uid = generateUid("slt-"),
            challenge = "",
            code = "",
            unblockedSolutions = false,
            upvotes = [],
            downvotes = [],
            ...rest
        } = data;
        super(rest);

        this.uid = uid;
        this.challenge = challenge;
        this.code = code;
        this.unblockedSolutions = !!unblockedSolutions;
        this.upvotes = upvotes;
        this.downvotes = downvotes;
    }
}

export default Solution;
export { Solution };
