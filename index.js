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

server.get('/api/users', (req,res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                error: "The users information could not be retrieved."
            });
        });
});

server.get('/api/users/:id', (req,res) => {
    const {id} = req.params;

    if (!id) console.log('no id param');

    db.findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The user information could not be retrieved."        });
        });
});

server.listen(4000, () => {
    console.log('listening on 4000')
});