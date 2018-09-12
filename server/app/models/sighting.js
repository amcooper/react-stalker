const bookshelf = require("../../config/bookshelf");

const Sighting = bookshelf.Model.extend({
  hasTimestamps: true,
  tableName: "sightings"
});

module.exports = Sighting;
