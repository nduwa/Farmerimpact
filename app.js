const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const csurf = require('csurf');
const flash = require('connect-flash');
const sequelize = require('./utils/database');

const app = express();
//initiate cross site request forgery
const csrfProtection = csurf();
// set Template engine
app.set('view engine', 'ejs');
app.set('views', 'views');
// set up routes
const router = require('./router/routes');
const error = require('./controllers/error');
// url
app.use(bodyParser.urlencoded({ extended: false }));
// static file location
app.use(express.static(path.join(__dirname, 'public')));
// session set up
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false
    })
);
// use of cross site request forgery
app.use(csrfProtection);
// feedback set up
app.use(flash());
// implement csrf
app.use((req, res, next) =>{
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});
// use the routes
//app.use(error.getSeason);
app.use(router);
app.use(error.get404Page);
//set out sequilize and port set up
sequelize.sync()
.then(result => {
    app.listen(5000);
    //console.log(result);
})
.catch(err => {
    console.log(err);
});