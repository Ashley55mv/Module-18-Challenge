const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const { users, exampleThoughts } = require('./data');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', async () => {
  console.log('Connected to MongoDB');

  // Clear existing data
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Insert users
  const createdUsers = await User.insertMany(users);

  // Insert thoughts and associate them with users
  for (let i = 0; i < exampleThoughts.length; i++) {
    const thought = exampleThoughts[i];
    const user = createdUsers[i % createdUsers.length];
    thought.userId = user._id;
    const createdThought = await Thought.create(thought);
    await User.findByIdAndUpdate(user._id, { $push: { thoughts: createdThought._id } });
  }

  console.log('Database seeded!');
  mongoose.connection.close();
});