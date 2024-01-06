import { generateUid } from "api/utils/functions";
import BaseModel from "./BaseModel";

class Challenge extends BaseModel {
    public incremental: number;
    public title: string;
    public description: string;
    public tests: string[];
    public code: string;
    public categories: string[];
    public tags: string[];
    public difficulty: number;

    constructor(data: Partial<Challenge> = {}) {
        const {
            uid = generateUid("chlg-"),
            incremental = 1,
            title = "",
            description = "",
            tests = [],
            code = "",
            categories = [],
            tags = [],
            difficulty = 50,
            ...rest
        } = data;
        super(rest);

        this.uid = uid;
        this.incremental = incremental;
        this.title = title;
        this.description = description;
        this.tests = tests;
        this.code = code;
        this.categories = categories;
        this.tags = tags;
        this.difficulty = Math.round(Math.min(Math.max(1, difficulty), 100));
    }
}

export default Challenge;
export { Challenge };
