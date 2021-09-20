# local.settings.json file
Create a file named `local.settings.json` alongside the `index.js` file with the following structure and properties:

```
{
  "protocol": "http or https",
  "host": "servername",
  "port": "5000",
  "account": "nas_username",
  "password": "nas_password",
  "apiVersion": "6.0.2",
  "downloadUsername": "uri_username",
  "downloadPassword": "uri_password",
  "addDLCredentialsToUrl": "string to check for in url to know if creds should be added, e.g. https://mywebsite.somewhere.com",
  "createPathAfterUrlComponent": "string in url after which folders should be made on the NAS, e.g. /files/",
  "baseDownloadDir": "NAS path for base download director, e.g. /Media/Downloads"
}
```

# Get some URLs to download
Create a file named `input.txt` alongside the `index.js` file and paste in a bunch of URLs (one per line).

# Run the script
Execute `$ node .\index.js`. It will read in the input.txt file and do some stuff.

If `createPathAfterUrlComponent` has a string in it & that string is found in a download URL, it will take everything after the match up to the last `/` and then create folders along that path on your NAS in the `baseDownloadDir`.

For example:
* createPathAfterUrlComponent = `/public/files/`
* baseDownloadDir = `/Shared/Downloads`

The url "https://somewebsite.com/public/files/TVShow1/Season1/episode 1.mkv" would create the following folder path on the NAS:
* /Shared/Downloads/TVShow1/Season1

It would then download `episode 1.mkv` into that folder path.

The process repeats for every url in the `input.txt` file. So by doing this, you can sort of preserve the folder structure of the download list.