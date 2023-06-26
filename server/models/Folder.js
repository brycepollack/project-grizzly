const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    subfolders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Folder'
    },
    notes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Note'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

module.exports = mongoose.model('Folder', FolderSchema);