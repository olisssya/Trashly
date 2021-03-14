const express = require("express");
const hbs = require("hbs");
const app = express();
const createError = require("http-errors");
const path = require("path");

hbs.registerPartials("./views/partials");
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
hbs.registerPartials("./views/partials");

// ROUTERS
const indexRouter = require("./routes/index");
const scanRouter = require('./routes/scan')
const mapRouter = require('./routes/map')

app.use(indexRouter);
app.use('/detectText', scanRouter)
app.use('/map', mapRouter)


// EROOR
app.use((req, res, next) => {
  const error = createError(404, "Sorry, page does not exist :(");
  next(error);
});

app.use(function (err, req, res, next) {

  const appMode = req.app.get("env");

  let error;

  if (appMode === "development") {
    error = err;
  } else {
    error = {};
  }

  res.locals.message = err.message;
  res.locals.error = error;

  res.status(err.status || 500);
  res.render("error");
});



module.exports = app;
