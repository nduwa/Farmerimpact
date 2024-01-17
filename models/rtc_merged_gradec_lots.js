const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Merged_Gradec_Lots = sequelize.define('rtc_merged_gradec_lots',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    daylot:{
        type: DataTypes.STRING,
        allowNull:false
    },
    rtc_merged_gradecid:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
    
});
module.exports = Merged_Gradec_Lots;