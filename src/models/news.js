const mysql = require('../lib/mysql');

const postNews = async (news) => {
    let title = news.title;
    let description = news.description;
    let matchId, sportId, tourId;

    if (news.matchId) {
        matchId = news.matchId;
        sportId = null;

        const tourIdStatement = `SELECT tourId from matches where id = ${matchId}`;
        const results = await mysql.query(tourIdStatement);
        tourId = results[0].tourId;
    }

    if (news.tourId) {
        tourId = news.tourId;
        matchId = NULL;

        const sportIdStatement = `SELECT sportId from tours where id = ${tourId}`;
        const results = await mysql.query(sportIdStatement);
        tourId = results[0].sportId;      
    }

    statement = 
        `INSERT INTO mydb.news (title, description, sportId, tourId, matchId)
        values (${title}, ${description}, ${sportId}, ${tourId}, ${matchId});`
    
    await mysql.query(statement);

}

const validateTourId = async (tourId) => {
    const statement = `SELECT id FROM tours WHERE id = ${tourId}`;
    result = await mysql.query(statement);
    if (results.length == 0) {
        throw new Error('Invalid tourId');
    }
}

const validateMatchId = async (matchId) => {
    const statement = `SELECT id FROM matches WHERE id = ${matchId}`;
    result = await mysql.query(statement);
    if (results.length == 0) {
        throw new Error('Invalid matchId');
    }
}

module.exports = {
  postNews: postNews,
  validateTourId: validateTourId,
  validateMatchId: validateMatchId
}