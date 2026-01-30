const { City } = require("../models/index")

class CityRepository {
    async createCity({ name }) {
        try {
            const city = await City.create({ name })
            return city;
        } catch (error) {
            throw { error }
        }
    }

    async deleteCity(cityId) {
        try {
            await City.destroy({
                where: {
                    id: cityId
                }
            })
        } catch (error) {

        }
    }

    async updateCity(cityId, data){
        try {

            //pg sql syntax
            // const city = await City.update(data, {
            //     where : {
            //         id : cityId
            //     },
            //     returning : true,
            //     plain : true
            // })
            // return city

            const city = await City.findByPk(cityId);
            city.name = data.name;
            await city.save();
            return city;
        } catch (error) {
            throw {error}
        }
    }

    async getCity(cityId) {
        try {
            const city = await City.findByPk(cityId)
            return city
        } catch (error) {
            throw {error}
        }
    }
}
module.exports = CityRepository