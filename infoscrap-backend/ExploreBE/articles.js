const sqlFunctions = require("../Database/sqlFunctions.js");

class Articles {
    constructor(app) {
        this.getArticlesList(app);
        this.getArticles(app);
    }

    getArticlesList(app) {
        app.get("/getArticlesList", async (req, res) => {
            const articles = await sqlFunctions.getArticlesList();
            res.send(articles);
        });
    }

    getArticles(app) {
        app.get("/getArticles", async (req, res) => {
            let { articleName } = req.query
            articleName = articleName.replaceAll("%20"," ")
            const articlesList = await sqlFunctions.getArticles(articleName);
            res.send(articlesList);
        });
    }
}
module.exports = Articles;
