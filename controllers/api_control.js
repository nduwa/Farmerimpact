const Sequelize = require('sequelize');
const { Op } = Sequelize;
const Farmers = require('../models/farmers');
const Household = require('../models/households');
const Group = require('../models/groups');
const Training = require('../models/rtc_training');
const Station = require('../models/rtc_station');
const Supplier = require('../models/rtc_supplier');

//============= get user api data ============
exports.getUsers = (req, res, next) =>{
    Farmers.findAll({
        where:{ farmerid: 'F8827A'}
    })
    .then(data =>{
        res.json({ famers: data });
    })
    .catch(err=>{
        console.log(err);
    })
}
//============= get user api data ============
exports.getTransaction = (req, res, next) =>{
    console.log('well');
}
//============= group API ==============
exports.getGroup = (req, res, next) =>{
    Group.findAll()
    .then(data =>{
        res.json({ Groups: data });
    })
    .catch(err=>{
        console.log(err);
    })
}
//============= group API ==============
exports.getTraining = (req, res, next) =>{
    Training.findAll()
    .then(data =>{
        res.json({ Training: data });
    })
    .catch(err=>{
        console.log(err);
    })
}
//============= group API ==============
exports.getStation = (req, res, next) =>{
    Station.findAll()
    .then(data =>{
        res.json({ Station: data });
    })
    .catch(err=>{
        console.log(err);
    })
}
//============= group API ==============
exports.getSuplier = (req, res, next) =>{
    Supplier.findAll()
    .then(data =>{
        res.json({ Supplier: data });
    })
    .catch(err=>{
        console.log(err);
    })
}
