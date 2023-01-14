const mongoose = require("mongoose")

// creating the schema for a customer model.
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

// exporitng the model of the schema to be used to create a customer using the model.
module.exports = mongoose.model("Customer", customerSchema)