const express = require('express');
const mongoose = require('mongoose');

const mongodbURI = {
    dev: 'mongodb://localhost:27017/silverino'
}

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS policy
app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

// Import routes
const summonersRoute = require('./routes');

// Middlewares
app.use('/summoners', summonersRoute);

// ROUTES
app.get('/', (req, res) => {
    res.send('Silverino base page');
});

// Connect to DB
mongoose.connect(mongodbURI.dev,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => {
        console.log('Connection to database estblished!');
    }
);

app.listen(3000);
