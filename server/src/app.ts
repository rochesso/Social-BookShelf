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

// .env
dotenv.config();

// Cors Configurations
const corsOptions = {
  methods: ["GET", "DELETE", "POST", "PATCH"],
  origin: [
    "http://localhost:3000",
    "http://192.168.0.99:3000",
    "http://rochesso.ddnsfree.com",
    "http://127.0.0.1:3000",
  ],
  // Needs to be true as Client and Server are in different domains
  credentials: true,
};

const app = express();

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
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("combined"));
app.use(express.json());

// React app build
// app.use(express.static(path.join(__dirname, '../public')));

// Routes for api
// api version 1.0
app.use("/api/v1", api);

// React app
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public', 'index.html'));
// });

export default app;
