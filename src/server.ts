// RemindMongodb 9rOU7P6nxBdrD6bD

import express, { Request, Response } from "express";
import connectToDatabase from "./db";
import userRoutes from "./Routes/user.route";

const app = express();
const PORT = 1337;

app.use(express.json());
connectToDatabase();

app.get("/run", (request: Request, response: Response) => {
  response.send("Running");
});

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log("App up and running on port ", PORT);
});
