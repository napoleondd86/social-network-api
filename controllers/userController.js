const { User } = require("../models")
const mongoose = require("mongoose")

module.exports = {
  // get all Users
  async getUsers(req, res) {
    try{
      const payload = await User.find()
        .populate({path: "thoughts", populate:{path: "reactions"}})
        .populate("friends"); 
      res.json({status: "success", payload});
      } catch(err) {
        console.log(err.message)
        res.status(500).json({status: "error", payload: err.message})
      }
  },
  // Get a User
  async getSingleUser(req, res) {
    try{
       // check if the provided ID is a valid ObjectId (could simply be missing a digit)
       if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({message: "Invalid ID format"})
        return
      }

      const payload = await User.findOne({_id: req.params.id})
        .populate({path: "thoughts", populate: {path: "reactions"} })
        .populate("friends");
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
  // Update a User
  async updateUser(req, res){
    try{
      // check if the provided ID is a valid ObjectId (could simply be missing a digit)
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({message: "Invalid ID format"})
        return
      }

      const payload = await User.findOneAndUpdate(
        {_id: req.params.id}, // THIS IS THE WHERE
        { $set: req.body}, // THIS IS THE WHAT and "$set" - only changes things that are changed
        { runValidators: true, new: true}, // new: true - returns the updated object
        // runValidators:true - enforces validators from the schema on the updated object
      );

      if (!payload) {
        res.status(404).json({message: "No user with this id!"});
        return
      }

      res.json({status: "success", payload})
    } catch (err) {
      res.status(500).json({status: "error", payload: err.message})
    }
  },
  // Delete a User
  async deleteUser(req, res) {
    try {
       // check if the provided ID is a valid ObjectId (could simply be missing a digit)
       if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({message: "Invalid ID format"})
        return
      }

      const payload = await User.findByIdAndDelete(req.params.id); // WORK???????????????????
      if (!payload){
        res.status(404).json({message: "No user with that ID"});
        return
      }
      res.json({status: "success", payload})
    } catch(err) {
      res.status(500).json({status: "error", payload: err.message})
    }
  },
  // CREATE FRIEND
  async createFriend(req, res) {
    try{
       // check if the provided ID is a valid ObjectId (could simply be missing a digit)
       if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({message: "Invalid ID format"})
        return
      }

      const payload = await User.findOneAndUpdate(
        {_id: req.params.id},
        {$push: {friends: req.params.friendId} },
        {runValidators: true, new: true}
      )

      if (!payload) {
        return res.status(404).json({ message: "User not found." });
      }

      res.json({status: "success", payload})
    } catch(err) {
      res.status(500).json({status: "error", payload: err.message})
    }
  },
  async deleteFriend(req, res) {
    try {
       // check if the provided ID is a valid ObjectId (could simply be missing a digit)
       if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({message: "Invalid ID format"})
        return
      }

      const payload = await User.findOneAndUpdate(
        {_id: req.params.id},
        {$pull: {friends: req.params.friendId} },
        {new: true}
      )

      if(!payload){
        return res.status(404).json({message: "User not found or friend not removed"})
      }

      res.json({status: "success", payload})
    } catch (err){
      res.status(500).json({status: "error", payload: err.message})
    }
  }

}

