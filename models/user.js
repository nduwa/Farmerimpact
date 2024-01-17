const { DataTypes } = require('sequelize');
const queryInterface = require('../utils/database');
return queryInterface.createTable('user', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
}).then(() => queryInterface.addIndex('user', ['OwnerId']))