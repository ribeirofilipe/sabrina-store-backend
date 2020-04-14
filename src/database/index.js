const mongoose = require('mongoose');
require('dotenv').config();

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    console.log(process.env.MONGO_URL);
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  }
}

module.exports = new Database();