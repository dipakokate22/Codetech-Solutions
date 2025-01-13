const express = require("express");
const router = express.Router();
const trackingModel = require("../models/trackingModel");

router.post("/", (req, res) => {
  const { website, duration } = req.body;
  trackingModel.logWebsite(website, duration, (err, result) => {
    if (err) res.status(500).send(err);
    else res.status(200).send("Data logged successfully");
  });
});

router.get("/report", (req, res) => {
  trackingModel.getReport((err, result) => {
    if (err) res.status(500).send(err);
    else res.json(result);
  });
});

module.exports = router;
