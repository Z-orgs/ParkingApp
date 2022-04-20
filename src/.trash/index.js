import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.engine(
  "html",
  engine({
    extname: ".html",
  })
);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "resource/views"));
app.get("/", (req, res) => {
  res.render("switch");
});
app.get("/home", (req, res) => {
  res.render("home");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
