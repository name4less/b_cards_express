const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const fetch = require("node-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function getCards() {
    return new Promise( async (resolve, reject) => {
    await fetch('https://reqres.in/api/users')
    .then(response => response.json())
    .then(json => {
        cardsData = json.data.map(el => {
            return `
                <div class="col col--hidden" >
                    <div class="card">
                        <img src="${el.avatar}" class="card-img-top"  width="200" height="200" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${el.first_name} ${el.last_name}</h5>
                            <p class="card-text">${el.email}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        JSDOM.fromFile('index.html').then( (dom) => {
            let cards = dom.window.document.getElementById('cards');
            cards.innerHTML= cardsData.join('');
            
            resolve(dom.serialize());
        });
    });
    });
    
}

app.get('/', async (req, res) => {
    const html = await getCards();
    res.send(html);
});

server.listen(3000, (err) =>{
    if(err){
        throw Error(err);
    }
    console.log('Server is runnig');
});