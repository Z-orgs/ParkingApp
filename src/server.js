import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import pool from "./configs/connectDB";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT || 3000;
configViewEngine(app);
initWebRoute(app);

app.listen(PORT, () => {
  console.log(`${PORT}`);
});
