import express, { Request, Response } from "express";
import fs from "node:fs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Node.js + TypeScript API!");
});

app.get("/page", (req: Request, res: Response) => {
  res.send("Uhh, did you possibly forget to include a page URL?");
});

app.get("/page/:id", (req: Request, res: Response) => {
  fs.readFile(`./src/pages/${req.params.id}/index.md`, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading file");
      return;
    }
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
