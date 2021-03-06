const Syno = require('syno');

async function handleUrlsAsync(urls, settings) {
  if (!urls.length) {
    throw new Error("No urls were provided!");
  }

  var syno = new Syno({
    protocol: settings.protocol,
    host: settings.host,
    port: settings.port,
    account: settings.account,
    passwd: settings.password,
    apiVersion: settings.apiVersion || '6.0.2',
  });

  await createNestedFolders(urls, syno, settings);
  await createDownloadTasks(urls, syno, settings);
}

async function createDownloadTasks(urls, syno, settings) {
  for (let i = 0; i < urls.length; i++) {
    const folderPath = getFolderPath([urls[i]], settings)[0];

    let destination = `${settings.baseDownloadDir}/${folderPath}`

    if (destination.startsWith('/')) {
      destination = destination.slice(1);
    }

    var promise = new Promise((resolve) => {
      syno.dl.createTask({
        uri: urls[i],
        destination: destination,
      }, (value) => {
        if (value) {
          console.log(value);
        }
        console.log(`Downloading ${urls[i]} to ${destination}`);
        resolve();
      });
    });

    await promise;
  }
}

async function createNestedFolders(urls, syno, settings) {
  if (!settings.createPathAfterUrlComponent) {
    return;
  }

  const folderPaths = getFolderPath(urls, settings);

  for (let f = 0; f < folderPaths.length; f++) {
    const path = folderPaths[f];
    const folders = path.split('/')
      .filter(x => !!x);

    if (folders.length > 1) {
      // Create everything along this path.
      var promise = new Promise(resolve => {
        syno.fs.createFolder({
          folder_path: `${settings.baseDownloadDir}/${folders.slice(0, folders.length - 1).join('/')}`,
          name: folders[folders.length - 1],
        }, () => {
          console.log(`Created folder: ${settings.baseDownloadDir}/${folders.slice(0, folders.length - 1).join('/')}/${folders[folders.length - 1]}`)
          resolve();
        });
      });

      await promise;
    } else {
      // Just create this one folder.
      var promise = new Promise(resolve => {
        syno.fs.createFolder({
          folder_path: `${settings.baseDownloadDir}`,
          name: folders[0],
        }, () => {
          console.log(`Created folder: ${settings.baseDownloadDir}/${folders[0]}`)
          resolve();
        });
      });

      await promise;
    }
  }
}

function getFolderPath(urls, settings) {
  const folderPaths = [];

  urls.forEach(x => {
    const ix = x.indexOf(settings.createPathAfterUrlComponent) + settings.createPathAfterUrlComponent.length;

    folderPaths.push(decodeURI(x.substring(ix, x.lastIndexOf('/'))));
  });

  return [...new Set(folderPaths)];
}

module.exports = {
  handleUrlsAsync,
};