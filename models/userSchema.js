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
        required: true,
        unique: true
    },
    type:
        {
            type: String,
            enum: [
                'admin',
                'teacher',
                'student'
            ],
            default: 'student'
        },
    username: {
        type: String,
        unique: true
    },
    password: String,
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
    ]
})

userSchema.plugin(localPassport);

module.exports = mongoose.model('User', userSchema);