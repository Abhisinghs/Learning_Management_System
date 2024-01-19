//import express
import express from "express";
import { config } from "dotenv";
import course from "./routes/Course.route.js";
import user from "./routes/User.route.js";
import payment from "./routes/Payment.route.js";
import other from "./routes/Other.route.js";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//set path of config file
config({
  path: "./config/config.env",
});

//make instance of express
const app = express();

// using middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
// importing & using routes
app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", other);

//export module so other can use
export default app;

app.get("/", (req, res) => {
  res.send(
    `<h1>site is working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend</h1>`
  );
});
app.use(ErrorMiddleware);
