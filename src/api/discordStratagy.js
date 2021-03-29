const DiscordStratagy = require("passport-discord").Strategy;
const passport = require("passport");
const DiscordUser = require("../models/discordUserSchema");

const scopes = ["identify", "email", "guilds", "guilds.join"];

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await DiscordUser.findById(id);
  if (user) {
    done(null, user);
  }
});

passport.use(
  new DiscordStratagy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_REDIRECT,
      scope: [...scopes],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await DiscordUser.findOne({ discordID: profile.id });
        if (user) {
          done(null, user);
        } else {
          const newUser = await new DiscordUser({
            ...profile,
            discordID: profile.id,
          });
          newUser.save();
          done(null, newUser);
        }
      } catch (err) {
        console.err(err);
        done(err, null);
      }
    }
  )
);
