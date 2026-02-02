const { StatusCodes } = require('http-status-codes');
const {AirplaneRepository} = require('../repository');
const AppError = require('../utils/errors/app-error');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if(error.name == "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create airplane object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError("Cannot fetch data of airplanes", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(airplaneId) {
    try {
        const airplane = await airplaneRepository.get(airplaneId);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The airplane you requested is not present", error.statusCode);
        }
        throw new AppError("Cannot fetch airplane data", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function destroyAirplane(airplaneId) {
    try {
        const airplane = await airplaneRepository.delete(airplaneId);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The airplane you requested to delete is not present", error.statusCode);
        }
        throw new AppError("Cannot delete airplane data", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirplane(airplaneId, data) {
    try {
        const airplane = await airplaneRepository.update(airplaneId, data);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The airplane you requested to update is not present", error.statusCode);
        }
        throw new AppError("Cannot update airplane data", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
};