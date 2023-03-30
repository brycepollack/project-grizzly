const mongoose = require('mongoose');

const connectDB = async () => {
    console.log(process.env.NODE_ENV);
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
}

module.exports = connectDB;