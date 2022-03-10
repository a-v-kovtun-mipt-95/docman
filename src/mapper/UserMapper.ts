import { UserDomainModel, UserPlainObject } from "../model/useUserModel";

export function mapUserFromDomainModelToPlainObject(model: UserDomainModel): UserPlainObject {
    return {
        id: model._id,
        email: model.email,
        status: model.status,
        created: model.created,
        version: model.__v,
    }
}

export function mapUserFromPlainObjectToDomainModel(obj: UserPlainObject): UserDomainModel {
    return {
        email: obj.email,
        status: obj.status,
    }
}