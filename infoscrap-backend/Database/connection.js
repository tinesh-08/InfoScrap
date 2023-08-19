const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "infoscrap",
});

var del = connection._protocol._delegateError;
connection._protocol._delegateError = function (err, sequence) {
    if (err.fatal) {
        console.trace("fatal error: " + err.message);
    }
    return del.call(this, err, sequence);
};

connection.connect(function (err) {
    if (err) console.log("Database Connection failed");
    else console.log("database connection successfull");
});
module.exports = connection;
