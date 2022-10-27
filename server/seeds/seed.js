const faker = require('faker');

const db = require('../config/connection');
const { Paste, User } = require('../models');

db.once('open', async () => {
  await Paste.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 10; i += 1) {
    const email = faker.internet.email();
    const password = faker.internet.password();

    userData.push({ email, password });
  }

  const users = await User.collection.insertMany(userData);
  const createdUsers = await User.find({})
  console.log(createdUsers);


  //Create paste // NOTE _id needed
  let createdPastes = [];
  for (let i = 0; i < 10; i += 1) {
    const pasteText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
    const { _id: userId } = createdUsers[randomUserIndex];

    const createdPaste = await Paste.create({ pasteText });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { pastes: createdPaste._id } }
    );

    createdPastes.push(createdPaste);
  }
  console.log('all done!');
  const updatedUsers = await User.find({}).populate("pastes")
  console.log(JSON.stringify(updatedUsers, null, 4));

  process.exit(0);
});

//May need some work