const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const farmers_lock = sequelize.define('rtc_farmers_lock',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    lock:{
        type: DataTypes.STRING,
        allowNull:false
    }
    
});
module.exports = farmers_lock;