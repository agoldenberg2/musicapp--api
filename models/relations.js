const User = require('./user');
const Artist = require('./artist');
const Album = require('./album');
const Song = require('./song');
const Playlist = require('./playlist');

// Artist → Album
Artist.hasMany(Album);
Album.belongsTo(Artist);

// Album → Song
Album.hasMany(Song);
Song.belongsTo(Album);

// Artist → Song
Artist.hasMany(Song);
Song.belongsTo(Artist);

// User → Playlist
User.hasMany(Playlist);
Playlist.belongsTo(User);

// Playlist ↔ Song
Playlist.belongsToMany(Song, { through: 'PlaylistSongs' });
Song.belongsToMany(Playlist, { through: 'PlaylistSongs' });

module.exports = { User, Artist, Album, Song, Playlist };