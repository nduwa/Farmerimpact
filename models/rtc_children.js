const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Children = sequelize.define('rtc_children',{
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
    _kf_household:{
        type: DataTypes.STRING,
        allowNull:false
    },
    children:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    uploaded:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    uploaded_at:{
        type: DataTypes.DATE,
        allowNull:false
    }
});
module.exports = Children;