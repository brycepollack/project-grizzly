const { notes } = require("../sampleData.js");
const Note = require("../models/Note");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Folder = require("../models/Folder");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const { type } = require("express/lib/response.js");
const { default: mongoose } = require("mongoose");

// Note Type
const NoteType = new GraphQLObjectType({
  name: "Note",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    authId: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString },
  }),
});

const FolderType = new GraphQLObjectType({
  name: "Folder",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
    subfolders: {
      type: new GraphQLList(FolderType),
      resolve(parent, args) {
        return Folder.find({ '_id': { $in: parent.subfolders } });
      }
    },
    notes: {
      type: new GraphQLList(NoteType),
      resolve(parent, args) {
        return Note.find({ '_id': { $in: parent.notes } });
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    notes: {
      type: new GraphQLList(NoteType),
      resolve(parent, args) {
        // return notes;
        return Note.find();
      },
    },
    mynotes: {
      type: new GraphQLList(NoteType),
      args: { userId: { type: GraphQLID } },
      resolve(parent, args) {
        // return notes.find(note => note.id === args.id);
        return Note.find({ userId: args.userId });
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
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        // return notes;
        return User.find();
      },
    },
    folder: {
      type: FolderType,
      args: { id: {type: GraphQLID } },
      resolve(parent, args) {
        return Folder.findById(args.id);
      }
    }
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add Note
    addNote: {
      type: NoteType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        text: { type: GraphQLString },
        userId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const note = new Note({
          title: args.title,
          text: args.text,
          userId: args.userId,
        });

        return note.save();
      },
    },

    addUser: {
      type: UserType,
      args: {
        authId: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLString },
        displayName: { type: GraphQLString },
      },
      async resolve(parent, args) {

        const hashedPassword = await bcrypt.hash(args.password, 10);

        const newuser = new User({
          authId: args.authId,
          password: hashedPassword,
          displayName: args.displayName,
        });

        try {
          let user =  await User.findOne({ authId: args.authId });
          if (user) {
            return null
          } else {
            return newuser.save();
          }
        } catch (err) {
          console.error(err);
        }

      },
    },

    // Delete Note
    deleteNote: {
      type: NoteType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Note.findByIdAndRemove(args.id);
      },
    },

    // Update Note
    updateNote: {
      type: NoteType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        text: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Note.findByIdAndUpdate(args.id, {
          title: args.title,
          text: args.text,
        });
      },
    },

    addFolder: {
      type: FolderType,
      args: {
        name: { type: GraphQLString },
        userId: { type: GraphQLNonNull(GraphQLID) },
        subfolders: { type: GraphQLList(GraphQLID) },
        notes: { type: GraphQLList(GraphQLID) },
      },
      resolve(parent, args) {
        const folder = new Folder({
          name: args.name,
          userId: args.userId,
          subfolders: args.subfolders,
          notes: args.notes,
        });
        return folder.save();
      },
    },

    updateFolder: {
      type: FolderType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        subfolders: { type: GraphQLList(GraphQLID) },
        notes: { type: GraphQLList(GraphQLID) },
      },
      resolve(parent, args) {
        return Folder.findByIdAndUpdate(args.id, {
          name: args.name,
          subfolders: args.subfolders,
          notes: args.notes,
        });
      },
    },

    // this needs to be nested tho...
    deleteFolder: {
      type: FolderType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Folder.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
