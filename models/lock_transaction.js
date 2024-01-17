const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Lock_Transaction = sequelize.define('lock_transactions',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    lock_id:{
        type: DataTypes.STRING,
        allowNull:false
    }
    
});
module.exports = Lock_Transaction;