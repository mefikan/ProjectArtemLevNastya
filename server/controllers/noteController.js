
const path = require('path')
const {Note, User} = require('../models/models')
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

class NoteController
{
    async create(req, res, next) {
        const {text, title, date} = req.body
        const token = req.headers.authorization.split(' ')[1]
        const UserIdUser = await get_user_id(token)
        const note = await Note.create({text, title, date, UserIdUser})
        return res.json(note)
    }
    async getOne(req, res, next) {
        const {id} = req.params
        const note = await Note.findOne(
            {
                where: {id}
            }
        )
        return res.json(note)
    }
    async getAll(req, res, next){
        const token = req.headers.authorization.split(' ')[1]
        const userId = await get_user_id(token)

        const notes = await Note.findAll({where:
                {
                    UserIdUser: userId
                }})

        return res.json(notes)
    }
}

module.exports = new NoteController()