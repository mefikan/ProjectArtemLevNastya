import {$authHost, $host} from "./index";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password})
    return data.token
}
export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return data.token
}
export const check = async () => {
    const {data} = await $host.post('api/user/registration')
    localStorage.setItem('token', data.token)
    return data.token
}
export  const createSwipeWithProps = async (tag, ch1, ch2, ch3, ch4) =>{
    const {data} = await $authHost.post('api/swipe/addProperties', {tag: tag, ch1: ch1, ch2: ch2, ch3: ch3, ch4: ch4})
    return data
}
export  const getDish = async () =>{
    const data = await $authHost.get('api/swipe/getDish')
    return data.data[0]
}