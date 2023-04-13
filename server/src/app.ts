import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieSession from "cookie-session";
import passport from "passport";
import dotenv from "dotenv";

// Passport authentication configurations
require("./services/passport");

//import routes api
import api from "./routes/api";

//import express app
const app = express();

// .env
dotenv.config();

// To make sure the environmental variables are loaded.
if (
  process.env.CLIENT_URL &&
  process.env.COOKIE_KEY_ONE &&
  process.env.MONGO_URL
) {
  // Cors Configurations
  const corsOptions = {
    methods: ["GET", "DELETE", "POST", "PATCH"],
    origin: [process.env.CLIENT_URL],
    // Needs to be true as Client and Server are in different domains
    credentials: true,
  };

  // Cookie keys
  const cookieKeys = {
    keyOne: process.env.COOKIE_KEY_ONE,
    keyTwo: process.env.COOKIE_KEY_TWO,
  };

  // Middleware
  app.use(helmet());
  app.use(cors(corsOptions));

  // Cookies config
  if (cookieKeys.keyOne && cookieKeys.keyTwo) {
    app.use(
      cookieSession({
        maxAge: 2 * 24 * 60 * 60 * 1000,
        keys: [cookieKeys.keyOne, cookieKeys.keyTwo],
      })
    );
  }

  // Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Others Middleware
  app.use(morgan("combined"));
  app.use(express.json());

  // Api route
  app.use("/api/v1", api);
}

export default app;
