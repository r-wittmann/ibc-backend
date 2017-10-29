var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostingSchema = new Schema({
    // reference to owner
    owner: {type: String, required: true},
    // reference to company
    company: { type: String, required: true },
    // reference to recruiter
    recruiter: { type: String, required: true },
    // posting
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    content: { type: String, required: true }
    // ======================
    // lots of stuff missing.
    // ======================
});

module.exports = mongoose.model('Posting', PostingSchema);
