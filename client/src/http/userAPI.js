import {$authHost, $host} from "./index";
import {useContext} from "react";
import {Context} from "../index";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password})
    return data.token
}
export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    return data.token
}
export const check = async () => {
    const {data} = await $host.post('api/user/registration')
    return data.token
}