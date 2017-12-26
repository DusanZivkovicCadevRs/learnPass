var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    name: String,
    code: {
        type: String,
        unique: true
    },
    description: String,
    image: {
        type: String,
        default: 'http://via.placeholder.com/350x150'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    students: [{
        data: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        entryDate: {
            type: Date,
            default: Date.now
        },
        _id: false
    }]
});

courseSchema.pre('remove', function (next) {
    this.model('User').update({ courses: this._id }, { $pull: { courses: this._id } }, { multi: true }).exec();
    next();
});

module.exports = mongoose.model('Course', courseSchema);