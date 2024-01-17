const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Seasons = sequelize.define('rtc_seasons',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    __kp_Season:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Location:{
        type: DataTypes.STRING,
        allowNull:false
    },
    End_d:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Label:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Start_d:{
        type: DataTypes.STRING,
        allowNull:false
    },
    z_recCreateAccountName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    z_recCreateTimestamp:{
        type: DataTypes.DATE,
        allowNull:false
    },
    z_recModifyAccountName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Default:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    z_Year:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    Label_Short:{
        type: DataTypes.STRING,
        allowNull:false
    },
    z_recModifyTimestamp:{
        type: DataTypes.DATE,
        allowNull:false
    },
    Location:{
        type: DataTypes.STRING,
        allowNull:false
    }
    
});
module.exports = Seasons;