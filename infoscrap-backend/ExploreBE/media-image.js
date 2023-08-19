const puppeteer = require("puppeteer");

class MediaImage {
    constructor(app) {
        this.event(app);
    }

    event(app) {
        app.get("/mediaImage", async (req, res) => {
            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage();
            await page.goto("https://labour.gov.in/photo-gallery");

            const grabText = await page.evaluate(() => {
                const training = document.querySelectorAll(".item-list ul li");
                let arr = [];
                training.forEach((quoteTag) => {
                    const title = quoteTag.querySelectorAll("span a");
                    const image = quoteTag.querySelector("img");
                    // const x = title[1].querySelector("a");
                    arr.push({
                        Topic: title[0].innerText,
                        Link: title[0].href,
                        ImageLink: image.src,
                        // Link : x.href,
                    });
                });
                return arr;
            });

            console.log(grabText);

            await browser.close();
            res.send(grabText);
        });
    }
}

module.exports = MediaImage;
