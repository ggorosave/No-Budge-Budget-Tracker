const sequelize = require('../config/connection');


const { User, Category, Transactions} = require('../models');


const userData = require('./userSeedData.json');
const categoryData = require('./categorySeedData.json');
const transactionsData = require('./transactionsSeedData.json');


// console.log(userData);
// console.log(User);
// console.log(Category);
// console.log(Transactions);



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  })

  
  await Category.bulkCreate(categoryData, {
    individualHooks: true,
    returning: true,
  })
  
  await Transactions.bulkCreate(transactionsData, {
    individualHooks: true,
    returning: true,
  })
  
  
  
  
  
  
  
  ;

  process.exit(0);
};

seedDatabase();







/*

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(users_data, {
    individualHooks: true,
    returning: true,
  });

  for (const { id } of users) {
    const newCard = await LibraryCard.create({
      reader_id: id,
    });
  }

  for (const book of bookSeedData) {
    const newBook = await Book.create({
      ...book,
      // Attach a random reader ID to each book
      reader_id: readers[Math.floor(Math.random() * readers.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
*/