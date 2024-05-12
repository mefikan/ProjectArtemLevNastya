
const path = require('path')
const {Dish, Foodproperty, User} = require('../models/models')
const ApiError = require('../error/ApiError')
const {where} = require("sequelize");
const jwt = require("jsonwebtoken");

async function get_user_id(token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const email = decoded["email"]
    let userInfo
    if (email)
        userInfo = await User.findOne({where: {
                email: email
            }})
    let userId = userInfo["dataValues"]["idUser"]
    return userId
}

class DishController
{
    async dishAddProperty(req, res, next) {
        const {propertyname, idDish} = req.body
        const property = Foodproperty.create({
            propertyname: propertyname,
            DishIdDish: idDish
        })
        return res.json(property)
    }
    async create(req, res, next) {
        const {dishName, dishSize} = req.body
        const token = req.headers.authorization.split(' ')[1]
        const UserIdUser = await get_user_id(token)
        const dish = await Dish.create({dishName, dishSize})
        return res.json(dish)
    }
    async getOne(req, res, next) {
        const {idDish} = req.body
        let dish
        if (idDish) {
            dish = await Dish.findOne(
                {
                    where: {
                        idRestaurant: idDish
                    }
                }
            )
        }
        return res.json(dish)
    }
    async getAll(req, res, next){
        const token = req.headers.authorization.split(' ')[1]
        const userId = await get_user_id(token)

        const dishes = await Dish.findAll()

        return res.json(dishes)
    }
}

module.exports = new DishController()