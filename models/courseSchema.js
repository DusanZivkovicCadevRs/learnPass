var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    name: String,
    code: String,
    description: String,
    image: {
        type: String,
        default: 'http://via.placeholder.com/350x150'
    }        
});

module.exports = mongoose.model('Course', courseSchema);