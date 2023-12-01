const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");
// const reactionRoutes = require("./reactionRoutes") // DON'T THINK THIS WILL BE NEEDED

router.use("/user", userRoutes);
router.use("/thought", thoughtRoutes);
// router.use("reactions", reactionRoutes); // DON'T THINK THIS IS NEEDED

module.exports = router;


