const downloader = require("./downloader.js");
const fs = require("fs");

function getUrls() {
  return fs.readFileSync("./input.txt", "utf8")
    .split('\n')
    .map(x => x.trim())
    .map(u => {
      if (u.startsWith(settings.addDLCredentialsToUrl)) {
        return u.replace('://', `://${settings.downloadUsername}:${settings.downloadPassword}@`);
      }
      return u;
    });
}

downloader.handleUrls(getUrls());