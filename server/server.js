import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connect } from "./database/conn.js";
import router from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.status(200).json("Welocome to shapify bakend");
});

app.use('/auth',router)

app.listen(PORT, () => {
  connect()
    .then(() => {
      console.log(`Server running on port http://localhost:${PORT}/`);
    })
    .catch((err) => console.log(err));
});
