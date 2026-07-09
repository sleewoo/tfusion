import { rm } from "node:fs/promises";
import { resolve } from "node:path";

import flattener from "tfusion";
import { glob } from "tinyglobby";
import { Project } from "ts-morph";

import { renderToFile } from "./render";
import template from "./templates/tsafe.hbs";

const srcDir = resolve(import.meta.dirname, "fixtures");
const outDir = resolve(import.meta.dirname, "snapshots");

const project = new Project({
  tsConfigFilePath: resolve(import.meta.dirname, "tsconfig.json"),
  skipAddingFilesFromTsConfig: true,
});

await rm(outDir, { recursive: true });

for (const file of await glob("**/*.ts", {
  cwd: resolve(import.meta.dirname, srcDir),
  onlyFiles: true,
  absolute: false,
})) {
  const types = flattener(project, resolve(srcDir, file), { maxDepth: 48 });
  await renderToFile(resolve(outDir, file), template, {
    file,
    types: types.map(({ name, text, parameters, comments }) => ({
      name,
      text,
      parameters: parameters.length
        ? `<${parameters.map((e) => e.fullText).join(", ")}>`
        : "",
      arguments: parameters.length
        ? `<${parameters.map(() => "never").join(", ")}>`
        : "",
      relaxedAssert: comments.some((e) => e.includes("@relaxed-assert")),
      skipAssert: comments.some((e) => e.includes("@skip-assert")),
      comments,
    })),
  });
}
