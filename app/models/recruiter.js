const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecruiterSchema = new Schema({
    // reference to owner
    owner: { type: String, required: true },
    // recruiter
    name: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true },
    position: { type: String, required: true }
});

module.exports = mongoose.model('Recruiter', RecruiterSchema);
