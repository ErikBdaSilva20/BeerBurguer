import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import Category from '../app/models/Category.js';
import Product from '../app/models/Product.js';
import User from '../app/models/User.js';
import configDatabase from '../config/database.cjs';

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = configDatabase.url 
      ? new Sequelize(configDatabase.url, configDatabase) 
      : new Sequelize(configDatabase);
    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongooseConnection = mongoose.connect(
      process.env.MONGO_URL || 'mongodb://localhost:27017/devburguer',
    );
  }
}

export default new Database();
