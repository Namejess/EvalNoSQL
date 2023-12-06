/**
 * @Author: Jessy DROUIN
 * @Date:   06-Nov-2023
 * @Project: Evaluation NoSQL
 */
const express = require('express');
const router = express.Router();
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const Restaurant = require('./app/models/restaurants_model.js');
const db = require("./app/models/");

//===========================================================================
// CONSTANTES
//===========================================================================
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//===========================================================================
// CONFIGURATION DE LA BASE DE DONNEES
//===========================================================================
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

//===========================================================================
// ROUTES
//===========================================================================
app.get("/", (req, res) => {
    Restaurant.find()
        .then(restaurants => {
            res.json(restaurants);
        })
        .catch(err => {
            res.json(err);
        });
});


//===========================================================================
// LISTEN
//===========================================================================
require("./app/routes/restaurants_routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});