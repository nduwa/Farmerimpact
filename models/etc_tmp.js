const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Etc_tmp = sequelize.define('etc_tmp_recordids',{
    cherry_lot_id:{
        type: DataTypes.STRING,
        allowNull: false
    },
    log_record_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Etc_tmp;