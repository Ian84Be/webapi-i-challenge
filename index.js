const express = require('express');
const server = express();

server.use(express.json()); // this makes POST and PUT work

const db = require('./data/db.js'); // IMPORT the database

server.post('/api/users', (req,res) => {
    const newUser = req.body;
    console.log(newUser);

    if (newUser.name && newUser.bio) {
        db.insert(newUser)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({
                error: "There was an error while saving the user to the database"            });
        });
    } else {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        }).end();
    }
});

server.listen(4000, () => {
    console.log('listening on 4000')
});