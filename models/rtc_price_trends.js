const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Price_Trends = sequelize.define('rtc_price_trends',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    _kf_Season:{
        type: DataTypes.STRING,
        allowNull:false
    },
    __kp_Approval:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Location:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Supplier:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Price_n:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    z_recCreateTimestamp:{
        type: DataTypes.DATE,
        allowNull:false
    },
    Price_last_n:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    _kf_Station:{
        type: DataTypes.STRING,
        allowNull:false
    },
    z_recModifyTimestamp:{
        type: DataTypes.DATE,
        allowNull:false
    }
    
});
module.exports = Price_Trends;