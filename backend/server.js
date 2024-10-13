// Importing the required modules
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

// Define a port to listen on
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Load the question from Json file
const questions = JSON.parse(fs.readFileSync('./questions.json'));

// API to get a random question
app.get('/api/question', (req, res) => {
    const questionIndex = Math.floor(Math.random() * questions.length);
    res.json(questions[questionIndex]);
});

// API to get specific question by its text (encoded in the QR code)
app.get('/question/:text', (req, res) => {
    const questionText = req.params.text;
    const question = questions.find(q => q.question === questionText);
    if (question) {
        res.json(question);
    } else {
        res.status(404).send('Question not found');
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
