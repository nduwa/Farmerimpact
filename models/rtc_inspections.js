const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Inspection = sequelize.define('rtc_inspections',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    Score_n:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Course:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Household:{
        type: DataTypes.STRING,
        allowNull:false
    },
    __kp_Inspection:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Station:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Supplier:{
        type: DataTypes.STRING,
        allowNull:false
    },
    created_by:{
        type: DataTypes.STRING,
        allowNull:false
    },
    inspection_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    uploaded:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    uploaded_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    longitude:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    latitude:{
        type: DataTypes.DOUBLE,
        allowNull:false
    } 
});
module.exports = Inspection;