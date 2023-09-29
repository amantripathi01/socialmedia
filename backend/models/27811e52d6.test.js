const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./User");

describe("User Model Test", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  test("create & save user successfully", async () => {
    const userData = { username: "test", password: "123456" };
    const validUser = new User(userData);
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);

    expect(savedUser.password).not.toBe(userData.password);
    const isPasswordMatch = await bcrypt.compare(userData.password, savedUser.password);
    expect(isPasswordMatch).toBe(true);
  });

  test("insert user successfully, but the field not defined in schema should be undefined", async () => {
    const userWithInvalidField = new User({ username: "test", password: "123456", location: "USA" });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.location).toBeUndefined();
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
