const MongoClient = require('mongodb').MongoClient;

class DBClient {
  constructor () {
    this.url = `mongodb://${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 27017}`;
    this.dbName = process.env.DB_DATABASE || 'files_manager';
    this.client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });

    this.client.connect((err) => {
      if (err) {
        console.error('MongoDB connection error:', err);
      }
    });
  }

  isAlive () {
    return this.client.topology.isConnected();
  }

  async nbUsers () {
    const db = this.client.db(this.dbName);
    const collection = db.collection('users');
    return await collection.countDocuments();
  }

  async nbFiles () {
    const db = this.client.db(this.dbName);
    const collection = db.collection('files');
    return await collection.countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
