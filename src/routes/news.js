const News = require('../controllers/news');

module.exports = function(app) {
    app.route('/news').post(async (req, res, next) => {
        try {
            const news = request.body;
            await News.postNews(news);
            return res.status(201).send();
        } catch (err) {
            return next(err);
        }
    });
}