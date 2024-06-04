const path = require('path')
const {Restaurant, User} = require('../models/models')
const ApiError = require('../error/ApiError')
const {where, QueryTypes} = require("sequelize");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const sequelize = require('../db')
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

class RestaurantController
{
    async create(req, res, next) {
        try{
        const {name, rating, properties} = req.body
        const token = req.headers.authorization.split(' ')[1]
        const {img} = req.files
        let filename = uuid.v4() + ".jpg"
        await img.mv(path.resolve(__dirname, '..', 'static', filename))
        const restaurant = await Restaurant.create({name, rating, properties, image: filename})
        return res.json(restaurant)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getOne(req, res, next) {
        try {
            const {idRestaurant} = req.body
            const restaurant = await Restaurant.findOne({
                where: {
                    idRestaurant: idRestaurant
                }
            })
            console.log(restaurant)
            return res.json(restaurant["dataValues"])
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res, next){
        const token = req.headers.authorization.split(' ')[1]
        const userId = await get_user_id(token)

        const restaurants = await Restaurant.findAll()

        return res.json(restaurants)
    }
}

module.exports = new RestaurantController()