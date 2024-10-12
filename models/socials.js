const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const Socials = mongoose.model("Socials", socialSchema);
module.exports = Socials;
