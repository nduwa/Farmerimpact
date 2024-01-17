const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Grading_Reports_Grns = sequelize.define('rtc_grading_reports_grns',{
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
        type: DataTypes.STRING,
        allowNull:false
    },
    grn_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
    
});
module.exports = Grading_Reports_Grns;