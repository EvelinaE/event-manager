// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const { MongoClient, ObjectId } = require("mongodb"); // import ObjectId

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const client = new MongoClient('mongodb://127.0.0.1:27017');

app.route('/api/user')
.get(async(req, res) => {
  try {
    if (!req.query.userId) {
      res.status(400).send('userId required')
    }

    const query = new ObjectId(req.query.userId);
    const con = await client.connect();
    const data = await con.db("atsiskaitymas").collection("user-list").find(query).toArray();
    await con.close();

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
})
.post(async(req, res) => {
  try {
    // if (!req.query.userId) {
    //   res.status(400).send('userId required')
    // }
    const newUserJson = req.body

    const con = await client.connect();
    const data = await con.db("atsiskaitymas").collection("user-list").insertOne(newUserJson)
    await con.close();

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
})
.put(async(req, res) => {
  res.status(200).json({ message: 'put' });
})
.delete(async(req, res) => {
  res.status(200).json({ message: 'delete' });
});

app.route('/api/users')
.get(async(req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("atsiskaitymas").collection("user-list").find().toArray();
    await con.close();

    res.send(data);
  } catch (error) {
    res.status(400).send(error);
  }
})