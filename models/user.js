'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {msg: "Email is required"},
        notNull: {msg: "Email is required"},
        isEmail: {msg: "Input must be an email format"},
        async isUnique(val) {
          const check = await User.findOne({
            where: {email: val}
          })
          if(check) throw new Error("Email already exist");
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {msg: "Password is required"},
        notNull: {msg: "Password is required"},
      }
    },
    role: DataTypes.STRING,
    username: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((inst) => {
    inst.is_active = true;
  })
  return User;
};