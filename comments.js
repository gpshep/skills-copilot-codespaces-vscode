//Create web server
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

// Set up the server
app.use(cors());
app.use(bodyParser.json());

// Set up the database
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('comments.json');
const db = low(adapter);

// Set up the database
db.defaults({ comments: [] }).write();

// Get all comments
app.get('/comments', (req, res) => {
    const comments = db.get('comments').value();
    res.send(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
    const comment = db.get('comments').find({ id: req.params.id }).value();
    res.send(comment);
});

// Add a comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    db.get('comments').push(comment).write();
    res.send(comment);
});

// Delete a comment by id
app.delete('/comments/:id', (req, res) => {
    db.get('comments').remove({ id: req.params.id }).write();
    res.send('Deleted');
});

// Update a comment by id
app.put('/comments/:id', (req, res) => {
    const comment = req.body;
    db.get('comments').find({ id: req.params.id }).assign(comment).write();
    res.send(comment);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});