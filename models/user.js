
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moongoseUniqueValidatorx = require('mongoose-unique-validator');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    sex: {type: Number, required: true},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

schema.plugin(moongoseUniqueValidatorx);

module.exports = mongoose.model('User', schema);