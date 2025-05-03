const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
let db;

app.post('/api/save', async (req, res) => {
  try {
    const result = await db.collection('questionnaires').insertOne(req.body);
    res.status(200).json({ message: 'Saved successfully', id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { email, name } = req.body;

  try {
    // Save user data to MongoDB
    const User = mongoose.model('User', new mongoose.Schema({ email: String, name: String }));
    const user = new User({ email, name });
    await user.save();

    res.json({ success: true, message: 'User saved successfully!' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ success: false, message: 'Failed to save user.' });
  }
});

client.connect().then(() => {
  db = client.db('roommate-app');
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
});