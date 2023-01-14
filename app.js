require("dotenv").config()
const express = require("express")

const app = express()
const connectDB = require("./DB/connect")
const customersRouter = require("./Routes/customersRoutes")
const PORT = process.env.PORT || 4000

// using express.json() to parse the body of the request.
app.use(express.json())

// using middleware to set the headers for the response.
app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

app.use("/api/customers", customersRouter)

const startServer = async () => {
    try {
        // waiting for the connection to the db before starting listening to api.
        await connectDB(process.env.DATABASE_URL)
        // starting listening to server after successfull connection to the DB.
        app.listen(PORT, () => {
            console.log("Server started...")
        })
    } catch (error) {
        console.log(error.message)
    }
}

startServer();
