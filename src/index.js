import express from "express";
import configViewEngine from "./configs/viewEngine.js";
import initWebRoute from "./route/web.js";
import herokuAwake from "heroku-awake";
const app = express();
const url = "http://parkingapp.xyz";
const PORT = process.env.PORT || 80;
configViewEngine(app);
initWebRoute(app);
app.use((req, res) => {
  return res.redirect("/");
});
app.listen(PORT, () => {
  herokuAwake(url);
  const time = 10;
  herokuAwake(url, time);
  console.log(`OK: ${PORT}`);
});
