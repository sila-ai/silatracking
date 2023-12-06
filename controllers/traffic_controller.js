const dotenv = require("dotenv")
dotenv.config()

exports.getTraffic = (req, res, next) => {
	console.log(process.env.TRACKING_URL)
	const api = process.env.TRACKING_URL
	const url = api + req.url + "&js=enabled"
	const noJs = api + req.url + "&js=disabled"

	res.render("traffic", { url: url, noJs: noJs, api: api })
}
exports.getTest = (req, res, next) => {
	res.render("404")
}
