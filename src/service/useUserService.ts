import axios from "axios";
import { useEffect, useState } from "react";
import { SUCCESS } from "../constants/CommonConstants";
import { USER_ENDPOINT } from "../constants/UserConstants";
import { mapUserFromDomainModelToPlainObject, mapUserFromPlainObjectToDomainModel } from "../mapper/UserMapper";
import { User, UserDomainModel, UserList, useUserListModel, useUserModel } from "../model/useUserModel";

export interface UserService {
    add: () => void;
    clear: () => void;
    delete: () => void;
    getUser: () => User;
    getError: () => string;
    getMessage: () => string;
    refresh: () => void;
    update: () => void;
}

export function useUserService(id?: string): UserService {
    const user: User = useUserModel();
    const [version, setVersion] = useState(0);
    const [err, setErr] = useState('');
    const [mess, setMess] = useState('');

    useEffect(() => {
        if(id) {
            setMess('');
            axios.get<UserDomainModel>(`${USER_ENDPOINT}/${id}`)
            .then((res) => {
                user.fromPlainObject(mapUserFromDomainModelToPlainObject(res.data));
                setMess(SUCCESS);
            })
            .catch((err) => setErr(err));
        }
      }, [id]);

    function add() {
        setMess('');
        axios.post<UserDomainModel>(
            USER_ENDPOINT,
            mapUserFromPlainObjectToDomainModel(user.toPlainObject()),
        )
        .then((res) => {
            user.fromPlainObject(mapUserFromDomainModelToPlainObject(res.data));
            setMess(SUCCESS);
        })
        .catch((err) => setErr(err));
    }

    function update() {
        const uId = user.id.getValue();
        if(uId) {
            setMess('');
            axios.put<UserDomainModel>(
                `${USER_ENDPOINT}/${uId}`,
                mapUserFromPlainObjectToDomainModel(user.toPlainObject())
            )
            .then((res) => {
                user.fromPlainObject(mapUserFromDomainModelToPlainObject(res.data));
                setMess(SUCCESS);
            })
            .catch((err) => setErr(err));
        }
    }

    function del() {
        const uId = user.id.getValue();
        if(uId) {
            setMess('');
            axios.delete(`${USER_ENDPOINT}/${uId}`)
            .then((res) => {
                setMess(res.data);
                user.clear();
            })
            .catch((err) => setErr(err));;
        }
    }

    function refresh() {
        setVersion(version + 1);
    }

    return {
        add: add,
        clear: () => user.clear(),
        delete: del,
        getUser: () => user,
        getError: () => err,
        getMessage: () => mess,
        refresh: refresh,
        update: update,
    }
}

export interface UserListService {
    getAllUsers: () => UserList,
}

export function useUserListService(): UserListService {
    const allUsers: UserList = useUserListModel();
    useEffect(() => {
        axios.get<UserDomainModel[]>(USER_ENDPOINT).then((res)=>allUsers.fromPlainObject(res.data.map((userDomainModel) => mapUserFromDomainModelToPlainObject(userDomainModel))));
      });

    return {
        getAllUsers: () => allUsers,
    }
}