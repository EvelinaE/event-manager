require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const API_SERVER_PORT = process.env.ApiServerPort;
const MONGODB_URI = process.env.MongoDbUri;

const client = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.get('/api/users', async (req, res) => {
  try {
    const users = await client.db('atsiskaitymas').collection('user-list').find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.post('/api/user', async (req, res) => {
  try {
    const newUser = req.body;
    const result = await client.db('atsiskaitymas').collection('user-list').insertOne(newUser);
    if (result.insertedId) {
      res.status(201).json({ ...newUser, message: 'You successfully registered the user!' });
    } else {
      res.status(500).json({ error: 'Oops! Something went wrong while creating the user.' });
    }
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.put('/api/user', async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    if (!ObjectId.isValid(_id)) {
      return res.status(400).send({ error: 'Invalid userId format' });
    }
    const query = { _id: new ObjectId(_id) };
    const update = { $set: updateData };
    const result = await client.db('atsiskaitymas').collection('user-list').updateOne(query, update);
    if (result.matchedCount === 0) {
      return res.status(404).send({ error: 'User not found' });
    }
    const updatedUser = await client.db('atsiskaitymas').collection('user-list').findOne(query);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.delete('/api/user', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).send({ error: 'Invalid userId format' });
    }
    const query = { _id: new ObjectId(userId) };
    const result = await client.db('atsiskaitymas').collection('user-list').deleteOne(query);
    if (result.deletedCount === 0) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send({ message: 'You successfully deleted the user!' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.listen(API_SERVER_PORT, () => {
  console.log(`Server is running on port ${API_SERVER_PORT}`);
});
