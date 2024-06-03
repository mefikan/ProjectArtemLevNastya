
const path = require('path')
const {Dish, Foodproperty, User} = require('../models/models')
const ApiError = require('../error/ApiError')
const {where} = require("sequelize")
const jwt = require("jsonwebtoken")
const uuid = require('uuid')

async function get_user_id(token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const email = decoded["email"]
    let userInfo
    if (email)
        userInfo = await User.findOne({where: {
                email: email
            }})
    return userInfo["dataValues"]["idUser"]
}

class DishController
{
    async dishAddProperty(req, res, next) {
        const {propertyname, idDish} = req.body
        const property = await Foodproperty.create({
            propertyname: propertyname,
            DishIdDish: idDish
        })
        return res.json(property)
    }
    async create(req, res, next) {
        try {
            let {dishName, dishSize, dishTag, description, dishPrice, dishRating, RestaurantIdRestaurant} = req.body
            const {img} = req.files
            let filename = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', filename))
            const dish = await Dish.create(
                {dishName, dishSize, dishTag, image: filename, description,
                    dishPrice: dishPrice, ratesNumber: 0, dishRating: dishRating, RestaurantIdRestaurant: RestaurantIdRestaurant})
            return res.json(dish)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async createAndSet5Properties(req, res, next){
        try {
            let {dishName, dishSize, dishTag, description, dishPrice, dishRating, p1, p2, p3, p4, p5, RestaurantIdRestaurant} = req.body
            const {img} = req.files
            let filename = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', filename))
            const dish = await Dish.create(
                {dishName, dishSize, dishTag, image: filename, description,
                    dishPrice: dishPrice, ratesNumber: 0, dishRating: dishRating, RestaurantIdRestaurant: RestaurantIdRestaurant})
            let dishId = dish.dataValues.idDish
            await Foodproperty.create({
                propertyname: p1,
                DishIdDish: dishId
            })
            await Foodproperty.create({
                propertyname: p2,
                DishIdDish: dishId
            })
            await Foodproperty.create({
                propertyname: p3,
                DishIdDish: dishId
            })
            await Foodproperty.create({
                propertyname: p4,
                DishIdDish: dishId
            })
            await Foodproperty.create({
                propertyname: p5,
                DishIdDish: dishId
            })


            return res.json(dish)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
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