const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const fetch = require("node-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

//БД
const url = 'https://reqres.in/api/users';

//инициализация глобального окружения
global.document = new JSDOM(this.html).window.document;
global.window = new JSDOM(this.html).window;

var cardsData;


async function getCards() {
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
        //global.document.getElementById('cards').innerHTML = cardsData.join('');
    });
}

app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
    getCards();
});

server.listen(3000, (err) =>{
    if(err){
        throw Error(err);
    }
    console.log('Server is runnig');
});