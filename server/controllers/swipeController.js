
const path = require('path')
const {Swipe, Foodproperty, User} = require('../models/models')
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

class SwipeController
{
    async swipeAddProperty(req, res, next) {
        const {propertyname} = req.body
        const token = req.headers.authorization.split(' ')[1]
        const idUser = await get_user_id(token)
        const {Op} = require('sequelize')
        const neededSwipe = await Swipe.findOne(
            {
                where:
                    {
                        [Op.and]: [
                            {
                                idswipes: {
                                    [Op.eq]: await Swipe.max('idswipes')
                                }
                            },
                            {
                                UserIdUser: {
                                    [Op.eq]: idUser
                                }
                            }
                        ]
                    }
            }
        )
        const neededSwipeId = neededSwipe['dataValues']['idswipes']
        const property = await Foodproperty.create({
            propertyname: propertyname,
            swipeIdswipes: neededSwipeId
        })
        return res.json(property)
    }
    async create(req, res, next) {
        const {tag} = req.body
        const token = req.headers.authorization.split(' ')[1]
        const UserIdUser = await get_user_id(token)
        const swipe = await Swipe.create({tag, UserIdUser})
        return res.json(swipe)
    }
    /*переделать так, чтобы подавался id пользователя и
    выдавался самый новый свайп пользователя или где
    максимальный id свайпа у пользователя*/
    async getOne(req, res, next) {
        const {idswipes} = req.body
        let swipe
        if (idswipes) {
            swipe = await Swipe.findOne(
                {
                    where: {
                        idswipes: idswipes
                    }
                }
            )
        }
        return res.json(swipe)
    }
    async getAll(req, res, next){
        const token = req.headers.authorization.split(' ')[1]
        const userId = await get_user_id(token)

        const swipes = await Swipe.findAll({where:
                {
                    UserIdUser: userId
                }})

        return res.json(swipes)
    }
}

module.exports = new SwipeController()