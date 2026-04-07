const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Artist = sequelize.define('Artist', {
  name: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Artist;