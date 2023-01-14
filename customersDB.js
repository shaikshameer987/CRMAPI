require("dotenv").config()
const connectDB = require("./DB/connect")
const Customer =  require("./models/customers")
const customersData = require("./customers.json")

// function to add documents to the Customer collection in DB.
const start = async () => {
    try {
        // waiting for connection to the DB.
        await connectDB(process.env.DATABASE_URL)
        // creating the documents in collection using data fetched from customers.json()
        await Customer.create(customersData)
    } catch (error) {
        console.log(error)
    }
}

start()