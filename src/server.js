import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import pool from "./configs/connectDB";
import session from "express-session";
const app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT || 3000;
configViewEngine(app);
initWebRoute(app);

app.listen(PORT);
