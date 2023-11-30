const { ObjectId } = require("mongoose").Types;
const { Reaction, Thought, User } = require("../models")

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try{
      const payload = await Thought.find().populate(["thought", "reaction"]); // IDK IF THIS IS CORRECT ???????????????
      res.json({status: "success", payload});
      } catch(err) {
        console.log(err.message)
        res.status(500).json({status: "error", payload: err.message})
      }
  },
  // Get a Thought
  async getSingleThought(req, res) {
    try{
      const payload = await Thought.findOne({_id: req.params.id});
      res.json({status: "success", payload})
    } catch(err) {
      console.log(err.message)
      res.status(500).json({status: "error", payload: err.message})
    }
  },
  // Create a Thought
  async createThought(req, res) {
    try {
      const payload = await Thought.create(req.body);
      res.json({status: "success", payload});      
    } catch (err) {
      console.log(err.message);
      res.status({status: "error", payload: err.message})
    }
  },
  // Update a Thought
  async updateThought(req, res){
    try{
      const payload = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        { $set: req.body},
        { runValidators: true, new: true}
      );

      if (!payload) {
        res.status(404).json({message: "No user with this id!"});
      }

      res.json({status: "success", payload})
    } catch (err) {
      res.status(500).json({status: "error", payload: err.message})
    }
  },
  // Delete a Thought
  async deleteThought(req, res) {
    try {
      const payload = await Thought.findOneAndDelete({_id: req.params.userId});
      if (!payload){
        res.status(404).json({message: "No user with that ID"});// PROBABLY WRONG ??????????????????????????????????????????
      }
      res.json({status: "success", payload})
    } catch(err) {
      res.status(500).json({status: error, payload: err.mesage})
    }
  }

}