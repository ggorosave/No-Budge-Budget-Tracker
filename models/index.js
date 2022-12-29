// Boiler-plate code ***Will need to be updated!*** 
const User = require('./User');
const Category = require('./Category');
const Transactions = require('./Transactions');

User.hasMany(Transactions, {
  foreignKey: 'user_id'
});
Transactions.belongsTo(User, {
  foreignKey: 'user_id'
});

Category.hasMany(Transactions, {
  foreignKey: 'category_id'
});
Transactions.belongsTo(Category, {
  foreignKey: 'category_id'
});






module.exports = { User, Category, Transactions };