import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import connection from "./configs/connectDB";
const app = express();
const PORT = process.env.PORT || 3000;
configViewEngine(app);
initWebRoute(app);

app.listen(PORT, () => {
  console.log(`${PORT}`);
});
