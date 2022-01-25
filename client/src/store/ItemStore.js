import {makeAutoObservable} from "mobx";

export default class ItemStore{
    constructor() {
        this._collections = [
            {id:1, name:"Lalala", description:"ijoerjoierjge"},
            {id:2, name:"Topola", description:"ijoerwewopfworwofwhejoierjge"}

        ]
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user){
        this._user = user
    }

    get isAuth(){
        return this._isAuth
    }

    get user(){
        return this._user
    }
}