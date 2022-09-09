const path = require('path');
const routes = require('./controllers/');
const express = require('express');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const session = require('express-session');
// dependecies required and sequelize connection

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3007;

const hbs = exphbs.create({helpers});

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    rolling: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }),
};

app.use(session(sess));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// this will give the path to the routes 
app.use(routes);
//connects to the local server
 sequelize.sync({force: false  }).then (() => {
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
   
});
