const request = require('supertest');
const router = require('./calendar');
const express = require('express');

const app = express();
app.use(router);

describe('GET /api/calendar', () => {
  it('returns timeslots', async () => {
    const req = await request(app)
      .get('/api/calendar')
      .expect('Content-Type', /json/)
      .expect(200);

    console.log(req.body);
    expect(req.body).toMatchObject({
      timeslots: expect.arrayContaining(['2022-09-12T11:00:00.000Z']),
    });
  });
});
