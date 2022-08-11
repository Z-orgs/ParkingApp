import express from "express";
import configViewEngine from "./configs/viewEngine.js";
import initWebRoute from "./route/web.js";
const app = express();
const PORT = process.env.PORT || 80;
configViewEngine(app);
initWebRoute(app);
app.use((req, res) => {
  return res.redirect("/");
});
app.listen(PORT, () => {
  console.log(`OK: ${PORT}`);
});
