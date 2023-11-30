const router = require("express").Router();

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
router
  .route("/:")


module.exports = router

/*
user has many thoughts
user has many reeactions
thoughts has many reactions
reactions have one thought



*/