const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastEditedAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Note', NoteSchema);