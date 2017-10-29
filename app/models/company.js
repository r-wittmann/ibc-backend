const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    // reference to user table
    owner: { type: String, required: true },
    // company
    name: { type: String, required: true },
    address: { type: String, required: false },
    // ======================
    // lots of stuff missing.
    // ======================
});

module.exports = mongoose.model('Company', CompanySchema);
