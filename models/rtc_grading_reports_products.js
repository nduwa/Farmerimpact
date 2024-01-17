const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Grading_Reports_Products = sequelize.define('rtc_grading_reports_products',{
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
    productid:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    grading_reportid:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    quantity:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
    
});
module.exports = Grading_Reports_Products;