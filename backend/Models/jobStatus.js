const mongoose = require('mongoose')

const jobStatusSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['employer', 'jobSeeker']
    },
    companyName: {
        type: String,
        required: function () { return this.type === 'employer' }
    },
    designation: {
        type: String,
        required: function () { return this.type === 'employer' }
    },
    location: {
        type: String,
        required: function () { return this.type === 'employer' }
    },
    jobTitle: {
        type: String,
        required: function () { return this.type === 'jobSeeker' }
    },
    expertiseLevel: {
        type: String,
        required: function () { return this.type === 'jobSeeker' }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Employer', jobStatusSchema)