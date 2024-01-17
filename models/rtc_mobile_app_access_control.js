const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Mobile_App = sequelize.define('rtc_mobile_app_access_control',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    moduleid:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    userid:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    view_record:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    add_record:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    delete_record:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    edit_record:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    platform:{
        type: DataTypes.STRING,
        allowNull:false
    }
    
});
module.exports = Mobile_App;