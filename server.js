const PORT = 8000;

import cors from 'cors';
import express from 'express';
import puppeteer from 'puppeteer';
import { websites, websiteLinks } from "./src/components/Websites.js";


const app = express();
app.use(cors());

var grants;

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));


app.get('/grants', async(req, res) => {
    grants = [];
    try {
        for(var index = 0; index < websites.length; index++){
            // let index = 3;
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(websiteLinks[index]);

            if(websites[index] === "SSHRC"){
                await page.evaluate(function() {
                    document.getElementById('dt_applicant').value = "Graduate student";
                    // document.getElementById('dataset-filter_length').querySelector('select').value = "100";
                    document.getElementById('btnFilter').click();
                    // document.getElementsByName('dataset-filter_length').value = "100";
                });
                await timeout(1500);
            }

            let site = websites[index];

            let searchReturn = await page.evaluate((site) => {
                let results = [];
                let items;
                switch(site){
                    case "CIHR":
                        items = document.getElementById('details-panel1').querySelectorAll('li');
                        items.forEach((item) => {
                            results.push({
                                title: item.querySelector('a').text,
                                link: item.querySelector('a').href,
                                amount: '',
                                deadline: '',
                                page: site
                            });
                        });
                        return results;
                    case "SSHRC":
                        items = document.querySelectorAll('tbody > tr');
                        //tbody
                        //  tr
                        //      td
                        //          h3
                        //              a href
                        //          /h3
                        //          p
                        //          /p
                        //          p
                        //          /p
                        //      /td
                        //  /tr
                        ///tbody
                        items.forEach((item) => {
                            let contentList = item.querySelectorAll('p').innerHTML;
                            let content = "";
                            for(let contentItem in contentList){
                                content = content.concat(contentItem, " ");
                            }
                            results.push({
                                title: item.querySelector('h3').innerText,
                                link: item.querySelector('a').href,
                                amount: '',
                                deadline: '',
                                page: site
                            });
                        });

                        return results;
                    case "SHRF":
                        items = document.querySelector('[data-mesh-id="ContainerememrinlineContent-gridContainer"]').childNodes;
                        
                        // unforunately, the HTML for this website is bizarre and there is no real way I can iterate 
                        // through the pieces I want, so I have to do a really bad method here. 
                        // If I discover a better way to do this, I'll come back

                        // the pieces I need have one discernible factor: they all have the class "wixui-rich-text" and they are 
                        // the only ones with this class from the parent downwards.

                        // so! I am going to collect the nodes that have the class "wixui-rich-text", and the second one should be the status
                        // the third one will be the name, the sixth one will have the description

                        // we're going to get the second one to check status, if it's closed or in review, we're going to immediately boot it
                        // if it's open, we're going to keep going and search through the title and the description for the words

                        // the link is located in the 7th child but it won't have this class name, we'll come back for that

                        items.forEach((item) => {
                            var oppNodes = item.querySelectorAll('.wixui-rich-text');
                            var oppStatus = oppNodes[1].innerText;

                            var wrongTab = [
                                "Partnerships",
                                "Connections",
                                "Capacity",
                                "Solutions"
                            ];
                            for(var tab = 0; tab < wrongTab.length; tab++){
                                if(oppStatus === wrongTab[tab]){
                                    oppStatus = oppNodes[0].innerText;
                                    break;
                                }
                            }

                            if(oppStatus === "Closed" || oppStatus === "In Review") return;

                            var wordsIncluded = [];
                            var wordsExcluded = [];
                            
                            var include = 0;

                            var includeWords = [
                                "graduate",
                                "student",
                                "doctora",
                                "phd",
                                "master",
                            ];
                            var excludeWords = [
                                "postdoctora",
                                "postgraduate",
                            ];

                            var opportunity = item.innerText.toLowerCase();

                            includeWords.forEach((word) => {
                                var num = opportunity.split(word).length - 1;
                                include += num;
                                if(num > 0) wordsIncluded.push(word, " ");
                            });

                            excludeWords.forEach((word) => {
                                var num = opportunity.split(word).length - 1;
                                include -= num
                                if(num > 0) wordsExcluded.push(word, " ");
                            });

                            if(include > 0 ){
                                results.push({
                                    title: oppNodes[2].innerText,
                                    link: item.querySelector('a').href,
                                    amount: '',
                                    deadline: '',
                                    page: site,
                                });
                            }
                        });
                        return results;
                    case "SCPOR":
                        break;
                    default:
                }
            }, site);

            browser.close();
            console.log("A");
            console.log(searchReturn);
            
            if(searchReturn !== undefined){
                grants = grants.concat(searchReturn);
            }
            
            
        }
        console.log("B");
        console.log(grants);
        res.send(grants);
        
    } catch(err) { 
        console.error(err);
    }    
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

