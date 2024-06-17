const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
},
foodType: {
    type: String,
    required: true,
},
price: {
    type: String,
    required: true,
},
rating: {
    type: Number,
    required: true
},
description: {
    type: String,
    required: true
},
/*
user: {                                                         //relation to UserInfo
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInfo',
    required: true
}
*/
})
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;