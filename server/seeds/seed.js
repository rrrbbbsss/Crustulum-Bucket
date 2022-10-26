const faker = require('faker');

const db = require('../config/connection');
const { Paste, User } = require('../models');

db.once('open', async () => {
  await Paste.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const email = faker.internet.email();
    const password = faker.internet.password();

    userData.push({ email, password });
  }
});

//Not done