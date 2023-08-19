const connection = require("./connection.js");

exports.getEvents = () => {
    let sql = `select * from events order by duration;`;
    return new Promise(async (resolve, reject) => {
        await connection.query(sql, async (err, result) => {
            if (err) console.log(err);
            else {
                resolve(result);
            }
        });
    });
};

exports.getEServices = () => {
    let sql = `select * from eServices order by serviceHeading;`;
    return new Promise(async (resolve, reject) => {
        await connection.query(sql, async (err, result) => {
            if (err) console.log(err);
            else {
                resolve(result);
            }
        });
    });
};

exports.getArticlesList = () => {
    let sql = `select Distinct(articleName) from articles;`;
    return new Promise(async (resolve, reject) => {
        await connection.query(sql, async (err, result) => {
            if (err) console.log(err);
            else {
                resolve(result);
            }
        });
    });
};

exports.getArticles = (articleName) => {
    let sql = `select * from articles where articleName = ?;`;
    return new Promise(async (resolve, reject) => {
        await connection.query(sql,[articleName], async (err, result) => {
            if (err) console.log(err);
            else {
                resolve(result);
            }
        });
    });
};

exports.getNLPEventsInfo = (keywords) => {
    let sql = `select * from events where eventName LIKE ? or description LIKE ?  or staffName LIKE ?  or duration LIKE ?;`;
    return new Promise(async (resolve, reject) => {
        await connection.query(sql,["%"+keywords+"%", "%"+keywords+"%", "%"+keywords+"%", "%"+keywords+"%"], async (err, result) => {``
            if (err) console.log(err);
            else {
                resolve(result);
            }
        });
    });
};
