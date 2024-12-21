// Create web server
// Run: node comments.js
// Test: curl -X POST -H "Content-Type: application/json" -d '{"comment": "Hello World!"}' http://localhost:8080/comments
// Test: curl -X GET http://localhost:8080/comments
// Test: curl -X GET http://localhost:8080/comments/1
// Test: curl -X DELETE http://localhost:8080/comments/1
// Test: curl -X PUT -H "Content-Type: application/json" -d '{"comment": "Hello World!"}' http://localhost:8080/comments/1

// Express.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

// Comments
let comments = [];

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/comments', (req, res) => {
  let comment = req.body.comment;
  if (!comment) {
    return res.status(400).send('Comment is required');
  }
  comments.push(comment);
  res.send('Comment added');
});

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.get('/comments/:id', (req, res) => {
  let id = req.params.id;
  let comment = comments[id];
  if (!comment) {
    return res.status(404).send('Comment not found');
  }
  res.json(comment);
});

app.delete('/comments/:id', (req, res) => {
  let id = req.params.id;
  let comment = comments[id];
  if (!comment) {
    return res.status(404).send('Comment not found');
  }
  comments.splice(id, 1);
  res.send('Comment deleted');
});

app.put('/comments/:id', (req, res) => {
  let id = req.params.id;
  let comment = comments[id];
  if (!comment) {
    return res.status(404).send('Comment not found');
  }
  let newComment = req.body.comment;
  if (!newComment) {
    return res.status(400).send('Comment is required');
  }
  comments[id] = newComment;
  res.send('Comment updated');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// End