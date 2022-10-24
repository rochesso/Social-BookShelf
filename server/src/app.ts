import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

//import routes api
import api from "./routes/api";

// Configurations
const corsOptions = {
  methods: ["GET", "DELETE", "POST", "PATCH"],
  origin: [
    "http://localhost:3000",
    "http://192.168.0.99:3000",
    "http://rochesso.ddnsfree.com",
  ],
};

const app = express();

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(express.json());

// React app build
// app.use(express.static(path.join(__dirname, '../public')));

// Routes
// api version 1.0
app.use("/v1", api);

// React app
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public', 'index.html'));
// });

export default app;
