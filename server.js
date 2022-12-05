const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require('mongoose')
const getMatches = require("./scrapers/getMatches");
const getAllMatches = require("./scrapers/getAllMatches");
const user = require('./routes/users/users');
const adminUser = require('./routes/admin/users');
const sports = require('./routes/sports');

mongoose.connect('mongodb://127.0.0.1:27017/sportBet', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));
    
setInterval(() => {
// getMatches();
// getAllMatches();
}, 30000);

app.use(express.static(__dirname));
app.get('/*', function(){
    res.sendFile(path.join(__dirname, 'index.html'))
});
// using middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use('/user', user);
app.use('/admin', adminUser);
app.use('/sports', sports);

// listenig to port
const port = 5000
app.listen(port, () => {
    console.log('server is running on: ' + port);
})