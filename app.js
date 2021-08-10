const express = require("express");
const path = require("path");
const pug = require("pug");
const mongoose = require("mongoose");
const session = require("express-session");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");

mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost/pizza", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we're connected!");
});


const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.json());
app.use(session({
  secret: "No secret",
  name: "SessionId",
  saveUninitialized: false
}))
app.use(express.urlencoded({ extended: true }));
app.use("/", loginRouter);
app.use("/register", registerRouter);

app.listen(3000, ()=>{
    console.log("server is listening");
})