import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        admin: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        google_user: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true,
        underscored: true,
      }
    );
    return this;
  }
}

export default User;
