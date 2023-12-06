const db = require("../models");
const Restaurant = db.restaurants;

exports.createRestaurant = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const restaurant = new Restaurant({
        name: req.body.name,
        address: req.body.address,
        city: req.body.city
    });

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

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Tutorial.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.getRestaurants = (req, res) => {
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

exports.getRestaurantById = (req, res) => {
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

exports.updateRestaurant = (req, res) => {
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
