const request = require('supertest');
const app = require('./app');
const { connectDatabase } = require('./config/database');
const cloudinary = require('cloudinary');

describe('Server', () => {
  let server;

  beforeAll(async () => {
    await connectDatabase();
    server = app.listen(process.env.PORT);
  });

  afterAll(async () => {
    await server.close();
  });

  test('should start and listening on defined port', async () => {
    const res = await request(server).get('/');
    expect(res.status).toEqual(200);
  });

  test('should return 404 for non-existent routes', async () => {
    const res = await request(server).get('/non-existent-route');
    expect(res.status).toEqual(404);
  });
});
