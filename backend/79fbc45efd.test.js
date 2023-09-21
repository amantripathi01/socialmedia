// Test generated by RoostGPT for test ExpressJs using AI Type Open AI and AI Model gpt-4

const request = require('supertest');
const express = require("express");
const app = express();
const path = require("path");

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
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
});
