const Sequelize = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");
class User extends Sequelize.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
  validatePassword(password) {
    return this.hash(password, this.salt).then((newHash) => {
      return newHash === this.password;
    });
  }
}
User.init(
  {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },

    salt: {
      type: Sequelize.DataTypes.STRING,
    },

    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize: db,
    modelName: "users",
  }
);

User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync();
  user.salt = salt;
  return user.hash(user.password, salt).then((hash) => {
    user.password = hash;
  });
});
module.exports = User;
