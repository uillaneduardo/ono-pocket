import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/server/app.js';

describe('Integration: GET /api/health', () => {
  const app = createApp();

  it('should respond with health check JSON matching the SPEC-001 contract', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      status: 'ok',
      service: 'ono-pocket-api',
    });
    expect(res.body).toHaveProperty('serverTime');
    expect(res.body).toHaveProperty('uptime');
    expect(typeof res.body.uptime).toBe('number');
  });
});
