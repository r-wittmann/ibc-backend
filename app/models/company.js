const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    // reference to owner
    owner: { type: String, required: true },
    // company
    name: { type: String, required: true },
    locations: { type: String, required: true },
    // logo: '',
    address: { type: String, required: true },
    mainPointOfContact: { type: String, required: true },
    numberOfEmployees: { type: String, required: true },
    description: { type: String, required: true },
    kununuLink: { type: String, required: true }
});

module.exports = mongoose.model('Company', CompanySchema);
