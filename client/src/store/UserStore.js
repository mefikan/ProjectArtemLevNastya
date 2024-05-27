import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._choice = []
        this._tag={}
        this._finalDish={}
        makeAutoObservable(this)
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

    setUser(user) {
        this._user = user
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
        return this._user
    }
}