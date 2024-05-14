const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const client = new MongoClient('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect().then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => console.error(err));

// GET /api/user/:userId
app.get('/api/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).send({ error: 'Invalid userId format' });
    }
    const query = { _id: new ObjectId(userId) };
    const user = await client.db("atsiskaitymas").collection("user-list").findOne(query);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// POST /api/user
app.post('/api/user', async (req, res) => {
  try {
    const newUserJson = req.body;
    const data = await client.db("atsiskaitymas").collection("user-list").insertOne(newUserJson);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

// PUT /api/user
app.put('/api/user', async (req, res) => {
  try {
    const { userId, ...updateData } = req.body;
    console.log('Received update request:', { userId, updateData }); // Log the received data
    if (!ObjectId.isValid(userId)) {
      console.error('Invalid userId format:', userId); // Log invalid userId format
      return res.status(400).send({ error: 'Invalid userId format' });
    }
    const query = { _id: new ObjectId(userId) };
    const update = { $set: updateData };
    console.log('Query:', query); // Log the query

    const result = await client.db("atsiskaitymas").collection("user-list").updateOne(query, update);
    if (result.matchedCount === 0) {
      console.error('User not found:', userId); // Log user not found
      return res.status(404).send({ error: 'User not found' });
    }

    const updatedUser = await client.db("atsiskaitymas").collection("user-list").findOne(query);
    console.log('Updated user:', updatedUser); // Log the updated user
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error('Update error:', error); // Log the error
    res.status(400).send(error);
  }
});

// DELETE /api/user
app.delete('/api/user', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).send({ error: 'Invalid userId format' });
    }
    const query = { _id: new ObjectId(userId) };
    const data = await client.db("atsiskaitymas").collection("user-list").deleteOne(query);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET /api/users
app.get('/api/users', async (req, res) => {
  try {
    const data = await client.db("atsiskaitymas").collection("user-list").find().toArray();
    res.send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});
