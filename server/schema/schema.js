const { notes } = require('../sampleData.js');

const Note = require('../models/Note');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} = require('graphql');

// Note Type
const NoteType = new GraphQLObjectType({
    name: 'Note',
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      text: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      notes: {
        type: new GraphQLList(NoteType),
        resolve(parent, args) {
          // return notes;
          return Note.find();
        },
      },
      note: {
        type: NoteType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          // return notes.find(note => note.id === args.id);
          return Note.findById(args.id);
        },
      },
    },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add Note
    addNote: {
      type: NoteType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        text: { type: GraphQLString}
      },
      resolve(parent, args) {
        const note = new Note({
          title: args.title,
          text: args.text
        });

        return note.save();
      }
    },

    // Delete Note
    deleteNote: {
      type: NoteType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Note.findByIdAndRemove(args.id);
      }
    },

    // Update Note
    updateNote: {
      type: NoteType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        text: { type: GraphQLString}
      },
      resolve(parent, args) {
        return Note.findByIdAndUpdate(args.id, { title: args.title, text: args.text} );
      }
    }
  }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
  });