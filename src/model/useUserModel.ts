import { useState } from 'react';
import { InputModel, SelectModel, useInputModel, useSelectModel } from '../core/models/InputModels';
import { TableModel } from '../core/models/TableModel';

export interface UserDomainModel {
    _id?: string;
    email: string | undefined;
    status?: string;
    created?: string;
    __v?: number;
}

export interface UserPlainObject {
    id?: string;
    email: string | undefined;
    status?: string;
    created?: string;
    version?: number;
}

export const DEFAULT_USER: UserPlainObject = {
    id: '',
    email: '',
    status: '',
    created: '',
    version: 0,
};

export enum UserStatus {
    active = 'active',
    blocked = 'blocked',
}

export interface User {
    id: InputModel<string>;
    email: InputModel<string>;
    status: SelectModel<string>;
    created: InputModel<string>;
    version: InputModel<number>;
    clear: () => void;
    fromPlainObject: (plainObject: UserPlainObject) => void;
    toPlainObject: () => UserPlainObject;
}

export function useUserModel(): User {
    const id = useInputModel<string>(DEFAULT_USER.id);
    const email = useInputModel<string>(DEFAULT_USER.email);
    const status = useSelectModel<string>(
        {value: UserStatus.active, label: UserStatus.active},
        [
            {value: UserStatus.active, label: UserStatus.active},
            {value: UserStatus.blocked, label: UserStatus.blocked},
        ],
    );
    const created = useInputModel<string>(DEFAULT_USER.created);
    const version = useInputModel<number>(DEFAULT_USER.version);

    function fromPlainObject(plainObject: UserPlainObject) {
        id.setValue(plainObject.id);
        email.setValue(plainObject.email);
        status.setValue(plainObject.status as UserStatus);
        created.setValue(plainObject.created);
        version.setValue(plainObject.version);
    }

    function toPlainObject(): UserPlainObject {
        return {
            id: id.getValue(),
            email: email.getValue(),
            status: status.getValue(),
            created: created.getValue(),
            version: version.getValue(),
        }
    }

    return {
        id: id,
        email: email,
        status: status,
        created: created,
        version: version,
        clear: () => fromPlainObject(DEFAULT_USER),
        fromPlainObject: fromPlainObject,
        toPlainObject: toPlainObject,
    }
}

export const DEFAULT_USER_LIST: UserPlainObject[] = [];

export interface UserList extends TableModel {
    clear: () => void;
    fromPlainObject: (plainObject: UserPlainObject[]) => void;
    toPlainObject: () => UserPlainObject[];
}

export function useUserListModel(): UserList {
    const [list, setList] = useState(DEFAULT_USER_LIST);
    return {
        clear: () => setList(DEFAULT_USER_LIST),
        fromPlainObject: setList,
        toPlainObject: () => list,
        getRows: () => list.map((user) => ({...user, id: user.id ? user.id : ''})),
    }
}