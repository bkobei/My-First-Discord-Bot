const { Schema, model } = require('mongoose');
const gamesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  gameId: String,
  gameName: String,
});


module.exports = model("Games", gamesSchema, "games");
