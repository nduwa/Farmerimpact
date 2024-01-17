const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Crops = sequelize.define('farmer_crops',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    cropName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    deleted:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
});
module.exports = Crops;