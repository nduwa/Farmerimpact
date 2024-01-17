const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Contracts = sequelize.define('rtc_contracts',{
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
    buyer:{
        type: DataTypes.STRING,
        allowNull:false
    },
    number:{
        type: DataTypes.STRING,
        allowNull:false
    },
    invoice_number:{
        type: DataTypes.STRING,
        allowNull:false
    },
    weight:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    sales_price:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    status:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    open:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    contract_date:{
        type: DataTypes.DATE,
        allowNull:false
    }
});
module.exports = Contracts;