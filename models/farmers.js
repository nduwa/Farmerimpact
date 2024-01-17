const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Farmers = sequelize.define('rtc_farmers',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    __kp_Farmer:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _kf_Group:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _kf_Household:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _kf_Location:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _kf_Supplier:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _kf_Station:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Year_Birth:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Gender:{
        type: DataTypes.STRING,
        allowNull: false
    },
    farmerid:{
        type: DataTypes.STRING,
        allowNull: false  
    },
    Name:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    National_ID_t:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Position:{
        type: DataTypes.STRING,
        allowNull: false
    },
    CAFE_ID:{
        type: DataTypes.STRING,
        allowNull: false
    },
    SAN_ID:{
        type: DataTypes.STRING,
        allowNull: false
    },
    UTZ_ID:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Marital_Status:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Reading_Skills:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Math_Skills:{
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    },
    created_by:{
        type: DataTypes.STRING,
        allowNull: false
    },
    registered_at:{
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull: false
    },
    type:{
        type: DataTypes.ENUM('new','update','offline'),
        allowNull: false
    },
    sync_farmers:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    uploaded:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    uploaded_at:{
        type: DataTypes.DATE
    },
    Area_Small:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Area_Smallest:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Trees:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    Trees_Producing:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    number_of_plots_with_coffee:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    STP_Weight:{
        type: DataTypes.STRING,
        allowNull: false
    },
    education_level:{
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    longitude:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    householdid:{
        type: DataTypes.STRING,
        allowNull: false
    },
    seasonal_goal:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    recordid:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    indexes:[
        {
            name: 'farmerid',
            unique: false,
            fields:['farmerid']
        },
        {
            name: '_kf_Group',
            unique: false,
            fields:['_kf_Group']
        },
        {
            name: '_kf_Household',
            unique: false,
            fields:['_kf_Household']
        },
        {
            name: '__kp_Farmer',
            unique: false,
            fields:['__kp_Farmer']
        },
        {
            name: 'sync_farmers',
            unique: false,
            fields:['sync_farmers']
        },
        {
            name: 'registered_at',
            unique: false,
            fields:['registered_at','type']
        },
        {
            name: '_kf_Station',
            unique: false,
            fields:['_kf_Station']
        },
        {
            name: 'Name',
            unique: false,
            fields:['Name']
        },
        {
            name: 'recordid',
            unique: false,
            fields:['recordid']
        },
        {
            name: '_kf_Household_2',
            unique: false,
            fields:['_kf_Household','_kf_Group']
        }
    ]
});

module.exports = Farmers
sequelize.sync();
