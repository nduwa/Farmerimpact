const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Station_Price = sequelize.define('__kp_StationPrice',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    _kf_Station:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Date:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    Default:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    Price:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    Staff:{
        type: DataTypes.STRING,
        allowNull:false
    },
    __kp_StationPrice :{
        type: DataTypes.STRING,
        allowNull:false
    }
    
});
module.exports = Station_Price;