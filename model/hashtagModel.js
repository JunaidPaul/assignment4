var mongoose = require("mongoose");
var schema = mongoose.Schema;

var hashtagSchema = new schema({
    name: String,
    created_at: Date
});

module.exports = mongoose.model('hashtag', hashtagSchema);