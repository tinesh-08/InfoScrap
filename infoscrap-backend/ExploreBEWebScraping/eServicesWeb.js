const puppeteer = require("puppeteer");
const sqlFunctions = require("../Database/dataInsert.js");

class EServicesWeb {
    constructor(app) {
        this.eService(app);
    }

    eService(app) {
        app.get("/eServiceWeb", async (req, res) => {
            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage();
            await page.goto("https://wblc.gov.in/e-services");

            const grabText = await page.evaluate(() => {
                const training = document.querySelectorAll(".eservice-box");
                let arr = [];
                training.forEach((quoteTag) => {
                    const title = quoteTag.querySelector("h1");
                    const para = quoteTag.querySelector("p");

                    arr.push({
                        heading: title.innerText,
                        paragraph: para.innerText,
                    });
                });
                return arr;
            });

            await browser.close();
            await sqlFunctions.createEServices(grabText);

            res.send();
        });
    }
}
module.exports = EServicesWeb;
