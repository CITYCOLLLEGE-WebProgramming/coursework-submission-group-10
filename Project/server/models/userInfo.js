const mongoose = require('mongoose');
const userInfoSchema = new mongoose.Schema({

name: {
    type: String,
    required: true
},
surname: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
},
password: {
    type: String,
    required: true,
}

})
const UserInfo = mongoose.model('UserInfo', userInfoSchema);
module.exports = UserInfo;