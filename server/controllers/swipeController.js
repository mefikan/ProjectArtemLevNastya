
const path = require('path')
const {Swipe, Foodproperty, SwipeFoodproperty, User} = require('../models/models')
const ApiError = require('../error/ApiError')
const {where, Op, QueryTypes} = require("sequelize");
const jwt = require("jsonwebtoken");

const sequelize = require('../db')
class SwipeController
{
    /*Свойство добавляется к текущему свайпу у пользователя,
    * то есть у которого самый большой id*/
    async swipeAddProperty(req, res, next) {
        const {propertyname} = req.body
        const token = req.headers.authorization.split(' ')[1]
        const swipeId = await getCurrentUserSwipeId(token)
        const property = await SwipeFoodproperty.create({
            propertyname: propertyname,
            SwipeIdswipes: swipeId
        })
        return res.json(property)
    }
    async chooseDish(req, res, next)
    {

    }
    /*Создание свайпа с привязкой к пользователю*/
    async create(req, res, next) {
        const {tag} = req.body
        const token = req.headers.authorization.split(' ')[1]
        const UserIdUser = await getUserId(token)
        const swipe = await Swipe.create({tag, UserIdUser})
        return res.json(swipe)
    }
    /**/
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
    /*Возвращает все свайпы пользователя*/
    async getAll(req, res, next){
        const token = req.headers.authorization.split(' ')[1]
        const userId = await getUserId(token)
        const swipes = await Swipe.findAll({where:
                {
                    UserIdUser: userId
                }})

        return res.json(swipes)
    }
    /*Возвращает все свойства текущего свайпа пользователя*/
    async getAllCurrentSwipeProperties(req, res, next)
    {
        const token = req.headers.authorization.split(' ')[1]
        const swipeId = await getCurrentUserSwipeId(token)
        const properties = await SwipeFoodproperty.findAll(
            {
                where: {
                    SwipeIdswipes: swipeId
                }
            }
        )
        return res.json(properties)
    }
    async getDishAccordingToSwipes(req, res, next){
        const token = req.headers.authorization.split(' ')[1]
        const swipeId = await getCurrentUserSwipeId(token)
        const {Op} = require('sequelize')
        /*
        Нужно найти максимум совпадений между свойствами свайпа и св-вами блюда
        Выберем свойства последнего свайпа и будем выбирать блюдо, имеющее
        максимум( КОЛИЧЕСТВО (свойство свайпа * свойство блюда), где названия свойств равны)
         */
        let FindDishInd = await sequelize.query(
            'SELECT MAX(gr.cnt), di."dishName" as DishName\n' +
            '\tFROM(\n' +
            '\t\tSELECT COUNT(*) as cnt, fp."DishIdDish" as did\n' +
            '\t\t\tFROM "Foodproperties" as fp \n' +
            '\t\t\tinner join "SwipeFoodproperties" as sfp\n' +
            '\t\t\ton  fp.propertyname = sfp.propertyname\t\n' +
            '\t\t\twhere sfp."SwipeIdswipes" = :swipeId_\n' +
            '\t\t\tgroup by did\n' +
            '\t) as gr\n' +
            '\tinner join "Dishes" as di on di."idDish" = gr.did\n' +
            '\tinner join "Swipes" as sw on sw."tag" = di."dishTag"\n' +
            '\tgroup by DishName\n' +
            '\torder by MAX(gr.cnt) DESC LIMIT 1',
    {
                replacements: {
                    swipeId_: swipeId
                },
                type: QueryTypes.SELECT
            }
        )

        return res.json(FindDishInd)
    }
}
async function getUserId(token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const email = decoded["email"]
    let userInfo
    if (email)
        userInfo = await User.findOne({where: {
                email: email
            }})
    let userId;
    if (userInfo!=null) {
        userId = userInfo["dataValues"]["idUser"]
    }
    return(userId)
}
async function getCurrentUserSwipeId(token) {
    const idUser = await getUserId(token)
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
    return(neededSwipeId)
}


module.exports = new SwipeController()