const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const auth = require("../middleware/auth");

router.get("/", (req, res) => {
    res.send("New path added for movies");
})