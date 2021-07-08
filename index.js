const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const database = readDatabase();

dotenv.config();

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/profiles', (req, res) => {
    return res.json(database);
});

app.get('/api/profiles/random', (req, res) => {
    const min = 0;
    const max = database.length - 1;
    const random = Math.floor(Math.random() * (max - min + 1) + min); 
    const profile = getProfileById(random + 1);

    console.log('max', max);
    console.log('random', random);
    console.log('profile', profile);

    return res.json(profile);
});

app.get('/api/crushs', (req, res) => {
    const min = 0;
    const max = 5;
    const random = Math.floor(Math.random() * (max - min + 1) + min);
    return res.json({crushs: random});
});


app.post('/api/match', (req, res) => {
    const id = req.body.id;
    const match = Math.random() < 0.16;
    const profile = getProfileById(id);
    const data = {match, profile};

    return res.json(data);
});

app.post('/auth/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if(username === "admin@zoonder.fr" && password === "admin") {// Testing purpose obviously
        return res.json({
            success: true,
            message: "Vous êtes maintenant connectés à Zoonder ! Happy Matching !",
        })
    }
    return res.json({
        success: false,
        message: "Identifiant ou mot de passe incorrect."
    });
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