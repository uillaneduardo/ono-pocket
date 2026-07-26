import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/server/app.js';

describe('GET /health & /api/health', () => {
  const app = createApp();

  it('should return 200 OK with SPEC-001 contract response', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('service', 'ono-pocket-api');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('serverTime');
    expect(new Date(response.body.serverTime).getTime()).not.toBeNaN();
    expect(response.body).toHaveProperty('uptime');
  });

  it('should return 200 OK for /api/health endpoint', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('service', 'ono-pocket-api');
  });
});
