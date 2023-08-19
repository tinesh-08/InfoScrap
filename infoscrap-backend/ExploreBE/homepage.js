const sqlFunctions = require("../Database/sqlFunctions.js");

class Homepage {
    constructor(app) {
        this.suggest(app);
    }

    suggest(app) {
        app.get("/suggestion", async (req, res) => {
            const eventsList = await sqlFunctions.getEvents();
            res.send(eventsList);
        });
    }
}

module.exports = Homepage;
