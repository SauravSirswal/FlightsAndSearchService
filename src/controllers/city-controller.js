const { CityService } = require("../services")
const cityService = new CityService()

const create = async (req, res)=>{
    try {
        const city = await cityService.createCity(req.body)
        return res.status(201).json({
            data : city,
            success : true,
            message : "City Created Successfully!",
            err : {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data : {},
            success : false,
            message : "cannot create city",
            err : error
        })
    }
}

const destroy = async (req, res)=>{
    try {
        const response = await cityService.deleteCity(req.params.id)
        return res.status(200).json({
            data : response,
            success : true,
            message : "City deleted Successfully!",
            err : {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data : {},
            success : false,
            message : "cannot delete city",
            err : error
        })
    }
}

const get = async (req, res)=>{
    try {
        const response = await cityService.deleteCity(req.params.id)
        return res.status(200).json({
            data : response,
            success : true,
            message : "City fetched Successfully!",
            err : {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data : {},
            success : false,
            message : "cannot get city",
            err : error
        })
    }
}

const update = async (req, res)=>{
    try {
        const response = await cityService.deleteCity(req.params.id, req.body)
        return res.status(200).json({
            data : response,
            success : true,
            message : "City updated Successfully!",
            err : {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data : {},
            success : false,
            message : "cannot update city",
            err : error
        })
    }
}

module.exports = {
    create,
    destroy,
    get,
    update
}