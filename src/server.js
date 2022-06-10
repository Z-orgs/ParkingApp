import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import pool from "./configs/connectDB";
import session from "express-session";
import herokuAwake from "heroku-awake";
const app = express();
const url = "http://parkingapp.xyz";
const PORT = process.env.PORT || 3000;
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
configViewEngine(app);
initWebRoute(app);
app.use((req, res) => {
  return res.redirect("/");
});
app.listen(PORT, () => {
  herokuAwake(url);
  const time = 10;
  herokuAwake(url, time);
});
