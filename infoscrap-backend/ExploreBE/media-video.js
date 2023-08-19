const puppeteer = require("puppeteer");

class MediaVideo {
    constructor(app) {
        this.event(app);
    }

    event(app) {
        app.get("/mediaVideo", async (req, res) => {
            console.log("HELLO MediaVideo");
            const browser = await puppeteer.launch({headless:false});
            const page = await browser.newPage();
            await page.goto("https://labour.gov.in/video");


            const grabText = await page.evaluate(()=>{
                const totPart = document.querySelectorAll(".item-list ul li");
                let arr = [];
                totPart.forEach((quoteTag) => {
                    const heading = quoteTag.querySelector("a");
                    const link = quoteTag.querySelector("iframe");
                    // const x = title[2].querySelector("a");
                    arr.push({  heading : heading.innerText,
                                link : link.src,
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

module.exports = MediaVideo;
