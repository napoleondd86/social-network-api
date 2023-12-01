const router = require("express").Router();
const apiRoutes = require("./api/index.api");

router.use("/api", apiRoutes);

router.use((req, res) => res.send("Wrong route!"))

module.exports = router;