const express = require("express");
const router = express.Router();
const db = require("../db");
const { v4: uuidv4 } = require("uuid");

const message = { message: "ok" };

router.route("/seats").get((req, res) => {
  res.json(db.seats);
});

router.route("/seats/:id").get((req, res) => {
  const user = db.seats.find((userId) => userId.id == req.params.id);
  res.json(user);
});

router.route("/seats").post((req, res) => {
  const { day, seat, client, email } = req.body;
  const postSeats = {
    id: uuidv4(),
    day: day,
    seat: seat,
    client: client,
    email: email,
  };

  if (db.seats.some((check) => check.seat === seat && check.day === day)) {
    return res.status(404).json({ message: "The slot is already taken" });
  } else {
    db.seats.push(postSeats);
    return res.json(message);
  }
});

router.route("/seats/:id").put((req, res) => {
  const { day, seat, client, email } = req.body;
  const newSeats = db.seats.find((userId) => userId.id == req.params.id);
  if (seat) {
    (newSeats.day = day),
      (newSeats.seat = seat),
      (newSeats.client = client),
      (newSeats.email = email),
      res.json(message);
  }
});

router.route("/seats/:id").delete((req, res) => {
  const newSeats = db.seats.find((userId) => userId.id == req.params.id);

  const indexOf = db.seats.indexOf(newSeats);
  db.seats.splice(indexOf, 1);

  res.json(message);
});

module.exports = router;
