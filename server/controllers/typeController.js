<<<<<<< HEAD
const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')
class TypeController
{
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }
    async getAll(req, res){
        const types = await Type.findAll()
        return res.json(types)
=======
class TypeController
{
    async create(req, res) {

    }
    async get(req, res) {

>>>>>>> 1f1c816c4cdadd1a8e3b24e2ab37a027940b12de
    }
}

module.exports = new TypeController()