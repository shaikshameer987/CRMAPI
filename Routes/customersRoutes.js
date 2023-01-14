const express = require("express")

// importing the controller functions which will be used in the routes for different http requests.
const {
    getAllCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customersControllers")

const router = express.Router()

// creating the routes for the http requests and passing the controller functions to be executed.
router.route("/")
    .get(getAllCustomers)
    .post(addCustomer)
    .put(updateCustomer)

router.route("/:_id")
    .delete(deleteCustomer)

module.exports = router;