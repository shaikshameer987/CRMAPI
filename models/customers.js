const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    turnover: {
        type: Number,
        required: true
    },
    NoOfEmployees: {
        type: Number,
        required: true
    },
    ceo: {
        type: String,
        required: true
    },
    establishedYear: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model("Customer", customerSchema)