const sinon = require('sinon');
const UserServices = require('../User_services');

describe('UserService tests', () => {
  it('has a module', () => {
    expect(UserServices).toBeDefined();
  });

  describe('listUsers test', () => {
    it('lists users', () => {
      const MockModel = {
        find: sinon.spy()
      };
      const userServices = UserServices(MockModel);
      userServices.listUsers();

      const expected = true;
      const actual = MockModel.find.calledOnce;

      expect(actual).toBe(expected);
    });
  });

  describe('createUser test', () => {
    it('creates a user', () => {
      const save = sinon.spy();
      let name;
      let email;
      let password;

      const MockModel = function(data) {
        name = data.name;
        email = data.email;
        password = data.password;

        return {
          ...data,
          save
        };
      };

      const userServices = UserServices(MockModel);

      try {
        userServices.createUser('Leo', 'test@test.com', '123456');
      } catch (error) {
        console.log(error);
      }

      const expected = true;
      const actual = save.calledOnce;

      expect(actual).toBe(expected);
      expect(name).toBe('Leo');
      expect(email).toBe('test@test.com');
      expect(password).toBe('123456');
    });

    it('test creatUser error', async () => {
      const save = sinon.spy();
      let name;
      let email;
      let password;

      const MockModel = function(data) {
        name = data.name;
        email = data.email;
        password = data.password;

        return {
          ...data,
          save
        };
      };
      const userServices = UserServices(MockModel);

      let expected;

      try {
        await userServices.createUser('Leo', 'test@test.com');
      } catch (error) {
        expected = false;
      }
      const actual = save.calledOnce;

      expect(actual).toBe(expected);
      expect(name).toBeUndefined();
      expect(email).toBeUndefined();
      expect(password).toBeUndefined();
    });
  });
});
