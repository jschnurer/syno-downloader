# local.settings.json file
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