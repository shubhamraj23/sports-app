const News = require('../controllers/news');

module.exports = function(app) {
    // Route to post news
    app.route('/news').post(async (req, res, next) => {
        try {
            const news = req.body;
            await News.postNews(news);
            return res.status(201).send();
        } catch (err) {
            return next(err);
        }
    });
    
    // Route to fetch news by sport id
    app.route('/news/sport').get(async (req, res, next) => {
        try {
            let params = req.query;
            let result = await News.getNewsBySportId(params);
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });

    // Route to fetch news by tour id
    app.route('/news/tour').get(async (req, res, next) => {
        try {
            let params = req.query;
            let result = await News.getNewsByTourId(params);
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });

    // Route to fetch news by match id
    app.route('/news/match').get(async (req, res, next) => {
        try {
            let params = req.query;
            let result = await News.getNewsByMatchId(params);
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });
}