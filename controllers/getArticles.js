const { ArticleModel } = require("../models");

exports.getArticles = ('/', (req, res) => {
    ArticleModel.find({})
        .then(title => {
            res.status(200).json(title)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        });
});

