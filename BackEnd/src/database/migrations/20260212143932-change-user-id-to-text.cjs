'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'id', {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeConstraint('orders', 'orders_user_id_fkey', {
        transaction,
      });

      await queryInterface.changeColumn(
        'users',
        'id',
        {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        { transaction }
      );

      await queryInterface.addConstraint('orders', {
        fields: ['user_id'],
        type: 'foreign key',
        name: 'orders_user_id_fkey',
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        transaction,
      });
    });
  },
};
