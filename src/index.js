const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

//initialization
const app = express();
require("./database");
require("./config/passport"),

//setting
app.set("port", process.env.port || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs",engine({
    defaultLayout: "main",
    runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
    },
    layotsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
})
);
app.set("view engine", ".hbs");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session({
    secret: "mysecretapp213",
    resave: false,
    saveUninitialized: false,
})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;//usuario como variable global
  next();
});

//routes
app.use(require("./routes/index"));
app.use(require("./routes/notes"));
app.use(require("./routes/users"));

//static
app.use(express.static(path.join(__dirname, "public")));

//server
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
