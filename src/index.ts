#!/usr/bin/env node
const { run: jscodeshift } = require("jscodeshift/src/Runner");

import path from "path";
import { argv } from "node:process";
import glob from "glob";

const transformPath = path.resolve("./lib/transform.js");

(async () => {
  const paths = await glob(argv.slice(2));

  const options = {
    print: true,
    verbose: 1,
  };

  const res = await jscodeshift(transformPath, paths, options);

})();
