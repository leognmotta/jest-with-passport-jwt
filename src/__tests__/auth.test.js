const app = require('../app');
const User = require('../models/User');
const request = require('supertest');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/testdb';

mongoose.connect(mongoDB, { useNewUrlParser: true });

describe('App test', () => {
  beforeEach(done => {
    for (let i in mongoose.connection.collections) {
      mongoose.connection.collections[i].deleteOne({});
    }

    return done();
  });

  afterAll(done => {
    mongoose.connection.close();
    done();
  });

  describe('test /v1/auth/... routes', () => {
    describe('/signup', () => {
      it('sign up a user', async () => {
        await request(app)
          .post('/v1/auth/signup')
          .send({ name: 'Leo', email: 'test2@test.com', password: '123456' })
          .expect(201);
      });

      it('refuse user already created', async () => {
        const user = new User({ name: 'Leo', email: 'test@test.com', password: '123456' });
        await user.save();

        await request(app)
          .post('/v1/auth/signup')
          .send({ name: 'Leo', email: 'test@test.com', password: '123456' })
          .expect(400);
      });
    });

    describe('/signin', () => {
      it('sign in a user with credentials', async () => {
        const user = new User({ name: 'Leo', email: 'test3@test.com', password: '123456' });
        await user.save();

        await request(app)
          .post('/v1/auth/signin')
          .send({ email: 'test3@test.com', password: '123456' })
          .expect(200);
      });

      it('refuses user with wrong credentials', async () => {
        const user = new User({ name: 'Leo', email: 'test@test.com', password: '123456' });
        await user.save();

        await request(app)
          .post('/v1/auth/signin')
          .send({ email: 'test@test.com', password: '123' })
          .expect(400);
      });

      it('refuses for missing fields', async () => {
        await request(app)
          .post('/v1/auth/signin')
          .send({ email: 'test@test.com' })
          .expect(400);
      });
    });
  });
});
