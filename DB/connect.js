const mongoose = require("mongoose")

// function to be called for connecting to the database using the uri of the db.
const connectDB = (uri) => {
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

// storing the server connection in a db variable
const db = mongoose.connection

// If there is error while connecting to the server,
// error event will be triggered and callback will be executed.
db.on("error", (error) => console.log(error))

// when the connection to the server is open, the open event will be triggered
// and callback will be executed.
db.on("open", () => console.log("Connected to Database"))


// exporting the connectDB function to call before starting our server.
module.exports = connectDB