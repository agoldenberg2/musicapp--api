const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Song = sequelize.define('Song', {
  title: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Song;