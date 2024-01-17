const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Merged_Grade = sequelize.define('rtc_merged_gradec',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    Merged_Grade:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    merged_on:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    grade:{
        type: DataTypes.STRING,
        allowNull:false
    },
    bags:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    weightA:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    merge_id:{
        type: DataTypes.STRING,
        allowNull:false
    },
    certified:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    moistureA:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    weightB:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    moistureB:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    weightC:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    moistureC:{
        type: DataTypes.DOUBLE,
        allowNull:false
    }    
});
module.exports = Merged_Grade;