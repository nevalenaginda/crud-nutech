const express = require("express")
const multer = require("../middlewares/multer")
const Route = express.Router();

const c_products = require("../controllers/c_products")

Route.post("/", multer.singleImage, c_products.create).get("/", c_products.readAll).get("/:id", c_products.readOne).patch("/:id", multer.singleImage, c_products.update).delete("/:id", c_products.delete)

module.exports = Route;