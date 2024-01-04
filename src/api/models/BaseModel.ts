import { toDate, generateUid } from "api/utils/functions";

class BaseModel {
    public uid: string;
    public createdAt: Date;
    public createdBy: string;
    public deleted: boolean;
    public deletedAt?: Date;
    public deletedBy?: string;

    constructor(data: Partial<BaseModel> = {}) {
        const {
            uid = generateUid(),
            createdAt = new Date(),
            createdBy = "system",
            deleted = false,
            deletedAt,
            deletedBy,
        } = data;

        this.uid = uid;
        this.createdAt = toDate(createdAt);
        this.createdBy = createdBy;
        this.deleted = !!deleted;
        if (deletedAt) this.deletedAt = toDate(deletedAt);
        if (deletedBy) this.deletedBy = deletedBy;
    }
}

export default BaseModel;
export { BaseModel };
