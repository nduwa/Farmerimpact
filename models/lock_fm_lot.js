const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Lock_fm_lot = sequelize.define('lock_fm_cherry_lot_its',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cherry_lot_id:{
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Lock_fm_lot;