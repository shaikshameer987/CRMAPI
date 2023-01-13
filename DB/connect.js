const mongoose = require("mongoose")

const connectDB = (uri) => {
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

const db = mongoose.connection

db.on("error", (error) => console.log(error))
db.on("open", () => console.log("Connected to Database"))

module.exports = connectDB