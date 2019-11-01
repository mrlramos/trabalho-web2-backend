var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function (req, res, next) {
    var successMsg = req.flash('success')[0];
    Product.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {title: 'Loja do Marlin', products: productChunks, successMsg: successMsg, noMessages: !successMsg});
    });
});

router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
       if (err) {
           return res.redirect('/');
       }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
    });
});

router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
})

router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
})

router.get('/shopping-cart', function(req, res, next) {
   if (!req.session.cart) {
       return res.render('shop/shopping-cart', {products: null});
   } 
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/seachproducts', async function (req, res, next) { 
    var titleProc = req.query.produto;
    var dado = await Product.find({
        title: { $regex: new RegExp(titleProc), $options: 'i' }
    });

    res.status(200).render('shop/seachproducts', { conteudo : dado });   
});

router.get('/register-product', isLoggedIn, function (req, res, next) { 
    res.status(200).render('user/register-product')    
});

router.post('/registered-product', isLoggedIn, function (req, res, next) { 
    var title = req.body.title;
    var description = req.body.description;
    var imageProduct = req.body.imagePath;
    var price = req.body.price; 

    var erros = [];
    if (!title || typeof title == undefined || title == null) {
        erros.push({text : "Nome inválido"});
    }

    if (!description || typeof description == undefined || description == null) {
        erros.push({text : "Descrição inválida"});
    }

    if (!imageProduct || typeof imageProduct == undefined || imageProduct == null) {
        erros.push({text : "Imagem inválida"});
    }

    if (!price || typeof price == undefined || price == null) {
        erros.push({text : "Preço inválido"});
    }

    if (erros.length > 0) {
        res.status(200).render('user/register-product', {erros: erros})
    } else {
        var produto = req.body;
        var transaction = new Product(produto);
        transaction.save();
            
        return res.redirect('/');
        }
    });

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}
