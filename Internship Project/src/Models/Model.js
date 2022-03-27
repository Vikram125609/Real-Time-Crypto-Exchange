const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    buy: {
        type: String,
        required: true
    },
    Sell: {
        type: String,
        required: true
    },
    volume: {
        type: String,
        required: true
    },
    baseUnit: {
        type: String,
        required: true
    }
});
const models = mongoose.model("data",Schema);
module.exports = models;