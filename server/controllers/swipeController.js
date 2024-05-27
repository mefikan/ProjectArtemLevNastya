
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
    async swipeAddProperties(req, res, next) {
        const {tag, ch1, ch2, ch3, ch4} = req.body
        const token = req.headers.authorization.split(' ')[1]
        const UserIdUser = await getUserId(token)
        const swipe = await Swipe.create({tag, UserIdUser})

        const swipeId = await getCurrentUserSwipeId(token)
        await SwipeFoodproperty.create({
            propertyname: ch1,
            SwipeIdswipes: swipeId
        })
        await SwipeFoodproperty.create({
            propertyname: ch2,
            SwipeIdswipes: swipeId
        })
        await SwipeFoodproperty.create({
            propertyname: ch3,
            SwipeIdswipes: swipeId
        })
        await SwipeFoodproperty.create({
            propertyname: ch4,
            SwipeIdswipes: swipeId
        })
        return res.json("success!")
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
        const swipeTag = await getCurrentUserSwipeTag(token)
        console.log(swipeTag)
        const {Op} = require('sequelize')
        /*
        Нужно найти максимум совпадений между свойствами свайпа и св-вами блюда
        Выберем свойства последнего свайпа и будем выбирать блюдо, имеющее
        максимум( КОЛИЧЕСТВО (свойство свайпа * свойство блюда), где названия свойств равны)
         */
        let FindDishInd = await sequelize.query(
            'SELECT gr.cnt, di."dishName" as DishName, menus."dishRating"\n' +
            '            FROM(\n' +
            '\t            SELECT COUNT(*) as cnt, fp."DishIdDish" as did\n' +
            '\t            FROM "Foodproperties" as fp\n' +
            '\t            inner join "SwipeFoodproperties" as sfp\n' +
            '\t            on  fp.propertyname = sfp.propertyname\n' +
            '\t            where sfp."SwipeIdswipes" = :swipeId_\n' +
            '\t            group by did\n' +
            '            ) as gr\n' +
            '    \t\t      \n' +
            '\t\t\tinner join "Dishes" as di on di."idDish" = gr.did\n' +
            '\t\t\tinner join "Swipes" as sw on sw."tag" = di."dishTag"  \t\t\n' +
            '\t\t\tinner join "Menus" as menus on  di."idDish" = menus."DishIdDish"        \n' +
            '\t\t\twhere di."dishTag" = :swipeTag_' +
            '            group by DishName, gr.cnt, menus."dishRating"\n' +
            '            order by MAX(gr.cnt) DESC, \n' +
            '\t\t\tMAX(menus."dishRating") desc LIMIT 1',
    {
                replacements: {
                    swipeId_: swipeId,
                    swipeTag_: swipeTag
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
async function getCurrentUserSwipeTag(token){
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
    const neededSwipeId = neededSwipe['dataValues']['tag']
    return(neededSwipeId)
}


module.exports = new SwipeController()