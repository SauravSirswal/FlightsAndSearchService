function addRowLockOnFlights (flightId) {
    return `SELECT * FROM Flights where Flights.id = ${flightId} FOR UPDATE;`;
} 
module.exports = {
    addRowLockOnFlights
};