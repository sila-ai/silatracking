const express = require("express")
const trafficController = require("../controllers/traffic_controller")
const router = express.Router()

router.get("/test", trafficController.getTest)
router.get("/traffic/:id/", trafficController.getTraffic)

module.exports = router
