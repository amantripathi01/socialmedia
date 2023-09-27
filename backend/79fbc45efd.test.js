// Test generated by RoostGPT for test SocialMediaTest using AI Type Open AI and AI Model gpt-4

const request = require('supertest');
const express = require('express');
const app = express();
const path = require('path');

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

describe('GET *', () => {
  it('should respond with a file', async () => {
    const res = await request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200);
    expect(res.text).toContain('<!DOCTYPE html>');
  });

  it('should respond with 404 for non-existent file', async () => {
    const res = await request(app)
      .get('/non_existent_file')
      .expect(404);
  });
});
