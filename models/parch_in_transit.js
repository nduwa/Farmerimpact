const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Parch_Transit = sequelize.define('parch_in_transit',{
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
    parch_id:{
        type: DataTypes.STRING,
        allowNull:false
    }
    
});
module.exports = Parch_Transit;