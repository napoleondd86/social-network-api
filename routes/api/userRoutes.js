const router = require("express").Router();

////////////////////////// NOT FINISHED ////////////////////////////
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend
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

  // /:id/friend/:friendId
router.route("/:id/friend/:friendId")
.post(createFriend)
.delete(deleteFriend)

module.exports = router

/*
user has many thoughts
user has many reeactions
thoughts has many reactions
reactions have one thought


http://localhost:3001/api/user/656a71c0713e5748fcb6f59b/friend/656928cb041f2f1d6b83f1d1
*/