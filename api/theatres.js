const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const auth = require("../middleware/auth");
const Theatre = require("../models/Theatre");

// @route     Theatre api/theatres/
// @desc      Create a theatre
// @access    Private

router.Theatre(
  "/",
  [
    auth,
    [
      body("name", "name is required").not().isEmpty(),
      body("address", "address is required").not().isEmpty(),
      body("location", "location is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, address, contactNumber } = req.body;
      const newTheatre = new Theatre({
        name,
        address,
        contactNumber,
        location,
      });
      const theatre = await newTheatre.save();
      res.json(theatre);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     GET api/theatres
// @desc      Get all theatres
// @access    Private

router.get("/", auth, async (req, res) => {
  try {
    const theatres = await Theatre.find();
    res.json(theatres);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/theatres/:post_id
// @desc      Get Theatre by ID
// @access    Private

router.get("/:id", auth, async (req, res) => {
  try {
    const Theatre = await Theatre.findById(req.params.id);
    if (!Theatre) {
      return res.status(404).json({ msg: "Theatre not found" });
    }
    res.json(Theatre);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     Delete api/theatres/:id
// @desc      Delete a Theatre
// @access    Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.id);

    if (!theatre) {
      return res.status(401).json({ msg: "Theatre not found" });
    }
    await theatre.remove();

    res.json({ msg: "Theatre removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/theatres/show/:id
// @desc      update Theatre with show
// @access    Private
router.put(
  "/:id/shows",
  [
    auth,
    [
      body("startTiming", "startTiming is required").not().isEmpty(),
      body("endTiming", "endTiming is required").not().isEmpty(),
      body("startDate", "startDate is required").not().isEmpty(),
      body("endDate", "endDate is required").not().isEmpty(),
      body("price", "price is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const Theatre = await Theatre.findById(req.params.id);

      const { startTiming, endTiming, startDate, endDate, price, eventId } =
        req.body;

      const newTheatreShow = {
        startTiming,
        endTiming,
        startDate,
        endDate,
        price,
        eventId,
      };
      Theatre.shows.unshift(newTheatreShow);

      await Theatre.save();
      res.json(Theatre);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route     PUT api/theatres/:id/show/:showId/positions
// @desc      update Theatre with show and positions
// @access    Private
router.put(
  ":id/show/:showId/positions",
  [
    auth,
    [
      body("type", "Type is required").not().isEmpty(),
      body("seats", "Seats is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const theatre = await Theatre.findById(req.params.id);
      const showIndex = theatre.shows.findIndex((show) => show.id === showId);

      const { type, seats } = req.body;

      const seatPosition = {
        seats,
        type,
      };
      theatre.shows[showIndex].positions.unshift(seatPosition);

      await theatre.save();
      res.json(theatre);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route     Delete api/theatres/:id/shows/:showId
// @desc      Delete a Theatre
// @access    Private

router.delete("/:id/shows/:showId", auth, async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.id);

    if (!theatre) {
      return res.status(401).json({ msg: "Theatre not found" });
    }

    const removeIndex = theatre.shows
      .map((show) => show.id)
      .indexOf(req.params.showId);

    theatre.shows.splice(removeIndex, 1);

    await theatre.save();

    res.json({ msg: "Theatre show removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     Delete api/theatres/:id/shows/:showId
// @desc      Delete a Theatre
// @access    Private

router.delete(
  "/:id/shows/:showId/positions/:positionId",
  auth,
  async (req, res) => {
    try {
      const theatre = await Theatre.findById(req.params.id);

      if (!theatre) {
        return res.status(401).json({ msg: "Theatre not found" });
      }

      const removeShowIndex = theatre.shows
        .map((show) => show.id)
        .indexOf(req.params.showId);

      const show = theatre.shows[removeShowIndex];
      const updatedShow = show.positions.filter(
        (position) => position.id === positionId
      );

      theatre.shows = updatedShow;

      await theatre.save();

      res.json({ msg: "Theatre show removed" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
