const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const dayjs = require('dayjs');

// dayjs().format('MM/DD/YYYY')

class Transactions extends Model { }

Transactions.init(
  {
    // Manually define the primary key
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },


    item_name: {
      type: DataTypes.STRING,
      // allowNull: false
    },

    amount: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },

    transaction_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      get: function() {
        return dayjs(this.getDataValue('transaction_date')).format('MM/DD/YYYY')
      },
    },
    
    category_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: "category",
        key: 'id'
      },
      onDelete: 'SET NULL'
    },

    user_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: "user",
        key: 'id'
      },
      onDelete: 'SET NULL'


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
