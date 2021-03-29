const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    discordID: { type: String, require: true },
  },
  { strict: false }
);

const DiscordUser = mongoose.model("User", UserSchema);

module.exports = DiscordUser;
