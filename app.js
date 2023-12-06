const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")

const shopController = require("./routes/route")

const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 4000

app.use(
	cors({
		origin: "*",
		credentials: true,
		methods: "GET,PUT,POST,DELETE",
	})
)

console.log(path.join(__dirname, "analytics"))
app.use("/analytics", express.static(path.join(__dirname, "analytics")))

app.use("/public/css", express.static(path.join(__dirname, "public/css")))

// app.use("/analytics", express.static(path.join(__dirname, "analytics")))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.enable("trust proxy")
app.use(shopController)

app.use((req, res, next) => {
	res.status(404).render("404")
})
app.listen(PORT)
