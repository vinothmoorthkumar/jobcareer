const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');


const jobsSchema = new mongoose.Schema({
    userId:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    jobId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Jobs'},
}, { timestamps: true });

jobsSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('appliedJob', jobsSchema);
