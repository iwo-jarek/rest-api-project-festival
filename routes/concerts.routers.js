const express = require("express");
const router = express.Router();
const db = require("../db");
const { v4: uuidv4 } = require("uuid");

const message = { message: "ok" };

router.route("/concerts").get((req, res) => {
  res.json(db.concerts);
});

router.route("/concerts/:id").get((req, res) => {
  const concertsId = db.concerts.find((userId) => userId.id == req.params.id);
  res.json(concertsId);
});

router.route("/concerts/random").get((req, res) => {
  const randomId = db.concerts[Math.floor(Math.random() * db.concerts.length)];
  res.json(randomId);
});

router.route("/concerts").post((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  if (performer && genre && price && day && image) {
    const postConcerts = {
      id: uuidv4(),
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    };
    db.concerts.push(postConcerts);
    res.json(message);
  }
});

router.route("/concerts/:id").put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const userId = db.concerts.find((userId) => userId.id == req.params.id);
  if (userId) {
    userId.performer = performer;
    userId.genre = genre;
    userId.price = price;
    userId.day = day;
    userId.image = image;

    res.json(userId);
  }
});

router.route("/concerts/:id").delete((req, res) => {
  const deleteConcerts = db.testimonials.find(
    (userId) => userId.id == req.params.id
  );
  const indexOf = db.concerts.indexOf(deleteConcerts);
  db.concerts.splice(indexOf, 1);

  res.json(message);
});

module.exports = router;
