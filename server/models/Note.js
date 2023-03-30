const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    text: {
        type: String,
    }
})

module.exports = mongoose.model('Note', NoteSchema);