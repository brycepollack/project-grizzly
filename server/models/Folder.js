const mongoose = require('mongoose');
const Note = require('./Note');

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

FolderSchema.post('findOneAndRemove', async function(doc) {
    const noteIds = doc.notes.map(String);
    await Note.deleteMany({ _id: { $in: noteIds }});

    const folderIds = doc.subfolders.map(String);
    folderIds.map(async id => {
        await mongoose.models['Folder'].findOneAndRemove({ _id: id });
    })
})

module.exports = mongoose.model('Folder', FolderSchema);