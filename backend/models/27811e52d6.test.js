const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require('./User');

describe("User Model", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("should hash password before saving", async () => {
    const user = new User({ username: "testUser", password: "testPassword" });
    await user.save();

    const savedUser = await User.findOne({ username: "testUser" });
    const match = await bcrypt.compare("testPassword", savedUser.password);

    expect(savedUser).not.toBeNull();
    expect(savedUser.password).not.toBe("testPassword");
    expect(match).toBe(true);
  });

  test("should not hash password if it is not modified", async () => {
    const user = new User({ username: "testUser", password: "testPassword" });
    await user.save();

    const savedUser = await User.findOne({ username: "testUser" });
    const initialHashedPassword = savedUser.password;

    savedUser.username = "updatedUser";
    await savedUser.save();

    const updatedUser = await User.findOne({ username: "updatedUser" });

    expect(updatedUser).not.toBeNull();
    expect(updatedUser.username).toBe("updatedUser");
    expect(updatedUser.password).toBe(initialHashedPassword);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
