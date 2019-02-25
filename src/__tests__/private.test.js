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

  describe('test /v1/private/... routes', () => {
    describe('/protected', () => {
      it('access private route', async () => {
        const user = new User({ name: 'Leo', email: 'test@test.com', password: '123456' });
        await user.save();

        await request(app)
          .get('/v1/private/protected')
          .set('Authorization', `Bearer ${user.getToken()}`)
          .expect(200);
      });
    });
  });
});
