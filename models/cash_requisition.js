const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Cash = sequelize.define('rtc_cash_requisition',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uuid:{
        type: DataTypes.STRING,
        allowNull:false
    },
    requisition_id:{
        type: DataTypes.STRING,
        allowNull:false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    amount_request:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    requested_by:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    requested_by_kf_User:{
        type: DataTypes.STRING,
        allowNull:false
    },
    _kf_Supplier:{
        type: DataTypes.STRING,
        allowNull:false
    },
    description_of_request:{
        type: DataTypes.STRING,
        allowNull:false
    },
    bank_account_number:{
        type: DataTypes.STRING,
        allowNull:false
    },
    account_holder_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    bank_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    notification_email:{
        type: DataTypes.STRING,
        allowNull:false
    },
    amount_approved:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    approved_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    approved_by:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    approved_by_kf_User:{
        type: DataTypes.STRING,
        allowNull:false
    },
    approver_email:{
        type: DataTypes.STRING,
        allowNull:false
    },
    disburded_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    payment_type:{
        type: DataTypes.STRING,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    receipt_date_limit:{
        type: DataTypes.DATE,
        allowNull:false
    },
    comment:{
        type: DataTypes.TEXT,
        allowNull:false
    } 
});
module.exports = Cash;