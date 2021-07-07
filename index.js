const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const database = readDatabase();

dotenv.config();

app.use(express.json());
app.use(express.static('public'));
app.get('/api/profiles', (req, res) => {
    return res.json(database);
});

app.post('/api/match', (req, res) => {
    const id = req.body.id;
    const match = Math.random() < 0.16;
    const profile = getProfileById(id);
    const data = {match, profile};

    return res.json(data);
}),

app.listen(3009, function() {
    console.log("Listening on port 3009");
});

function readDatabase() {
    const raw = fs.readFileSync(path.resolve(__dirname, 'database.json'));
    return JSON.parse(raw);
}

function getProfileById(id) {
    const idInt = Number.parseInt(id);
    const index = database.map(p => p.id).indexOf(idInt);

    return database[index];
}