const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts');
      res.json(users);
    } catch (err) {
      console.log('Error fetching users:', err);
      res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      console.log('Error fetching user:', err);
      res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ message: 'Duplicate key error' });
      }
      console.log('Error creating user:', err);
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this ID!' });
      }

      res.json(user);
    } catch (err) {
      console.log('Error updating user:', err);
      res.status(500).json(err);
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and thoughts deleted!' });
    } catch (err) {
      console.log('Error deleting user:', err);
      res.status(500).json(err);
    }
  },

// add a friend to users friend list
  async addFriend(req, res){
    try{
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        {$addToSet: {friends: req.params.friendId }},
        {new: true}
      );
      if(!user){
        return res.status(404).json({message: 'User not found'});
      }
      res.json(user);

    } catch(err){
      console.log("Error adding friend: ", err);
      res.status(500).json(err);
    }
  },


async removeFriend(req, res){
    try{
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        {$pull: {friends: req.params.friendId }},
        {new: true}
      );
      if(!user){
        return res.status(404).json({message: 'User not found'});
      }

      res.json(user);
      

    } catch(err){
      console.log("Error removing friend: ", err);
      res.status(500).json(err);
    }
  },
};
