const request = require('supertest');
const mysql = require('../../src/lib/mysql');
const { app } = require('../../index');

describe('Route to post news', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should add news item', async () => {
    const data = {
      title: "Added via testing",
      description: "Added via testing",
      tourId: 1
    }
    const response = await request(server).post('/news').send(data);
    expect(response.status).toBe(201);
  });

  it('should add news item', async () => {
    const data = {
      title: "Added via testing 2",
      description: "Added via testing 2",
      matchId: 3
    }
    const response = await request(server).post('/news').send(data);
    expect(response.status).toBe(201);
  });

  it('should throw missing data fields error', async () => {
    const response = await request(server).post('/news').send();
    expect(response.status).toBe(500);
    expect(response.text).toContain('Data Fields missing');
  });

  it('should throw missing title error', async () => {
    const data = {
      description: "Description 1",
      tourId: 3
    }
    const response = await request(server).post('/news').send(data);
    expect(response.status).toBe(500);
    expect(response.text).toContain('Missing required data field: title');
  });

  it('should throw missing description error', async () => {
    const data = {
      title: "Title 1",
      tourId: 3
    }
    const response = await request(server).post('/news').send(data);
    expect(response.status).toBe(500);
    expect(response.text).toContain('Missing required data field: description');
  });

  it('should throw missing tourId error', async () => {
    const data = {
      title: "Title 1",
      description: "Description 1"
    }
    const response = await request(server).post('/news').send(data);
    expect(response.status).toBe(500);
    expect(response.text).toContain('Either tourId or matchId needs to be specified');
  });

  it('should throw missing tourId error', async () => {
    const data = {
      title: "Title 1",
      description: "Description 1",
      sportId: 2
    }
    const response = await request(server).post('/news').send(data);
    expect(response.status).toBe(500);
    expect(response.text).toContain('Either tourId or matchId needs to be specified');
  });

  it('should throw invalid tourId error', async () => {
    const data = {
      title: "Title 1",
      description: "Description 1",
      tourId: 5
    }
    const response = await request(server).post('/news').send(data);
    expect(response.status).toBe(500);
    expect(response.text).toContain('Invalid tourId');
  });

  it('should throw invalid matchId error', async () => {
    const data = {
      title: "Title 1",
      description: "Description 1",
      matchId: 15
    }
    const response = await request(server).post('/news').send(data);
    expect(response.status).toBe(500);
    expect(response.text).toContain('Invalid matchId');
  });
});

describe('Route to fetch news by sportId', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return valid response', async () => {
    const response = await request(server).get('/news/sport?sportId=2');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(6);
  });

  it('should throw missing sportId error', async () => {
    const response = await request(server).get('/news/sport');
    expect(response.status).toBe(500);
    expect(response.text).toContain('Missing required parameter: sportId');
  });

  it('should throw invalid sportId error', async () => {
    const response = await request(server).get('/news/sport?sportId=3');
    expect(response.status).toBe(500);
    expect(response.text).toContain('Invalid sportId');
  });
});

describe('Route to fetch news by tourId', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return valid response', async () => {
    const response = await request(server).get('/news/tour?tourId=2');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(6);
  });

  it('should return valid response', async () => {
    const response = await request(server).get('/news/tour?tourId=3');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
  });

  it('should throw missing tourId error', async () => {
    const response = await request(server).get('/news/tour');
    expect(response.status).toBe(500);
    expect(response.text).toContain('Missing required parameter: tourId');
  });

  it('should throw invalid tourId error', async () => {
    const response = await request(server).get('/news/tour?tourId=5');
    expect(response.status).toBe(500);
    expect(response.text).toContain('Invalid tourId');
  });
});

describe('Route to fetch news by matchId', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return valid response', async () => {
    const response = await request(server).get('/news/match?matchId=1');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it('should return valid response', async () => {
    const response = await request(server).get('/news/match?matchId=4');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it('should throw missing matchId error', async () => {
    const response = await request(server).get('/news/match');
    expect(response.status).toBe(500);
    expect(response.text).toContain('Missing required parameter: matchId');
  });

  it('should throw invalid matchId error', async () => {
    const response = await request(server).get('/news/match?matchId=16');
    expect(response.status).toBe(500);
    expect(response.text).toContain('Invalid matchId');
  });
});

describe('Route to post tour news adds news to sport', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should post tour news and add news to sport', async () => {
    const data = {
      title: "Added via testing",
      description: "Added via testing",
      tourId: 4
    }
    const statement = `SELECT COUNT(*) AS ct FROM news WHERE sportId = 2`
    const results = await mysql.query(statement);
    const rows = results[0].ct

    await request(server).post('/news').send(data);
    const response = await request(server).get('/news/sport?sportId=2');
    expect(response.body.length).toBe(rows + 1);
  });

});

describe('Route to post match news adds news to tour', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should post match news and add news to tour', async () => {
    const data = {
      title: "Added via testing",
      description: "Added via testing",
      matchId: 11
    }
    const statement = `SELECT COUNT(*) AS ct FROM news WHERE tourId = 4`
    const results = await mysql.query(statement);
    const rows = results[0].ct

    await request(server).post('/news').send(data);
    const response = await request(server).get('/news/tour?tourId=4');
    expect(response.body.length).toBe(rows + 1);
  });

});