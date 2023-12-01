const router = require("express").Router();

////////////////////////// NOT FINISHED ////////////////////////////
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController.js")

// /api/users
router.route("/")
  .get(getUsers)
  .post(createUser);

// /api/users/:userId
router.route("/:id")
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser)

module.exports = router

/*
user has many thoughts
user has many reeactions
thoughts has many reactions
reactions have one thought



*/