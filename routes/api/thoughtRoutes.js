const router = require("express").Router();

///////////////////////// NOT FINISHED ///////////////////////////////
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController.js")

// /api/thoughts
router.route("/")
  .get(getThoughts)
  .post(createThought);

// /api/users/:thoughtId
router.route("/:id")
  .put(updateThought)
  .delete(deleteThought)
  .get(getSingleThought)


module.exports = router

/*
user has many thoughts
user has many reeactions
thoughts has many reactions
reactions have one thought



*/