// Create web server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// Set up the server
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Load comments
const comments = JSON.parse(fs.readFileSync('data/comments.json'));

// Render the page
app.get('/', (req, res) => {
  res.render('index', { comments });
});

// Add a comment
app.post('/add', (req, res) => {
  comments.push(req.body);
  fs.writeFileSync('data/comments.json', JSON.stringify(comments));
  res.redirect('/');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

