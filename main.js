const fs = require('fs')
const playData = require('./data.json')


function getRandos(){
    let play = []
    for(let i = 0; i<5; i++){
        let random = Math.floor(Math.random() * 69)+1;
        while(duplicate(play, random)){
            random = Math.floor(Math.random() * 69)+1
        }
        play.push(random)
    }
    play = play.sort((a,b)=>a-b)
    let randomPP = Math.floor(Math.random()*26)+1;
    
    return [play, randomPP]
}

function duplicate(arr, num){
    return arr.includes(num) ? true : false
}


function getNumber(){
    let genPlay = getRandos()
    let strNums = [];
    for(let i = 0; i<genPlay[0].length; i++){
        if(genPlay[0][i]<10){
            strNums.push("0"+genPlay[0][i].toString())
        }else{
            strNums.push(genPlay[0][i].toString())
        }
    }
 
    let joinedNums = strNums.join("");
    if(playData[joinedNums]){
        strNums = getNumber()
    }else{
        strNums.push(genPlay[1].toString())
    }
    
    return strNums
}


for(let i = 0; i<10; i++){
    let play = getNumber()
}


