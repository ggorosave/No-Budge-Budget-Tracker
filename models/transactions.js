const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Transactions extends Model { }

Transactions.init(
  {
    // Manually define the primary key
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },


    user_id: {
      type: DataTypes.INTEGER,
      //allowNull: false,
      references: {
        model: "user",
        key: 'id'
      },
      onDelete: 'SET NULL'


    },

    category_id: {
      type: DataTypes.INTEGER,
      //allowNull: false,
      references: {
        model: "category",
        key: 'id'
      },
      onDelete: 'SET NULL'


    },

    transaction_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },


    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    item_name: {
      type: DataTypes.STRING,

    },






  },
  {
    sequelize,
    timestamps: false,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    underscored: true,
    modelName: 'transactions'
  }
);

module.exports = Transactions;
