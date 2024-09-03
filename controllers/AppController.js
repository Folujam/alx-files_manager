const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

class AppController {
  constructor() {
    this.dbClient = dbClient;
    this.redisClient = redisClient;
  }

  async getStatus(req, res) {
    const redisAlive = await this.redisClient.isAlive();
    const dbAlive = await this.dbClient.isAlive();

    res.status(200).json({ redis: redisAlive, db: dbAlive });
  }

  async getStats(req, res) {
    const usersCount = await this.dbClient.nbUsers();
    const filesCount = await this.dbClient.nbFiles();

    res.status(200).json({ users: usersCount, files: filesCount });
  }
}

module.exports = new AppController();
