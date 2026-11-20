#!/usr/bin/env node
const { run: jscodeshift } = require("jscodeshift/src/Runner");

import path from "path";
import { argv, platform } from "node:process";
import glob from "fast-glob";

const transformPath = path.resolve("./lib/transform.js");

(async () => {
  // A leading ! is literal unless it opens an extglob.
  const patterns = argv
    .slice(2)
    .filter(Boolean)
    .map((pattern) => pattern.replace(/^!(?!\()/, "\\!"));
  const globOptions = {
    caseSensitiveMatch: platform !== "darwin" && platform !== "win32",
    followSymbolicLinks: false,
    onlyFiles: false,
  };
  // Keep absolute globs separate so relative globs cannot limit their search root.
  const searches = [false, true].flatMap((absolute) => {
    const group = patterns.filter((pattern) => path.isAbsolute(pattern) === absolute);
    // A trailing slash restricts a pattern to directories.
    const directoryPatterns = group
      .filter((pattern) => pattern.endsWith("/"))
      .map((pattern) => pattern.replace(/([^/])\/+$/, "$1"));
    return [
      glob(group.filter((pattern) => !pattern.endsWith("/")), globOptions),
      glob(directoryPatterns, { ...globOptions, onlyDirectories: true }),
    ];
  });
  const matches = (await Promise.all(searches)).flat();

  const options = {
    print: true,
    verbose: 1,
  };

  const targets = new Set(
    matches.map((match) => match.replace(/^\.\/(?=.)/, ""))
  );
  await jscodeshift(transformPath, [...targets], options);
})();
