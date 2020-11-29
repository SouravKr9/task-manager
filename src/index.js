const express = require('express');
const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');
require('./db/mongoose');

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
    console.log('Server is running at port '+port);
})

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);