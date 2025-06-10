const liveServer = require("live-server");
const fs = require("fs");

const params = {
  port: 8080,
  host: "localhost",
  root: "./dist",
  watch: ["./src"],
  delay: "3000",
};

if (fs.existsSync(params.root)) {
  liveServer.start(params);
} else {
  throw new Error("Dist Folder Not Found");
}

/*
const liveServer = require("live-server");
const params = {
  port: 8080,
  host: "localhost",
  root: "./dist",
  watch: ["./src"],
};
liveServer.start(params);
*/
