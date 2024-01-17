const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Inspection_Response = sequelize.define('inspection_responses',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    rtc_inspections_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    inspection_answer_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    deleted:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    __kp_InspectionLog:{
        type: DataTypes.STRING,
        allowNull:false
    }
});
module.exports = Inspection_Response;