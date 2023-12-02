const router = require("express").Router();

///////////////////////// NOT FINISHED ///////////////////////////////
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require("../../controllers/thoughtController.js")

// /api/thoughts
router.route("/")
  .get(getThoughts)
  .post(createThought);

// /api/thought/:id/reaction
router.route("/:thoughtId/reaction").post(createReaction)

// /api/thought/:thoughtId/reaction/:reactionId
router.route("/:thoughtId/reaction/:reactionId")
  .delete(deleteReaction)

// /api/users/:id
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