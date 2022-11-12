const express = require("express");
const router = express.Router();
const db = require("../db");
const { v4: uuidv4 } = require("uuid");

const message = { message: "ok" };

router.route("/testimonials").get((req, res) => {
  res.json(db.testimonials);
});

router.route("/testimonials/:id").get((req, res) => {
  const testimonialsId = db.testimonials.find(
    (userId) => userId.id == req.params.id
  );
  res.json(testimonialsId);
});

router.route("/testimonials/random").get((req, res) => {
  let randomId =
    db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
  res.json(randomId);
});

router.route("/testimonials").post((req, res) => {
  const { author, text } = req.body;
  if (author && text) {
    const newTestimonials = {
      id: uuidv4(),
      author: author,
      text: text,
    };
    db.testimonials.push(newTestimonials);
    res.json(message);
  }
});

router.route("/testimonials/:id").put((req, res) => {
  const { author, text } = req.body;
  const userId = db.testimonials.find((userId) => userId.id == req.params.id);
  if (userId) {
    userId.author = author;
    userId.text = text;

    res.json(userId);
  }
});

router.route("/testimonials/:id").delete((req, res) => {
  const deleteTestimonials = db.testimonials.find(
    (userId) => userId.id == req.params.id
  );
  const indexOf = db.testimonials.indexOf(deleteTestimonials);
  db.testimonials.splice(indexOf, 1);
  res.json(message);
});

module.exports = router;
