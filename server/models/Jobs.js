const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');


const jobsSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
    },
}, { timestamps: true });

jobsSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Jobs', jobsSchema);
