const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Lock_Training = sequelize.define('lock_rtc_training_attendance',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    rtc_training_attendanceid:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
    
});
module.exports = Lock_Training;