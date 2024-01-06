import { generateUid } from "api/utils/functions";
import BaseModel from "./BaseModel";

class Rating extends BaseModel {
    public challenge: string;
    public difficulty: number;

    constructor(data: Partial<Rating> = {}) {
        const {
            uid = generateUid("rtng-"),
            challenge = "",
            difficulty = 1,
            ...rest
        } = data;
        super(rest);

        this.uid = uid;
        this.challenge = challenge;
        this.difficulty = Math.round(Math.min(Math.max(1, difficulty), 100));
    }
}

export default Rating;
export { Rating };
