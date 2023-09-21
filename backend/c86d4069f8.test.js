// Test generated by RoostGPT for test ExpressJs using AI Type Open AI and AI Model gpt-4

const request = require('supertest');
const app = require('./app');

describe('Server Test Suite', () => {
  let server;

  beforeAll(async () => {
    server = app.listen(process.env.PORT);
  });

  afterAll(async () => {
    await server.close();
  });

  test('Server is running on the correct port', async () => {
    const res = await request(server).get('/');
    expect(res.statusCode).toEqual(200);
  });

  test('Server is not running on an incorrect port', async () => {
    const incorrectPort = 9999;
    const incorrectServer = app.listen(incorrectPort);

    await incorrectServer.close();

    await expect(request(incorrectServer).get('/')).rejects.toThrow();
  });
});
