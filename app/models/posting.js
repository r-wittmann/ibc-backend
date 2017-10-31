const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostingSchema = new Schema({
    // reference to owner
    owner: { type: String, required: true },
    // reference to company
    company: { type: String, required: true },
    // reference to recruiter
    recruiter: { type: String, required: true },
    // posting
    title: { type: String, required: true },
    startDate: { type: String, required: true },
    contractType: { type: String, required: true },
    contractDuration: { type: String, required: true },
    workingHours: { type: String, required: true },
    entryLevel: { type: String, required: true },
    placeOfEmployment: { type: String, required: true },
    content: { type: String, required: true }
});

module.exports = mongoose.model('Posting', PostingSchema);
