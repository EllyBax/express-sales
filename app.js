import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const port = process.env.port || 3000;

dotenv.config();
const app = express();
// app.use(cors);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});