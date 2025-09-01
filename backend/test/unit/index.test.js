const { describe, it } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');

// Mock database directly
const mockConnectDB = async () => {
  return { connection: { readyState: 1 } };
};

// Override require cache for database
const databasePath = require.resolve('../../src/config/database');
require.cache[databasePath] = {
  exports: mockConnectDB,
  loaded: true,
  filename: databasePath
};

// Import app after mocking
const app = require('../../index');

describe('Express App Tests', () => {
  it('should export an express app', () => {
    assert.strictEqual(typeof app, 'function');
    assert.strictEqual(typeof app.listen, 'function');
  });

  it('should respond to requests', async () => {
    const response = await request(app).get('/');
    assert.strictEqual(response.status, 200);
  });

  it('should handle 404 routes', async () => {
    const response = await request(app).get('/nonexistent-route');
    assert.strictEqual(response.status, 404);
  });
});