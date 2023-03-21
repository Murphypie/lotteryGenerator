const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path')


async function scrapePowerballs(year){
    const data = [];
    const browser = await puppeteer.launch({headless: false, defaultViewport:false})
    const page = await browser.newPage();


    await page.goto(`https://www.lottery.net/powerball/numbers/${year}`, {waitUntil: "load"});

    await page.waitForSelector('.prizes.archive') // Wait till page is loaded
    
    const lotteryResults = await page.$$(`.prizes.archive > tbody > tr > td > .multi.results.powerball`)
   
    

    for(const lotteryResult of lotteryResults){
        
        const value = await lotteryResult.evaluate(el => el.textContent);
        const regValue = value.match(/\d+/g).map(el=>{
            if(el < 10){
                return "0"+el.toString()
            }else{
                return el.toString()
            }
        })
        data.push(regValue.slice(0,6))
    }
    
    await browser.close();
    return data;
}


async function makeDataObject(year){
    let result = await scrapePowerballs(year)
    let tempObj = {};
    for(let play of result){
        let playJoin = play.join("")
        if(!tempObj[playJoin]){
            tempObj[playJoin] = [...play];
        }
    }
    
    fs.readFile('data.json', (err, data)=>{
        let content = JSON.parse(data);
        let mergeObj = {...content, ...tempObj}

        fs.writeFile('data.json', JSON.stringify(mergeObj),function (err) {
            if (err) throw err;
            console.log('Saved!');})
    })
    
}

for(let i = 2020; i<2024; i++){
    makeDataObject(i)
}

