const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./User');

describe('User Model Test', () => {
  beforeAll(async () => {
    const uri = process.env.MONGO_URI || 'mongodb://localhost/test';
    await mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  it('create & save user successfully', async () => {
    const userData = { username: 'test', password: '123456' };
    const validUser = new User(userData);
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);

    const isSame = await bcrypt.compare(userData.password, savedUser.password);
    expect(isSame).toBe(true);
  });

  it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
    const userWithInvalidField = new User({ username: 'test', password: '123456', location: 'USA' });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.location).toBeUndefined();
  });

  it('create user without required field should failed', async () => {
    const userWithoutRequiredField = new User({ username: 'test' });
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
      error = savedUserWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).toBeDefined();
  });
});
