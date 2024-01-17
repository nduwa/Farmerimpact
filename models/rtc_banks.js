const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Banks = sequelize.define('rtc_banks',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bank_names:{
        type: DataTypes.STRING,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
    
});
module.exports = Banks;