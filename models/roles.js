const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Roles = sequelize.define('roles',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    __kp_Role:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Group:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Location:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Staff:{
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
    _kf_User:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Role:{
        type: DataTypes.STRING,
        allowNull:false
    },
    z_recCreateTimestamp:{
        type: DataTypes.DATE,
        allowNull:false
    },
    z_recModifyTimestamp:{
        type: DataTypes.DATE,
        allowNull:false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    status:{
        type: DataTypes.DATE,
        allowNull:false
    }
    
});
module.exports = Roles;