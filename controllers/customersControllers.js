const Customer = require("../models/customers")

module.exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find()
        return res.status(200).json({
            status: "success",
            data: { customers }
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message
        })
    }
}

module.exports.addCustomer = async (req, res) => {
    const customer = new Customer({
        name: req.body.name,
        website: req.body.website,
        turnover: req.body.turnover,
        NoOfEmployees: req.body.NoOfEmployees,
        ceo: req.body.ceo,
        establishedYear: req.body.establishedYear,
    })
    try {
        await customer.save()
        const customers = await Customer.find()
        return res.status(201).json({
            status: "success",
            data: {customers}
        })
    } catch (error) {
        return res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

module.exports.updateCustomer = async (req, res) => {
    let prevCustomer = req.body
    let customerToUpdate
    try {
        customerToUpdate = await Customer.findById(prevCustomer._id)
        if(customerToUpdate == null){
            return res.status(404).json({
                status: "fail",
                message: "Cannot find customer"
            })
        }else{
            if(prevCustomer.name !== undefined) customerToUpdate.name = prevCustomer.name
            if(prevCustomer.website !== undefined) customerToUpdate.website = prevCustomer.website
            if(prevCustomer.turnover !== undefined) customerToUpdate.turnover = prevCustomer.turnover
            if(prevCustomer.NoOfEmployees !== undefined) customerToUpdate.NoOfEmployees = prevCustomer.NoOfEmployees
            if(prevCustomer.ceo !== undefined) customerToUpdate.ceo = prevCustomer.ceo
            if(prevCustomer.establishedYear !== undefined) customerToUpdate.establishedYear = prevCustomer.establishedYear

            await customerToUpdate.save()

            const allCustomers = await Customer.find()

            return res.status(201).json({
                status: "success",
                data: {customers:  allCustomers }
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message
        })
    }
}

module.exports.deleteCustomer = async (req, res) => {
    console.log(req.parmas)
    let customer
    try {
        customer = await Customer.findById(req.params._id)
        if(customer == null){
            return res.status(404).json({
                status: "fail",
                message: "Cannot find customer"
            })
        }else{
            await customer.remove()
            const allCustomers = await Customer.find()
            return res.status(200).json({
                status: "success",
                data: {customers:  allCustomers }
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message
        })
    }
}
