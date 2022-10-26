import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { addUser, searchUserById } from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();

// Google Oauth keys used by passport for authentication
const keys = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

// Passport Middleware for authentication
if (keys.clientID && keys.clientSecret) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.clientID,
        clientSecret: keys.clientSecret,
        callbackURL: "/api/v1/auth/google/callback",
      },
      // Callback function for passport
      async (accessToken, refreshToken, googleProfile, done) => {
        const user = await addUser(googleProfile);
        if (user) {
          done(null, user);
        }
      }
    )
  );
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId: string, done) => {
  const result = await searchUserById(userId);
  if (result) {
    const user: User = result;
    done(null, user);
  }
});
