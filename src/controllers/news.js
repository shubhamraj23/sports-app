const News = require('../models/news');

const postNews = async (news) => {
    // Check if data is provided or not.
    if (Object.keys(news).length === 0) {
        throw new Error('Data Fields missing');
    }

    if (!news.title) {
        throw new Error('Missing required data field: title');
    }

    if (!news.description) {
        throw new Error('Missing required data field: description');
    }

    if (!news.tourId && !news.matchId) {
        throw new Error('Either tourId or matchId needs to be specified');
    }

    // Check if valid tour and match ids are provided or not.
    if (news.tourId) {
        await News.validateTourId(news.tourId);
    }

    if (news.matchId) {
      await News.validateMatchId(news.matchId);
    }

    // Post the news.
    await News.postNews(news);
}

const getNewsBySportId = async (params) => {
    const { sportId } = params;
    if (!sportId) {
        throw new Error('Missing required parameter: sportId');
    }
    await News.validateSportId(sportId);

    return await News.getNewsBySportId(sportId);
}

const getNewsByTourId = async (params) => {
    const { tourId } = params;
    if (!tourId) {
        throw new Error('Missing required parameter: tourId');
    }
    await News.validateTourId(tourId);

    return await News.getNewsByTourId(tourId);
}

const getNewsByMatchId = async (params) => {
    const { matchId } = params;
    if (!matchId) {
        throw new Error('Missing required parameter: matchId');
    }
    await News.validateMatchId(matchId);

    return await News.getNewsByMatchId(matchId);
}

module.exports = {
    postNews: postNews,
    getNewsBySportId: getNewsBySportId,
    getNewsByTourId: getNewsByTourId,
    getNewsByMatchId: getNewsByMatchId
}