const liveServer = require("live-server");
const fs = require("fs");

const params = {
  port: 8080,
  host: "localhost",
  root: "./",
  watch: ["./src"],
};

if (fs.existsSync(params.root)) {
  liveServer.start(params);
} else {
  throw new Error("Dist Folder Not Found");
}
