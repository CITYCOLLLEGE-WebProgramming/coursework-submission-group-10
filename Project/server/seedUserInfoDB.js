const mongoose = require('mongoose');
const UserInfo = require('../models/userInfo.js');

mongoose.connect('mongodb://localhost:27017/RestaurantRec', { useNewUrlParser: true,
useUnifiedTopology: true })
    .then(() => {console.log("MONGO CONNECTION OPEN!!!")})
    .catch(err => {console.log("OH NO MONGO CONNECTION ERROR!!!!")})

const seedUserInfo = [
    {name: 'Duke', surname: 'Nukem', email: 'dnukem@gmail.com', password: 'blowup'},

]

UserInfo.insertOne(seedUserInfo).then(res => {console.log(res)})
.catch(e => {console.log(e)})