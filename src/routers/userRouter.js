const express = require('express');
const User = require('../model/User');
const router = new express.Router();

router.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

router.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch((err) => {
        res.status(500).send(err);
    })
})

router.get('/users/:id', (req, res) => {
    const _id = req.params.id;

    User.findById(_id).then((user) => {
        if(!user){
            return res.status(404).send('User Not Found !!!');
        }

        res.send(user);
    }).catch((err) => {
        res.status(500).send(err);
    })
})

router.patch('/users/:id', (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'age', 'password'];
    const isValidUpdate = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if(!isValidUpdate){
        return res.status(400).send({error : 'Invalid Update'});
    }

    User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}).then((result) => {
        if(!result){
            res.status(404).send('No user found');
        }
        res.send(result);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

router.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then((user) => {
        if(!user){
            res.status(404);

            throw new Error('User Not Found');
        }
        res.send(user);
    }).catch((err) => {
        res.status(400).send(err.message);
    })
})

module.exports = router;