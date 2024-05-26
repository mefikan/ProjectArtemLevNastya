import axios from "axios";
import {Context} from "../index";
import {useContext} from "react";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const AuthInterceptor = config => {
    let {User} = useContext(Context)
    let token= User.User()
    config.headers.authorization = `Bearer ${token}`
    return config
}

$authHost.interceptors.request.use(AuthInterceptor)

export {
    $host,
    $authHost
}