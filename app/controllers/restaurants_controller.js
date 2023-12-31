/**
 * @Author: Jessy DROUIN
 * @Date:   06-Nov-2023
 * @Project: Evaluation NoSQL
 */

const db = require("../models");
const Restaurant = db.restaurants;

//===========================================================================
// POST/CREATE RESTAURANT
//===========================================================================
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Restaurant
    const restaurant = new Restaurant({
        name: req.body.name,
        address: req.body.address,
        city: req.body.city
    });

    // Save Restaurant in the database
    restaurant
        .save(restaurant)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Restaurant."
            });
        });
};

//===========================================================================
// GET ALL
//===========================================================================
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Restaurant.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving restaurants."
            });
        });
};

//===========================================================================
// GET BY ID
//===========================================================================
exports.findOne = (req, res) => {
    const id = req.params.id;

    Restaurant.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Restaurant with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Restaurant with id=" + id });
        });
};

//===========================================================================
// UPDATE
//===========================================================================
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Restaurant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Restaurant with id=${id}. Maybe Restaurant was not found!`
                });
            } else res.send({ message: "Restaurant was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Restaurant with id=" + id
            });
        });
};

//===========================================================================
// DELETE ALL
//===========================================================================
exports.deleteAll = (req, res) => {
    // Delete all Restaurants from the database.
    Restaurant.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Restaurants were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all restaurants."
            });
        });
};

//===========================================================================
// DELETE BY ID
//===========================================================================
exports.delete = (req, res) => {
    const id = req.params.id;

    Restaurant.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Restaurant with id=${id}. Maybe Restaurant was not found!`
                });
            } else {
                res.send({
                    message: "Restaurant was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Restaurant with id=" + id
            });
        });
};