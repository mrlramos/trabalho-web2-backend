var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

var products = [
    new Product({
        imagePath: 'https://steamcdn-a.akamaihd.net/steam/apps/730/header.jpg?t=1566587391',
        title: 'Counter Strike:Global Offensive',
        description: 'Melhor jogo de FPS do mundo!',
        price: 10
    }),
    new Product({
        imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQo1LyIgUU1LvWYhARV6thimihobGqZHBs3hr-I9mnnFkeeFtOe',
        title: 'League of Legends',
        description: 'League of Legends é um jogo eletrônico do gênero multiplayer online battle arena, desenvolvido e publicado pela Riot Games para Microsoft Windows e Mac OS X. É um jogo gratuito para jogar e inspirado no modo Defense of the Ancients de Warcraft III: The Frozen Throne.',
        price: 5
    }),
    new Product({
        imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS7SYkMPjX-Ex1pCIr9SuR6Jhdra1T3hv5J1l9B9dSGUmZx-zEk',
        title: 'Tibia',
        description: 'O mais clássico dos MMOs',
        price: 10
    }),
    new Product({
        imagePath: 'http://levelup.com.br/muonline/themes/standard/img/share/facebookshare.jpg',
        title: 'MU Online',
        description: 'Mu Online é um jogo eletrônico de MMORPG em 3D, ambientado numa atmosfera medieval.',
        price: 15
    }),
    new Product({
        imagePath: 'http://www.cojanowow.com.br/wp-content/uploads/2018/07/como-migrar-de-um-mmo-para-o-wow-alianca-bfa.jpg',
        title: 'World of Warcraft',
        description: 'World of Warcraft é um jogo on-line do gênero MMORPG, desenvolvido e distribuído pela produtora Blizzard Entertainment.',
        price: 50
    })    
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
        
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}