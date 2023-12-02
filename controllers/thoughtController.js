const { ObjectId } = require("mongoose").Types;
const { Reaction, Thought, User } = require("../models")

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try{
      const payload = await Thought.find(); // IDK IF THIS IS CORRECT ???????????????
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
      const payload = await Thought.findByIdAndDelete(req.params.id); // WORK???????????????????
      if (!payload){
        res.status(404).json({message: "No thought with that ID"});// PROBABLY WRONG ??????????????????????????????????????????
      }
      res.json({status: "success", payload})
    } catch(err) {
      res.status(500).json({status: error, payload: err.mesage})
    }
  },

  async createReaction(req, res) {
    try{
      const payload = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId}, // THIS IS THE WHERE
        { $push: {
          reactions: req.body
        }}, // THIS IS THE WHAT
        { runValidators: true, new: true}, // new: true - returns the updated object
        // runValidators:true - enforces validators from the schema on the updated object
      );
      console.log(req.params.thoughtId)
      res.json({status: "success", payload})
    } catch (err){
      res.status(500).json({status: error, payload: err.mesage})
    }
  },

  async deleteReaction(req, res){
    try{
      const payload = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$pull: {
          reactions: {
            reactionId: req.params.reactionId
          }
        }}
      )
      res.json({status: "success", payload})
    } catch(err){
      res.status(500).json({status: error, payload: err.mesage})
    }
  }

}