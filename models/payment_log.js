const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Payment = sequelize.define('payment_logs',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    rtc_transactionid:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    created_by:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    amount:{
        type: DataTypes.DOUBLE,
        allowNull:false
    }
    
});
module.exports = Payment;