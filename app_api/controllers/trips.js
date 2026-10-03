const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const tripsList = async (req, res) => {
    Trip
        .find({})
        .exec()
        .then((trips) => {
            if (!trips) {
                return res
                    .status(404)
                    .json({"message": "trips not found"});
            } else {
                return res
                    .status(200)
                    .json(trips);
            }
        })
        .catch((err) => res.status(500).json(err));
};

const tripsFindByCode = async (req, res) => {
    Trip
        .find({ 'code': req.params.tripCode })
        .exec()
        .then((trip) => {
            if (!trip) {
                return res
                    .status(404)
                    .json({"message": "trip not found"});
            } else {
                return res
                    .status(200)
                    .json(trip);
            }
        })
        .catch((err) => res.status(500).json(err));
};

module.exports = {
    tripsList,
    tripsFindByCode
};