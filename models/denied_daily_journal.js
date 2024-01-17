const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Denied = sequelize.define('denied_sc_daily_journals',{
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
    sc_daily_journal:{
        type: DataTypes.STRING,
        allowNull:false
    },
    remark:{
        type: DataTypes.STRING,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
});
module.exports = Denied;