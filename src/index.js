const express = require('express');
const User = require('./model/User');
const Task = require('./model/Task');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is running at port '+port);
})

app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((err) => {
        res.status(400).send(err);
    })
})