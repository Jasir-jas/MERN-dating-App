const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        default: ''
    },
    isRead: {
        type: Boolean,
        default: false  // By default, a message is unread
    },
    attachments: [{
        type: String,  // Array of URLs pointing to attachment files (images, docs, etc.)
        required: false
    }],
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});
messageSchema.pre('save', function (next) {
    if (this.text.trim() === '' && this.attachments.length === 0) {
        next(new Error('A message must have either text or an attachment'));
    } else {
        next()
    }
})
module.exports = mongoose.model('Message', messageSchema);
