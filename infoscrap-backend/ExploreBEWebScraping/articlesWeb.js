const sqlFunctions = require("../Database/dataInsert.js");
const puppeteer = require("puppeteer");

class ArticlesWeb {
    constructor(app) {
        this.articlesWeb(app);
    }

    articlesWeb(app) {
        app.get("/articleWeb", async (req, res) => {
            console.log("SDV");
            const pagesList = ["https://labour.gov.in/child-women-labour", "https://labour.gov.in/employment-training", "https://labour.gov.in/industrial-relations", "https://labour.gov.in/industrial-safety-health", "https://labour.gov.in/labour-reforms", "https://labour.gov.in/labour-welfare", "https://labour.gov.in/social-security", "https://labour.gov.in/wagess"]
            const pagesName = ["Child Women labour", "Employment Training", "Industrial Relations", "Industrial Safety Health", "Labour Reforms", "Labour Welfare", "Social Security", "Wages"]
            for(let i=0; i<pagesName.length; i++) {
                const browser = await puppeteer.launch({ headless: false });
                const page = await browser.newPage();
                await page.goto(pagesList[i]);
                
                const grabText = await page.evaluate(()=>{
                    const training = document.querySelectorAll("table tbody tr");
                    let arr = [];
                    training.forEach((quoteTag) => {
                        const title = quoteTag.querySelectorAll("td");
                        const x = title[2].querySelector("a");
                        arr.push({  sno : title[0].innerText,
                                    description : title[1].innerText,
                                    link : x.href,
                        });
                    });
                    return arr;
                });
                await sqlFunctions.createArticles(grabText, pagesName[i]);
            }   
                await browser.close();
    
                res.send();
            });
        }
    }
module.exports = ArticlesWeb;
