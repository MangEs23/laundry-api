'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Service.hasMany(models.Transaction, {
        foreignKey: 'service_id',
        onUpdate: 'RESTRICT'
      })
    }
  }
  Service.init({
    paket: DataTypes.STRING,
    harga: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};