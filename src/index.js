const express = require('express');
const Task = require('./model/Task');
const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');
const User = require('./model/User');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

// const multer = require('multer');
// const upload = multer({
//     dest: 'images'
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send();
// })

app.listen(port, () => {
    console.log('Server is running at port '+port);
})

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);