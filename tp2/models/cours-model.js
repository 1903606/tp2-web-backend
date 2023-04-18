const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursSchema = new Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  professeur: { type: String, required: true },
  etudiants: { type: String, required: true },
});

module.exports = mongoose.model("Cours", coursSchema);
