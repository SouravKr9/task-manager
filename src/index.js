const express = require('express');
const Task = require('./model/Task');
const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');
const User = require('./model/User');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is running at port '+port);
})

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


// const main = async () => {
//     const user = await User.findById('5fb2c094aee55ccdf135f83e');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }

// main();