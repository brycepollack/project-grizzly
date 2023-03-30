const { notes } = require('../sampleData.js');

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
          return notes;
        },
      },
      note: {
        type: NoteType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return notes.find(note => note.id === args.id);
        },
      },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery
  });