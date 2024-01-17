const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Lock_RTC_Transaction = sequelize.define('lock_rtc_transaction',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    rtc_transactionid:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    received_at:{
        type: DataTypes.DATE,
        allowNull:false
    }
    
});
module.exports = Lock_RTC_Transaction;