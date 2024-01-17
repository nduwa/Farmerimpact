const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const FM_Error = sequelize.define('fm_error',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    activity:{
        type: DataTypes.STRING,
        allowNull:false
    },
    message:{
        type: DataTypes.TEXT,
        allowNull:false
    }
});
module.exports = FM_Error;