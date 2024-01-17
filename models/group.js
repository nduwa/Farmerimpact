const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Tembo_Group = sequelize.define('groups',{
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
        type: DataTypes.INTEGER,
        allowNull:false
    },
    group_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    regional_areaid:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
});
module.exports = Tembo_Group;