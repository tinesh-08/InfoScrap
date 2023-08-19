const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const database = require("./Database/connection.js");

const Event = require("./ExploreBE/events.js");
const EServices = require("./ExploreBE/eServices.js");
const MediaImage = require("./ExploreBE/media-image.js");
const MediaVideo = require("./ExploreBE/media-video.js");
const EServicesWeb = require("./ExploreBEWebScraping/eServicesWeb.js");
const EventsWeb = require("./ExploreBEWebScraping/eventsWeb.js");
const ArticlesWeb = require("./ExploreBEWebScraping/articlesWeb.js");
const Articles = require("./ExploreBE/articles.js");
const NLPQuery = require("./NLP/nlpProcessQuery.js");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: "Maaz",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1825 * 86400 * 1000,
            httpOnly: false,
        },
    })
);

app.get("/", function (req, res) {
    res.send("abcd");
});

app.get("/fetch-info", function (req, res) {
    res.send("Sena Maaz Sakthi Tinesh Shravani Jeeva");
});

new Event(app);
new EServices(app);
new Articles(app);

new EventsWeb(app)
new EServicesWeb(app)
new ArticlesWeb(app)

new MediaImage(app);
new MediaVideo(app);
new NLPQuery(app)

app.listen(5000, () => console.log("Running on port 5000"));
