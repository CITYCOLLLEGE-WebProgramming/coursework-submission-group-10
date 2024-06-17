const mongoose = require('mongoose');
const UserPreferences = require('../models/userPreferences.js');

mongoose.connect('mongodb://localhost:27017/RestaurantRec', { useNewUrlParser: true,
useUnifiedTopology: true })
    .then(() => {console.log("MONGO CONNECTION OPEN!!!")})
    .catch(err => {console.log("OH NO MONGO CONNECTION ERROR!!!!")})

const seedUserPreferences = [
    {userID: 'Duke', foodType: 'Greek', price: 'High', rating: 4.2},

]

UserPreferences.insertOne(seedUserPreferences).then(res => {console.log(res)})
.catch(e => {console.log(e)})