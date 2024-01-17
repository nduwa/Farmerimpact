const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Grn = sequelize.define('rtc_grn',{
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
        type: DataTypes.STRING,
        allowNull:false
    },
    weigh_note_number:{
        type: DataTypes.STRING,
        allowNull:false
    },
    delivery_report_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    amount_paid:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    moisture:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    defects:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    number_of_bags:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    stack_number:{
        type: DataTypes.STRING,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    grn_number:{
        type: DataTypes.STRING,
        allowNull:false
    },
    exchange_rate:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    defects_s:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    outturn:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    cupping:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    grossweight:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    netweight:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    coffeevalue:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    transport:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    vehicle_plate_number:{
        type: DataTypes.STRING,
        allowNull:false
    }
    
});
module.exports = Grn;