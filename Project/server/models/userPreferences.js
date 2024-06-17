const mongoose = require('mongoose');
const userPreferencesSchema = new mongoose.Schema({

user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInfo',
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
    required: true,
},

})

const UserPreferences = mongoose.model('userPreferences', userPreferencesSchema);
module.exports = UserPreferences;