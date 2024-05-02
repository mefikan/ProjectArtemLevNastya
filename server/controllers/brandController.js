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
    }
}

module.exports = new BrandController()