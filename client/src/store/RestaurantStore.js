import {makeAutoObservable} from "mobx";

export default class RestaurantStore {
    constructor() {
        this._name = ''
        this._rating = ''
        this._properties = ''
        makeAutoObservable(this)
    }
    setName(name){
        this._name = name
    }
    setRating(rating) {
        this._rating = rating
    }
    setProperties(props){
        this._properties = props
    }

    get Name(){
        return this._name
    }
    get Rating(){
        return this._rating
    }
    get Properties(){
        return this._properties
    }
}