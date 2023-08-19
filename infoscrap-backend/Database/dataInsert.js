const connection = require("./connection.js");
const uuid = require("uuid-random");

exports.createEvent = (result) => {
    console.log(result.length);
    let sql = `insert into events values(?,?,?,?,?,?);`;
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < result.length; i++) {
            let eventId = uuid();
            await connection.query(
                sql,
                [
                    eventId,
                    result[i].event,
                    result[i].staffName,
                    result[i].description,
                    result[i].eventLink,
                    result[i].duration,
                ],
                (err, result) => {
                    if (err) console.log(err);
                    else {
                        console.log("Event Has been Created Successfully");
                    }
                }
            );
        }
    });
};

exports.createEServices = (result) => {
    console.log(result.length);
    let sql = `insert into eServices values(?,?,?);`;
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < result.length; i++) {
            let eServiceId = uuid();
            await connection.query(
                sql,
                [
                    eServiceId,
                    result[i].heading,
                    result[i].paragraph
                ],
                (err, result) => {
                    if (err) console.log(err);
                    else {
                        console.log("EService Has been Created Successfully");
                    }
                }
            );
        }
    });
};

exports.createArticles = (result, articleName) => {
    console.log(result.length);
    let sql = `insert into articles values(?,?,?,?);`;
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < result.length; i++) {
            let articleId = uuid();
            await connection.query(
                sql,
                [
                    articleId,
                    articleName,
                    result[i].description,
                    result[i].link
                ],
                (err, result) => {
                    if (err) console.log(err);
                    else {
                        resolve()
                    }
                }
            );
        }
        console.log("Article Has been Created Successfully", articleName);
    });
};
