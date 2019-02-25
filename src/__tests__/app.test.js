const app = require('../app');
const request = require('supertest');

describe('App test', () => {
  it('has a module', () => {
    expect(app).toBeDefined();
  });

  let server;

  beforeAll(() => {
    server = app.listen(3002, () => console.log('listening port 3002'));
  });

  afterAll(done => {
    mongoose.Model.remove({}, err => console.log('cleared DB'));
    mongoose.connection.close();
    server.close(done);
  });

  describe('error handling tests', () => {
    it('gets 404 & gets to error handling', async () => {
      await request(server)
        .get('/unknownrout')
        .expect(404);
    });
  });
});
