const { Router } = require("express");
const activities = require("../controllers/activities.controllers");


const router = Router();
router.get("/", activities);

module.exports = router