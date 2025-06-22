const sass = require("sass");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const pug = require("pug");
const glob = require("glob");
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const cssnano = require("cssnano");
const terser = require("terser");
const chokidar = require("chokidar");

const task = process.argv[2];

switch (task) {
  case "pug":
    compilePug();
    break;
  case "sass":
    compileSass();
    break;
  case "ts":
    compileTs();
    break;
  case "libs":
    addLibs();
    break;
  case "all":
    compilePug();
    compileSass();
    compileTs();
    addLibs();
    break;
  case "watch":
    watch();
    break;
  default:
    console.log("Invalid Task, Please Use pug, sass, ts, libs, all");
}

// Compile Sass with PostCSS
function compileSass() {
  glob.sync("src/sass/**/[^_]*.scss").forEach((file) => {
    const outputFile = file
      .replace("src/sass", "dist")
      .replace(".scss", ".css");
    const outputFileDir = path.dirname(outputFile);
    fs.mkdirSync(outputFileDir, { recursive: true });
    const result = sass.compile(file);
    postcss([autoprefixer({ overrideBrowserslist: ["since 2018"] }), cssnano])
      .process(result.css.toString(), { from: outputFile })
      .then((result) => {
        fs.writeFileSync(outputFile, result.css);
      })
      .catch((error) => {
        console.error(`Error compiling Sass: ${error.message}`);
      });
  });
  console.log("Sass Compiled Successfully");
}

// Compile Pug
function compilePug() {
  glob.sync("src/pug/pages/**/[^_]*.pug").forEach((file) => {
    const outputFile = file
      .replace("src/pug/pages", "dist")
      .replace(".pug", ".html");
    const outputFileDir = path.dirname(outputFile);
    fs.mkdirSync(outputFileDir, { recursive: true });
    const html = pug.renderFile(file);
    fs.writeFileSync(outputFile, html);
  });
  console.log("Pug Compiled Successfully");
}

// Compile TypeScript
function compileTs() {
  // Compile base.ts
  const baseContent = fs.readFileSync("src/ts/base.ts", "utf8");
  const baseResult = ts.transpileModule(baseContent, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  const compiledBaseContent = baseResult.outputText;

  const configFile = ts.findConfigFile(
    "./",
    ts.sys.fileExists,
    "tsconfig.json",
  );

  if (!configFile) {
    throw new Error("Could not find a valid tsconfig.json file.");
  }

  const config = ts.readConfigFile(configFile, ts.sys.readFile).config;
  const parsedCommandLine = ts.parseJsonConfigFileContent(config, ts.sys, "./");

  const program = ts.createProgram({
    rootNames: parsedCommandLine.fileNames,
    options: parsedCommandLine.options,
  });

  const emitResult = program.emit();

  if (emitResult.emitSkipped) {
    console.error("Error compiling TypeScript");
  } else {
    console.log("TypeScript compiled successfully!");
  }

  parsedCommandLine.fileNames.forEach((fileName) => {
    if (fileName.endsWith(".ts")) {
      const outputFile = fileName
        .replace("src/ts/", "dist/")
        .replace(".ts", ".js");
      if (fs.existsSync(outputFile)) {
        const sourceContent = fs.readFileSync(fileName, "utf8");
        let outputContent = fs.readFileSync(outputFile, "utf8");
        if (!sourceContent.includes("//noBase")) {
          fs.writeFileSync(
            outputFile,
            compiledBaseContent + "\n" + outputContent,
          );
        } else {
          console.log(`Skipping ${outputFile} due to`);
        }
      } else {
        console.log(`//noBase comment in source file`);
      }
    } else {
      console.log(`Output file does not exist: ${outputFile}`);
    }
  });
  glob.sync("dist/**/*.js").forEach((file) => {
    const code = fs.readFileSync(file, "utf8");
    terser
      .minify(code)
      .then((result) => {
        fs.writeFileSync(file, result.code);
      })
      .catch((error) => {
        console.error(`Error minifying ${file}: ${error.message}`);
      });
  });
}

function addLibs() {
  const srcDir = fs.existsSync("src/libs") ? "src/libs" : "";
  const outDir = "dist";
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }
  fs.cpSync(srcDir, `${outDir}/libs`, { recursive: true });
  console.log("Added Libraries");
}

function watch() {
  compilePug();
  compileSass();
  compileTs();
  addLibs();

  const watcher = chokidar.watch(
    ["src/sass", "src/pug", "src/ts", "src/libs"],
    {
      persistent: true,
      recursive: true,
      ignoreInitial: true,
    },
  );

  watcher.on("ready", () => console.log("Watcher Started!"));

  watcher.on("change", (path) => {
    if (path.endsWith(".scss")) {
      console.log("Sass file changed, recompiling all Sass files...");
      compileSass();
    } else if (path.endsWith(".pug")) {
      console.log("Pug file changed, recompiling all Pug files...");
      compilePug();
    } else if (path.endsWith(".ts")) {
      console.log(
        "TypeScript file changed, recompiling all TypeScript files...",
      );
      compileTs();
    } else if (path.startsWith("src/libs")) {
      console.log("Library file changed, updating libraries...");
      addLibs();
    }
  });
}
