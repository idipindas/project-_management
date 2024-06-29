const express = require('express');
const { userRouter, projectRouter } = require('./routes');
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json()); // For parsing application/json

// Routes
app.use(cors());

app.use('/api/v1/user',userRouter)
app.use('/api/v1/project',projectRouter)

app.get('/test', (req, res) => {
  res.send('hello');
});


module.exports = app;
