import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._userToken = {}
        this._choice = []
        this._tag=''
        this._finalDish=[]
        this._usedIndexes=[]
        this._restaurants = []
        makeAutoObservable(this)
    }
    setRestaurants(restaurants){
        this._restaurants = restaurants
    }
    get Restaurants(){
        return this._restaurants
    }
    addUsedIndexes(index){
        this._usedIndexes.push(index)
    }
    clearUsedIndexes(){
        this._usedIndexes=[]
    }
    get UsedIndexes(){
        return this._usedIndexes
    }
    setTag(tag){
        this._tag = tag
    }
    get tag()
    {
        return this._tag
    }
    setFinalDish(dishName){
        this._finalDish = dishName
    }
    get finalDish(){
        return this._finalDish
    }
    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(userToken) {
        this._userToken = userToken
    }
    clearChoice()
    {
        this._choice = []
    }
    get choice()
    {
        return this._choice
    }
    addToChoice(property)
    {
        this._choice.push(property)
    }
    get isAuth() {
        return this._isAuth
    }
    get userToken() {
        return this._userToken
    }
}