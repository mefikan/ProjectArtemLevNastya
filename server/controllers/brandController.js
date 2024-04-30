<<<<<<< HEAD
const {Brand} = require("../models/models");

class BrandController
{
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }N
    async get(req, res) {

    }
    async getAll(req, res){
        const brands = await Brand.findAll()
        return res.json(brands)
=======
class BrandController
{
    async create(req, res) {

    }
    async get(req, res) {

>>>>>>> 1f1c816c4cdadd1a8e3b24e2ab37a027940b12de
    }
}

module.exports = new BrandController()