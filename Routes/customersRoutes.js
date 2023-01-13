const express = require("express")

const {
    getAllCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customersControllers")

const router = express.Router()

router.route("/")
    .get(getAllCustomers)
    .post(addCustomer)
    .put(updateCustomer)

router.route("/:_id")
    .delete(deleteCustomer)

module.exports = router;