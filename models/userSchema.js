var mongoose = require('mongoose');
var localPassport = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    image: {
        type: String,
        default: 'http://via.placeholder.com/350x150'
    },
    email: {
        type: String,
        required: true
    },
    kind:
        {
            type: String,
            enum: [
                'admin',
                'teacher',
                'student'
            ],
            default: 'student'
        },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isPromote: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
    },
    password: String
})

userSchema.plugin(localPassport);

module.exports = mongoose.model('User', userSchema);