const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Lock_email = sequelize.define('lock_sent_emails',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    }
    
});
module.exports = Lock_email;