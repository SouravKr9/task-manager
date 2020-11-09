const express = require('express');
const Task = require('../model/Task');
const router = new express.Router();

router.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

router.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((err) => {
        res.status(500).send(err);
    })
})

router.patch('/tasks/:id', (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'completed'];
    const isValidUpdate = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if(!isValidUpdate){
        return res.status(400).send({error: 'Invalid Update'});
    }

    Task.findById(req.params.id).then((task) => {
        if(!task){
            res.status(404).send('No task found');
        }

        updates.forEach((update) => {
            task[update] = req.body[update];
        })

        task.save().then((result) => {
            res.send(result);
        })
    }).catch((err) => {
        res.status(400).send(err);
    });
})

router.delete('/tasks/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id).then((task) => {
        if(!task){
            res.status(404);
            throw new Error('No task found');
        }
        res.send(task);
    }).catch((err) => {
        res.status(400).send(err.message);
    })
})

module.exports = router;