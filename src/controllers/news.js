const News = require('../models/news');

const postNews = async (news) => {
    // Check if data is provided or not.
    if (!news) {
        throw new Error('Data Fields missing');
    }

    if (!news.title) {
        throw new Error('Missing required data field: title');
    }

    if (!news.description) {
        throw new Error('Missing required data field: description');
    }

    if (!news.tourId || !news.matchId) {
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

module.exports = {
    postNews: postNews
}