module.exports = app => {
    const restaurants = require("../controllers/restaurants_controller.js");
    var router = require("express").Router();

    // Create a new Restaurant
    router.post("/", restaurants.createRestaurant);

    // Retrieve all Restaurants
    router.get("/", restaurants.getRestaurants);

    // Retrieve a single Restaurant with id
    router.get("/:id", restaurants.getRestaurantById);

    // Update a Restaurant with id
    router.put("/:id", restaurants.updateRestaurant);

    // // Delete a Restaurant with id
    // router.delete("/:id", restaurants.deleteRestaurant);

    app.use("/restaurants", router);
};