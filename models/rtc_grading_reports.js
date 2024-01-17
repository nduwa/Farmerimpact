const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Grading_reports = sequelize.define('rtc_grading_reports',{
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
    grading_report_number:{
        type: DataTypes.STRING,
        allowNull:false
    },
    coffee_type:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    grading_report_date:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    input_kgs:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    output_kgs:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    outturn:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    uuid:{
        type: DataTypes.STRING,
        allowNull:false
    },
    exchange_rate:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    actual_net_weight:{
        type: DataTypes.DOUBLE,
        allowNull:false
    }   
});
module.exports = Grading_reports;