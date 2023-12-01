const { User } = require("../models")

module.exports = {
  // get all Users
  async getUsers(req, res) {
    try{
      const payload = await User.find().populate([{path: "thoughts"}, {path: "friends"}]); // IDK IF THIS IS CORRECT ???????????????  NEED TO INCLUDE USER
      res.json({status: "success", payload});
      } catch(err) {
        console.log(err.message)
        res.status(500).json({status: "error", payload: err.message})
      }
  },
  // Get a User
  async getSingleUser(req, res) {
    try{
      const payload = await User.findOne({_id: req.params.id}).populate([{path: "thoughts"}, {path: "friends"}]);
      res.json({status: "success", payload})
    } catch(err) {
      console.log(err.message)
      res.status(500).json({status: "error", payload: err.message})
    }
  },
  // Create a User
  async createUser(req, res) {
    try {
      const payload = await User.create(req.body);
      res.json({status: "success", payload});      
    } catch (err) {
      console.log(err.message);
      res.status({status: "error", payload: err.message})
    }
  },
  //////////////////// BROKEN .................WHY.??????????
  // Update a User
  async updateUser(req, res){
    try{
      const payload = await User.findOneAndUpdate(
        {_id: req.params.thoughtId}, // THIS IS THE WHERE
        { $set: req.body}, // THIS IS THE WHAT and "$set" - only changes things that are changed
        { runValidators: true, new: true}, // new: true - returns the updated object
        // runValidators:true - enforces validators from the schema on the updated object
      );

      if (!payload) {
        res.status(404).json({message: "No user with this id!"});
      }

      res.json({status: "success", payload})
    } catch (err) {
      res.status(500).json({status: "error", payload: err.message})
    }
  },
  // Delete a User
  async deleteUser(req, res) {
    try {
      const payload = await User.findByIdAndDelete(req.params.id); // WORK???????????????????
      if (!payload){
        res.status(404).json({message: "No user with that ID"});// PROBABLY WRONG ??????????????????????????????????????????
      }
      res.json({status: "success", payload})
    } catch(err) {
      res.status(500).json({status: "error", payload: err.mesage})
    }
  }

}