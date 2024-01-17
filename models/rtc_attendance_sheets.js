const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Attandance_sheets = sequelize.define('rtc_attendance_sheets',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    uuid:{
        type: DataTypes.STRING,
        allowNull:false
    },
    uuid:{
        type: DataTypes.STRING,
        allowNull:false
    },
    filepath:{
        type: DataTypes.STRING,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    uploaded_at:{
        type: DataTypes.DATE,
        allowNull:false
    }
    
});
module.exports = Attandance_sheets;