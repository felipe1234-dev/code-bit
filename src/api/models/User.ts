import { generateUid } from "api/utils/functions";
import BaseModel from "./BaseModel";

class User extends BaseModel {
    public firstName: string;
    public lastName: string;
    public email: string;
    public bio: string;
    public photo: string;
    public cover: string;
    public hashedPassword: string;
    public salt: string;
    public xp: number;
    public level: number;
    public online: boolean;
    public authId: string;

    constructor(data: Partial<User> = {}) {
        const {
            uid = generateUid("user-"),
            firstName = "",
            lastName = "",
            email = "",
            bio = "",
            photo = "",
            cover = "",
            hashedPassword = "",
            salt = "",
            xp = 0,
            level = 0,
            online = false,
            authId = "",
            ...rest
        } = data;
        super(rest);

        this.uid = uid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.bio = bio;
        this.photo = photo;
        this.cover = cover;
        this.hashedPassword = hashedPassword;
        this.salt = salt;
        this.xp = xp;
        this.level = level;
        this.online = !!online;
        this.authId = authId;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`
            .replace(/[\s]+/g, " ")
            .trim();
    }
}

export default User;
export { User };
