const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Restaurant = require('./models/restaurant');

const bodyParser = require('body-parser');
const session = require("express-session");
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:5500/api/restaurants",    
    credentials: true
}));

const apiRoute = require('./routes/api_routes');
const authRoute = require('./routes/auth_routes');



app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Note: secure should be set to true when in production and using HTTPS
}));
app.use(bodyParser.json());

app.use('/api', apiRoute);
app.use('/users', authRoute);

mongoose.connect('mongodb://localhost:27017/RestaurantRec',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { console.log("MONGO CONNECTION OPEN!!!") })
    .catch(err => { console.log("MONGO CONNECTION ERROR!!!!") })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//For testing purposes only. TODO delete this and add REST routes
app.get('/test', (req, res) => {
    res.send("test successful");

});

app.get('/templates', async (req, res) => {
    const restaurants = await Restaurant.find({});
    res.render('templates/index', { restaurants });
});

app.listen(3001, () => {
    console.log("APP IS LISTENING ON PORT 3001!")
})


