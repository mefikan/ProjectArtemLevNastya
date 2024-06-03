import {$authHost, $host} from "./index";

export const createDish = async (dish) => {
    const {data} = await $authHost.post('api/dish/create', dish)
    return data
}

export const createDishWithProps = async (dish) =>{
    const {data} = await $authHost.post('api/dish/createWithProps', dish)
    return data
}