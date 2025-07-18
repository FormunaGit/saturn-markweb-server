import express, { Request, Response } from "express";
import { processMarkdownWithMarkscript } from "./markscript";
import path from "node:path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hi! This is the Saturn MarkWeb API!");
});

app.get("/page", (req: Request, res: Response) => {
  res.send("Uhh, did you possibly forget to include a page URL?");
});

app.get("/page/:id", (req: Request, res: Response) => {
  const basePagePath = path.join(__dirname, "pages", req.params.id);
  const processedContent = processMarkdownWithMarkscript(
    basePagePath,
    "index.md",
  );
  if (processedContent === null) {
    res.status(500).send("Error processing page.");
  } else {
    res.send(processedContent);
  }
});

app.get("/page/:id/:subpage", (req: Request, res: Response) => {
  // Multi-page support
  const basePagePath = path.join(__dirname, "pages", req.params.id);
  const subpageParam = req.params.subpage;
  const markdownFilename = subpageParam.endsWith(".md")
    ? subpageParam
    : `${subpageParam}.md`;
  const processedContent = processMarkdownWithMarkscript(
    basePagePath,
    markdownFilename,
  );
  if (processedContent === null) {
    res.status(500).send("Error processing subpage.");
  } else {
    res.send(processedContent);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
