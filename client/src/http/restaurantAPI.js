import {$authHost, $host} from "./index";

export const createRestaurant = async (restaurant) => {
    const {data} = await $authHost.post('api/restaurant/create', restaurant)
    return data
}
export const getAllRestaurants = async () => {
    const {data} = await $authHost.get('api/restaurant/getAll')
    return data
}