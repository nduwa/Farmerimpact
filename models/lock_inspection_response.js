const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Lock_inspection_response = sequelize.define('lock_inspection_responses',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    inspection_responses_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    }
});
module.exports = Lock_inspection_response;