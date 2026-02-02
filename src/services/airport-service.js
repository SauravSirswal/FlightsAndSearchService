const { StatusCodes } = require('http-status-codes');
const {AirportRepository} = require('../repository');
const AppError = require('../utils/errors/app-error');

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if(error.name == "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create airport object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError("Cannot fetch data of all airports", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(airportId) {
    try {
        const airport = await airportRepository.get(airportId);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The airport you requested is not present", error.statusCode);
        }
        throw new AppError("Cannot fetch airport data", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function destroyAirport(airportId) {
    try {
        const airport = await airportRepository.delete(airportId);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The airport you requested to delete is not present", error.statusCode);
        }
        throw new AppError("Cannot delete airport data", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirport(airportId, data) {
    try {
        const airport = await airportRepository.update(airportId, data);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The airport you requested to update is not present", error.statusCode);
        }
        throw new AppError("Cannot update airport data", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
};