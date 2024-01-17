const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const RTC_Cells = sequelize.define('rtc_cells',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    cell_name:{
        type: DataTypes.STRING,
        allowNull:false
    }
});
module.exports = RTC_Cells;