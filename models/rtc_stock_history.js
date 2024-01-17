const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Stock_History = sequelize.define('rtc_stock_history',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    created_by:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    grading_reportid:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    contractid:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    productid:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    quantity:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    balance:{
        type: DataTypes.DOUBLE,
        allowNull:false
    }
    
});
module.exports = Stock_History;