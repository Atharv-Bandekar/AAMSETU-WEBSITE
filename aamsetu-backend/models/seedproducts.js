const { sequelize, Product, User } = require('./index');

const seedProducts = async () => {
  try {
    await sequelize.sync(); // Ensure tables are created

    // Use an existing sellerId or mock one
    const seller = await User.findOne({ where: { role: 'seller' } });
    if (!seller) {
      console.log('No seller found. Please create a seller first.');
      return;
    }

    const sellerId = seller.id;

    await Product.bulkCreate([
      {
        name: 'Alphonso Mangoes',
        description: 'Juicy and sweet premium Alphonso mangoes.',
        price: 450,
        availability: true,
        sellerId
      },
      {
        name: 'Dasheri Mangoes',
        description: 'Popular North Indian variety with rich aroma.',
        price: 300,
        availability: true,
        sellerId
      },
      {
        name: 'Langra Mangoes',
        description: 'Famous for its unique taste and thin skin.',
        price: 320,
        availability: true,
        sellerId
      },
      {
        name: 'Kesar Mangoes',
        description: 'Bright orange pulp and a sweet flavor.',
        price: 400,
        availability: true,
        sellerId
      },
      {
        name: 'Badami Mangoes',
        description: 'Often called Alphonso of Karnataka.',
        price: 350,
        availability: true,
        sellerId
      },
    ]);

    console.log('Dummy products seeded successfully!');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await sequelize.close(); // Always close connection
  }
};

seedProducts();
