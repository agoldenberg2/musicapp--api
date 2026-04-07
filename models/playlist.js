const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Playlist = sequelize.define('Playlist', {
  name: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Playlist;