require("dotenv").config();

//Port
const port = process.env.PORT
const host = process.env.HOST || 'localhost'

//Package
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const indexRoute = require("./src/routers")

//Express
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: false,
}))
app.use(morgan("dev"))
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).send({
        status: 200,
        message: "Server is online"
    })
})

app.use("/v1", indexRoute)

app.use("/v1/images", express.static("./public/images"))

// while url not defined
app.use("/*", (req, res) => {
    res.status(404).json({
        status: 404,
        message: "URL backend not found. Make sure you have configured it properly.",
    });
});


app.listen(port || 5000, () => {
    console.log(`Server is running on http://${host}:${port}`);
})