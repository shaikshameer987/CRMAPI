require("dotenv").config()
const connectDB = require("./DB/connect")
const Customer =  require("./models/customers")
const customersData = require("./customers.json")

const start = async () => {
    try {
        await connectDB(process.env.DATABASE_URL)
        await Customer.create(customersData)
    } catch (error) {
        console.log(error)
    }
}

start()