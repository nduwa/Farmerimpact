const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Lots_details = sequelize.define('day_lot_details',{
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
    day_lot_number_id :{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    transactionid:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
});
module.exports = Lots_details;