const sqlFunctions = require("../Database/sqlFunctions.js");

class Events {
    constructor(app) {
        this.event(app);
    }

    event(app) {
        app.get("/event", async (req, res) => {
            const eventsList = await sqlFunctions.getEvents();
            res.send(eventsList);
        });
    }
}

module.exports = Events;
