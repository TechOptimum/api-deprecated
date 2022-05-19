import express from "express";
import { loginRouter } from "./routes/login";
import { registerRouter } from "./routes/register";
import { config } from "dotenv";
import cors from "cors";

config();

const app = express(); //initialize express
const port = process.env.PORT || 5000; //set port

app.use(express.json()); // parse application/json

app.use(
  cors({
    origin: "*",
      //put ur url here
  })
); // setup cors

app.use("/api", loginRouter); //use login router

app.use("/api", registerRouter); //use register router

app.get("/", async (req, res) => {
  res.send("The API is up and online :)");
});

app.listen(80, () => {
  console.log(`Server running on port ${port}`);
});
