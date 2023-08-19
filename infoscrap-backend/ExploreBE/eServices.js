const sqlFunctions = require("../Database/sqlFunctions.js");

class EServices {
    constructor(app) {
        this.eService(app);
    }

    eService(app) {
        app.get("/eService", async (req, res) => {
            const eServicesList = await sqlFunctions.getEServices();
            res.send(eServicesList);
        });
    }
}
module.exports = EServices;
