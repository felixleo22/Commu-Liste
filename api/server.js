/* eslint-disable no-underscore-dangle */
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');

// routers
const RouterShops = require('./routers/RouterShops');
const RouterUsers = require('./routers/RouterUsers');
const RouterProducts = require('./routers/RouterProducts');
const RouterShoppingList = require('./routers/RouterShoppingList');
const RouterPublicBasket = require('./routers/RouterPublicBasket');

// create app
const app = express();

// database
mongoose.connect('mongodb://mongodb/ConsoApp', {
    useNewUrlParser: true,
});

// middleware
app.use(cors());
app.use(bodyparser.json());

app.use(require('./middlewares/Auth'));

// Routers
app.get('/', (req, res) => {
    res.json({ name: 'Conso App' });
});

app.use(RouterShops);
app.use(RouterUsers);
app.use(RouterProducts);
app.use(RouterShoppingList);
app.use(RouterPublicBasket);

/* Errors and unknown routes */
app.all('*', (req, res) => res.status(400).json({ type: 'error', code: 400, message: 'bad request' }));
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    console.log(error);
    return res.status(500).json({ type: 'error', code: 500, message: error.message });
});

app.listen(8080, () => {
    console.log('Conso App API is running !');
});
