const mysql = require('../lib/mysql');

const getAllSportsToursAndMatches = async () => {
    const statement = 
    `
    SELECT
      s.name AS sportName,
      t.name AS tourName,
      m.name AS matchName,
      m.id AS matchId,
      m.startTime AS startTime,
      m.format AS format

    FROM
      matches AS m

    INNER JOIN
      tours AS t

    ON
      m.tourId = t.id

    INNER JOIN
      sports AS s

    ON
      t.sportId = s.id
    `
    const parameters = [];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllSportsToursAndMatches: getAllSportsToursAndMatches
}