var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecruiterSchema = new Schema({
    // reference to company
    company: { type: String, required: true },
    // recruiter
    name: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true }
    // ======================
    // lots of stuff missing.
    // ======================
});

module.exports = mongoose.model('Recruiter', RecruiterSchema);
