const express = require("express")
const Route = express.Router()

const r_products = require("./r_products")

Route.use("/product", r_products);

module.exports = Route