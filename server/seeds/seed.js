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

  const createdUsers = await User.collection.insertMany(userData);

  //Create paste // NOTE _id needed
  let createdPastes = [];
  for (let i = 0; i < 100; i += 1) {
    const pasteText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdPaste = await Paste.create({ pasteText, email });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { Pastes: createdPaste._id } }
    );

    createdPastes.push(createdPaste);
  }
  console.log('all done!');
  process.exit(0);
});

//May need some work