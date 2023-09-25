const request = require('supertest');
const express = require("express");
const app = express();
const path = require("path");

app.get("*", (req, res, next) => {
  const filePath = path.resolve(__dirname, "../frontend/build/index.html");
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    next(new Error('File does not exist'));
  }
});

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('It should return the correct file', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('<!DOCTYPE html>');
  });

  test('It should response 404 for non-existing paths', async () => {
    const response = await request(app).get('/non-existing');
    expect(response.statusCode).toBe(404);
  });

  test('It should handle file not found', async () => {
    const response = await request(app).get('/file-not-found');
    expect(response.statusCode).toBe(500);
    expect(response.text).toContain('File does not exist');
  });
});
