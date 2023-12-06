/**
 * @Author: Jessy DROUIN
 * @Date:   06-Nov-2023
 * @Project: Evaluation NoSQL
 */

module.exports = app => {
    const restaurants = require("../controllers/restaurants_controller.js");
    var router = require("express").Router();

    // Create a new Restaurant
    router.post("/", restaurants.create);

    // Retrieve all Restaurants
    router.get("/", restaurants.findAll);

    // Retrieve a single Restaurant with id
    router.get("/:id", restaurants.findOne);

    // Update a Restaurant with id
    router.put("/:id", restaurants.update);

    // Delete a Restaurant with id
    router.delete("/:id", restaurants.delete);

    // Delete all Restaurants
    router.delete("/", restaurants.deleteAll);

    app.use("/api/restaurants", router);
};