import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// import UserSchema from "./models/user.js";
import "./models/user.js";
import setUpRoutes from "./routes.js";

// initialize the server
const app = express();

// connect to Mongo DB
// await mongoose.connect("mongodb://127.0.0.1:27017/AUTH");
const DATABASE_URI = "mongodb+srv://jpsabile:VUNVL7QcJ2tYPbZr@jpsabile.nvysktb.mongodb.net/clearME?retryWrites=true&w=majority";
await mongoose
  .connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conntect to MongoDB"))
  .catch((err) => console.log(err));

// register User model with Mongoose
// mongoose.model("User", UserSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// allow CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Access-Control-Allow-Methods,Origin,Accept,Content-Type,X-Requested-With,Cookie");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// setup routes
setUpRoutes(app);

// start server
app.listen(3001, () => {
  console.log("API listening to port 3001 ");
});
