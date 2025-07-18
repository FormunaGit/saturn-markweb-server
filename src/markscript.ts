// The Markscript server renderer.
// This module provides a server-side renderer for Markscript, a scripting language for Markweb.
// Every Markscript file MUST contain a `return` statement.
import fs from "node:fs";
import path from "node:path";

function parser(markscript: string): string {
  // Implement parser logic here
  let variables: any = {}; // Any variables used in the Markscript will be here.
  let code = markscript.split("\n");
  for (let line of code) {
    if (line.startsWith("//")) continue; // Single-line comment.
    if (line.startsWith("let")) {
      let variableName = line.split(" ")[1];
      let variableValue = line.split("=")[1].trim();
      variables[variableName] = variableValue;
    }
    if (line.startsWith("return")) {
      // Return statement. Required.
      let ret = line.replace("return ", "");
      if (ret.trim().length === 0) {
        return "[!Error: Empty return statement]";
      } else if (ret.includes("$")) {
        let variableName = ret.split("$")[1].trim();
        if (variables[variableName]) {
          return variables[variableName];
        } else {
          return `[!Error: Undefined variable ${variableName}]`;
        }
      } else {
        return ret;
      }
    }
  }
  return "[!Error: Missing return statement]";
}

export function markscripter(fileContent: string): string {
  return parser(fileContent);
}

export function processMarkdownWithMarkscript(
  basePagePath: string,
  markdownFilename: string,
): string | null {
  const markdownFilePath = path.join(basePagePath, markdownFilename);

  try {
    let markdownContent = fs.readFileSync(markdownFilePath, "utf-8");

    const markscriptPlaceholderRegex = /{{\s*([^}]+?)\s*}}/g;

    let processedContent = markdownContent.replace(
      markscriptPlaceholderRegex,
      (match, scriptName) => {
        const mkscFilePath = path.join(
          basePagePath,
          "scripts",
          `${scriptName}.mksc`,
        );
        try {
          const mkscContent = fs.readFileSync(mkscFilePath, "utf-8");
          return markscripter(mkscContent);
        } catch (mkscErr: any) {
          console.error(
            `Error reading Markscript file ${mkscFilePath}:`,
            mkscErr.message,
          );
          return `ERROR: Could not load Markscript '${scriptName}'`;
        }
      },
    );

    return processedContent;
  } catch (err: any) {
    console.error(
      `Error processing Markdown file ${markdownFilePath}:`,
      err.message,
    );
    return null;
  }
}
