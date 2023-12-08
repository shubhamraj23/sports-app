const request = require('supertest');
const { app } = require('../../index');

describe('Route to post news.', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should add news item', async () => {
    const data = {
      title: "Title 1",
      description: "Description 1",
      tourId: 3
    }
    const response = await request(server).post('/news').send(data);
    expect(response.status).toBe(201);
  });

  it('should throw missing data fields error', async () => {
    const response = await request(server).post('/news').send();
    expect(response.status).toBe(500);
    expect(response.text).toContain('Data Fields missing')
  });

  it('should throw missing title error', async () => {
    const data = {
      description: "Description 1",
      tourId: 3
    }
    const response = await request(server).post('/news').send(data);
    expect(response.status).toBe(500);
    expect(response.text).toContain('Missing required data field: title')
  });

  it('should throw missing description error', async () => {
    const data = {
      title: "Title 1",
      tourId: 3
    }
    const response = await request(server).post('/news').send(data);
    expect(response.status).toBe(500);
    expect(response.text).toContain('Missing required data field: description')
  });

  it('should throw missing tourId error', async () => {
    const data = {
      title: "Title 1",
      description: "Description 1"
    }
    const response = await request(server).post('/news').send(data);
    expect(response.status).toBe(500);
    expect(response.text).toContain('Either tourId or matchId needs to be specified')
  });

  it('should throw missing tourId error', async () => {
    const data = {
      title: "Title 1",
      description: "Description 1",
      sportId: 1
    }
    const response = await request(server).post('/news').send(data);
    expect(response.status).toBe(500);
    expect(response.text).toContain('Either tourId or matchId needs to be specified')
  });

  it('should throw invalid tourId error', async () => {
    const data = {
      title: "Title 1",
      description: "Description 1",
      tourId: 5
    }
    const response = await request(server).post('/news').send(data);
    expect(response.status).toBe(500);
    expect(response.text).toContain('Invalid tourId')
  });

  it('should throw invalid matchId error', async () => {
    const data = {
      title: "Title 1",
      description: "Description 1",
      matchId: 15
    }
    const response = await request(server).post('/news').send(data);
    expect(response.status).toBe(500);
    expect(response.text).toContain('Invalid matchId')
  });
});