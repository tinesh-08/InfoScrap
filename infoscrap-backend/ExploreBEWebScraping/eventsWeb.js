const sqlFunctions = require("../Database/dataInsert.js");
const puppeteer = require("puppeteer");

class EventsWeb {
    constructor(app) {
        this.event(app);
    }

    event(app) {
        app.get("/eventWeb", async (req, res) => {
            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage();
            await page.goto("https://vvgnli.gov.in/en/training");

            const grabText = await page.evaluate(() => {
                const training = document.querySelectorAll(
                    ".views-field.views-field-nothing"
                );
                let arr = [];
                training.forEach(async (quoteTag) => {
                    const title = quoteTag.querySelectorAll("span div");
                    const link = title[0].querySelector("a");
                    arr.push({
                        event: title[0].innerText,
                        eventLink: link.href,
                        staffName: title[1].innerText,
                        duration: title[3].innerText,
                        description: title[4].innerText,
                    });
                });
                return arr;
            });
            browser.close();

            await sqlFunctions.createEvent(grabText);
            res.send();
        });
    }
}

module.exports = EventsWeb;
