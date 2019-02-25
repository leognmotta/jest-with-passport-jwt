const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/testdb';

mongoose.connect(mongoDB, { useNewUrlParser: true });
const User = require('../User');

describe('User model tests', () => {
  beforeAll(async () => {
    await User.remove({});
  });

  afterEach(async () => {
    await User.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Has a module', () => {
    expect(User).toBeDefined();
  });

  describe('get users', () => {
    it('gets a user', async () => {
      const user = new User({ name: 'Leo', email: 'test@test.com', password: '123456' });
      await user.save();

      const foundUser = await User.findOne({ email: 'test@test.com' });
      const expected = user.name;
      const actual = foundUser.name;

      expect(actual).toBe(expected);
    });
  });

  describe('save user', () => {
    it('saves a user & compare passwords', async () => {
      const user = new User({ name: 'Leo', email: 'test@test.com', password: '123456' });
      const savedUser = await user.save();
      const expected = user.name;
      const actual = savedUser.name;

      const match = await savedUser.comparePassword('123456');

      expect(match).toBe(true);
      expect(actual).toBe(expected);
    });
  });

  describe('update user', () => {
    it('updates a user', async () => {
      const user = new User({ name: 'Leo', email: 'test@test.com', password: '123456' });
      await user.save();

      user.name = 'Brian';
      const updatedUser = await user.save();

      const expected = user.name;
      const actual = updatedUser.name;

      expect(actual).toBe(expected);
    });
  });

  describe('getToken', () => {
    it('gets a token', async () => {
      const user = new User({ name: 'Leo', email: 'test@test.com', password: '123456' });
      await user.save();

      const token = user.getToken();

      console.log(token);

      expect(token).toBeDefined();
    });
  });
});
