const Customer = require("../models/customers")

// function to fetch all the customers from db and send in repsonse to the user.
module.exports.getAllCustomers = async (req, res) => {
    try {
        // using find() method on models we can find all the documents in that collection.
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

// function to  add new customer to db and send updated collection in repsonse to the user.
module.exports.addCustomer = async (req, res) => {
    // we can create a new document using new Customer() syntax just as we do in Javascript syntax.
    const customer = new Customer({
        name: req.body.name,
        website: req.body.website,
        turnover: req.body.turnover,
        NoOfEmployees: req.body.NoOfEmployees,
        ceo: req.body.ceo,
        establishedYear: req.body.establishedYear,
    })
    try {
        // after creating a document we need to call save() method on that document to save the changes
        // and add it to the model collection.
        await customer.save()   
        // fetching all documents and returning to user after adding a new document.
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

// function to update the changes to the existing customer
module.exports.updateCustomer = async (req, res) => {
    let prevCustomer = req.body
    let customerToUpdate
    try {
        // searching for the customer using ID by findById() method.
        customerToUpdate = await Customer.findById(prevCustomer._id)
        // if the customer doesnt exist with that id, we are seding error response
        if(customerToUpdate == null){
            return res.status(404).json({
                status: "fail",
                message: "Cannot find customer"
            })
        }else{
            // if the customer exists in db collection with provided ID, then upadting the fields of document
            // provided by the user to be updated.
            if(prevCustomer.name !== undefined) customerToUpdate.name = prevCustomer.name
            if(prevCustomer.website !== undefined) customerToUpdate.website = prevCustomer.website
            if(prevCustomer.turnover !== undefined) customerToUpdate.turnover = prevCustomer.turnover
            if(prevCustomer.NoOfEmployees !== undefined) customerToUpdate.NoOfEmployees = prevCustomer.NoOfEmployees
            if(prevCustomer.ceo !== undefined) customerToUpdate.ceo = prevCustomer.ceo
            if(prevCustomer.establishedYear !== undefined) customerToUpdate.establishedYear = prevCustomer.establishedYear
            // saving the changes to the document.
            await customerToUpdate.save()
            // fetching all documents and sending to user after update to existing document.
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

// function to delete a customer from the collection in db.
module.exports.deleteCustomer = async (req, res) => {
    console.log(req.parmas)
    let customer
    try {
        // fetching the document in collection using ID provided by user.
        customer = await Customer.findById(req.params._id)
        // If the document doesnt exist with that id we are sending error response
        if(customer == null){
            return res.status(404).json({
                status: "fail",
                message: "Cannot find customer"
            })
        }else{
            // if the document exists with ID provided by user deleting the document from collection
            // uisng remove() method.
            await customer.remove()
            // fetching all customers after deleting the document provided by user.
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
