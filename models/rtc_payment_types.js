const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Payment_type = sequelize.define('rtc_payment_types',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    payment_types:{
        type: DataTypes.STRING,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
    
});
module.exports = Payment_type;