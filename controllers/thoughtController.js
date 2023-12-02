const { Thought, User } = require("../models");
const mongoose = require("mongoose");

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try{
      const payload = await Thought.find();
      res.json({status: "success", payload});
      } catch(err) {
        console.log(err.message)
        res.status(500).json({status: "error", payload: err.message})
      }
  },
  // Get a Thought
  async getSingleThought(req, res) {
    try{
       // check if the provided ID is a valid ObjectId (could simply be missing a digit)
       if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({message: "Invalid ID format"})
        return
      }

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

      // associate thought with the user
      await User.findOneAndUpdate(
        { username: req.body.username}, //the Where
        { $push: { thoughts: payload._id}} // the What
      )

      res.json({status: "success", payload});      
    } catch (err) {
      console.log(err.message);
      res.status({status: "error", payload: err.message})
    }
  },
  // Update a Thought
  async updateThought(req, res){
    try{
       // check if the provided ID is a valid ObjectId (could simply be missing a digit)
       if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({message: "Invalid ID format"})
        return
      }

      const payload = await Thought.findOneAndUpdate(
        {_id: req.params.id}, // THIS IS THE WHERE
        { $set: req.body}, // THIS IS THE WHAT
        { runValidators: true, new: true}, // new: true - returns the updated object
        // runValidators:true - enforces validators from the schema on the updated object
      );

      if (!payload) {
        res.status(404).json({message: "No thought with this id!"});
        return
      }

      res.json({status: "success", payload})
    } catch (err) {
      res.status(500).json({status: "error", payload: err.message})
    }
  },
  // Delete a Thought
  async deleteThought(req, res) {
    try {
       // check if the provided ID is a valid ObjectId (could simply be missing a digit)
       if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({message: "Invalid ID format"})
        return
      }

      const payload = await Thought.findByIdAndDelete(req.params.id);
      if (!payload){
        res.status(404).json({message: "No thought with that ID"});
      }
      res.json({status: "success", payload})
    } catch(err) {
      res.status(500).json({status: error, payload: err.mesage})
    }
  },

  async createReaction(req, res) {
    try{
       // check if the provided ID is a valid ObjectId (could simply be missing a digit)
       if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({message: "Invalid ID format"})
        return
      }

      const payload = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId}, // THIS IS THE WHERE
        { $push: {
          reactions: req.body
        }}, // THIS IS THE WHAT
        { runValidators: true, new: true}, // new: true - returns the updated object
        // runValidators:true - enforces validators from the schema on the updated object
      );

      if(!payload){
        res.status(404).json({message: "Thought not found!"})
      }
      res.json({status: "success", payload})
    } catch (err){
      res.status(500).json({status: error, payload: err.mesage})
    }
  },

  async deleteReaction(req, res){
    try{
       // check if the provided ID is a valid ObjectId (could simply be missing a digit)
       if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({message: "Invalid ID format"})
        return
      }

      const payload = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$pull: {
          reactions: {
            reactionId: req.params.reactionId
          }
        }}
      )

      if(!payload){
        res.status(404).json({message: "Thought id doesn't exist or reaction not created!"})
      }

      res.json({status: "success", payload})
    } catch(err){
      res.status(500).json({status: error, payload: err.mesage})
    }
  }

}