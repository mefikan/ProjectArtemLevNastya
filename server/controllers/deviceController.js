<<<<<<< HEAD
const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const {where} = require("sequelize");
class DeviceController
{
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpeg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if (info)
            {
                info = JSON.parse(info)
                info.forEach(i =>
                DeviceInfo.create({
                    title: i.title,
                    description: i.description,
                    deviceId: i.deviceId
                }))
            }

            return res.json(device)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async getOne(req, res) {
        const {id} = req.params
        const device =  await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            }
        )
        return res.json(device)
    }
    async getAll(req, res){
        let {brandId, typeId, limit, page} = req.query
        limit = limit || 9
        page = page || 1
        let offset = page * limit - limit
        let devices
        if (!brandId && !typeId)
        {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId)
        {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (!brandId && typeId)
        {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && typeId)
        {
            devices = await Device.findAll({where: {brandId, typeId}, limit, offset})
        }
        return res.json(devices)
    }
}

module.exports = new DeviceController()
=======
class DeviceController
{
    async create(req, res) {

    }
    async get(req, res) {

    }
    async getOne(req, res) {

    }
}

module.exports = new TypeController()
>>>>>>> 1f1c816c4cdadd1a8e3b24e2ab37a027940b12de
