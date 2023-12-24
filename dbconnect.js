
// todo : see these two link
// https://www.mongodb.com/community/forums/t/large-number-of-connections-with-mongoose-and-vercel/204917/8

  
//https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js


const mongoose = require('mongoose');


global.mongoose = global.mongoose || { conn: null, promise: null };


async function connect() {
  // Check if connection is already cached
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  // Initialize connection options
  if (!global.mongoose.promise) {
    const opts = {
      maxPoolSize: 2,
      maxIdleTimeMS: 60000,
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
      heartbeatFrequencyMS: 10000,
    };


    console.log("---Connecting to MongoDB---");

    try {
         global.mongoose.promise = mongoose.connect(__configurations.MONGO_URI || "", opts).then((mongoose) => {
        console.log("---Connected!---");
        return mongoose;
      });
    } catch (e) {
  
      console.log("---Error connecting to MongoDB---", e);
      throw new Error("Error connecting to the database");
    }
  }

  try {
   
    global.mongoose.conn = await global.mongoose.promise;
  } catch (e) {
    
    global.mongoose.promise = null;
    throw e;
  }

 
  return global.mongoose.conn;
}

module.exports = connect;
