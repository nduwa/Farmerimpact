const Sequelize = require('sequelize');
const { Op } = Sequelize;
const Season = require('../models/rtc_seasons');
exports.get404Page = (req,res,next) =>{
    let message = req.flash('error');
    if(message.length > 0) { message = message[0]; }
    else { message = null; }
    //req.flash('error', 'Page Not Found!');
    //res.redirect('/login')
    res.status(404).render('404', { PageTitle: 'Page Not Found' });
};
exports.getSeason = (req, res, next) =>{
    Season.findOne({odrer:[['id', 'DESC']]})
    .then(season =>{
        req.session.season = season
    })
    .catch(err =>{console.log(err);})
}