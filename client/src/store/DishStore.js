import {makeAutoObservable} from "mobx";

export default class DishStore {
    constructor() {
        this._restaurantId = 1
        this._restaurants = []
        this._dishId = 0
        this._properties = []
        this._ = []
        makeAutoObservable(this)
    }
    setProperties(props){
        this._properties = props
    }
    setDishId(id){
        this._dishId = id
    }
    setRestaurants(restaurants) {
        this._restaurants = restaurants
    }
    setRestaurantId(id){
        this._restaurantId = id
    }
    get Properties(){
        return this._properties
    }
    get DishId(){
        return this._dishId
    }
    get RestaurantId(){
        return this._restaurantId
    }
    get Restaurants(){
        return this._restaurants
    }
}