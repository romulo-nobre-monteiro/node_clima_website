const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geoCode = require("./utils/geoCode");
const darkSky = require("./utils/darkSky");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "romulo"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "romulo"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    text: "I need somebody",
    name: "romulo"
  });
});

app.get("/weather", (req, res) => {
  const endereco = req.query.endereco;

  if (!endereco) {
    return res.send({
      error: "tem q pesquisar um endereço, meu cansagrs"
    });
  }
  geoCode(endereco, (error, { latitude, longitude, local } = {}) => {
    if (error) {
      return res.send({ error });
    }
    darkSky(latitude, longitude, (error, Skydata) => {
      if (error) {
        return res.send({ error });
      }
      res.send({ local, Skydata });
    });
  });
});

app.get("/*", (req, res) => {
  res.render("404", {
    title: "404",
    text: "Page not found"
  });
});

app.listen(3000, () => {
  console.log("rodando na porta 3000");
});
