# Power Apps Portal Mock
Various steps taken to create a local hosted live server which mocks Power Apps Portal by substituting liquid code with server side generated html.
This way the designing of Power Apps Portal pages can take place in a simple local hosted web server.
Log of the configurations and files created:
## Initialize GIT
1. Install / upgrade git: git update-git-for-windows
1. Create repository on github: logon github, new repository, power-apps-portals-mock
	1. Add a readme, a npm git ignore, GNU licence
1. In VS Code
	1. Check git enabled setting (gear icon, settings, search git enabled
1. In terminal, git clone https://github.com/MJBoes/power-apps-portals-mock.git "D:\Data\Desktop Services\Solutions (Desktop Services) - Documents\2020\20201221PowerAppsPortalMock"
1. Commit changes in readme.md
## Create folder structure
\bundleblocks
\css
\fonts
\img
\js
## Create favicon_package (https://favicon.io/favicon-converter/)
Place the files in the root directory of your website.
* android-chrome-192x192.png
* android-chrome-512x512.png
* apple-touch-icon.png
* favicon-16x16.png
* favicon-32x32.png
* favicon.ico
* site.webmanifest
## Header
In the bundleblocks folder, create an HTML file with the contents of the header tag.
The content of this file will end up in a Header/Bottom content snippet in the Power Apps Portal.
```html
<head>
    <!--Super weird: to get this actually in the head in Power Apps Portals, a Head/Bottom content snippet is added -->
    <!-- see https://oliverrodrigues365.com/2020/06/14/power-apps-portals-adding-head-meta-tag/ -->
    <meta charset="utf-8">
    <title>Desktop Services - Power Apps Portals</title>
    <meta property="og:title" content="Desktop Services - Power Apps Portals">
    <link rel="shortcut icon" href="https://stpowerappsportals.blob.core.windows.net/assets/img/dts-favicon.ico">
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://content.powerapps.com/resource/powerappsportal/dist/preform.bundle-dc32bcb8fb.js"></script>
    <script src="js/dts-jquery-custom.js"></script>
    <link rel="stylesheet" href="bootstrap.min.css">
    <link rel="stylesheet" href="/css/DTS-portal.css">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#993300">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#993300">
</head>
```
The assets (scripts, icons etc.) are hosted on Azure. This is a choice, as these items can be added as web resources in the Dataverse as well. Updating the files in the Dataverse takes more actions though, so here an Azure storage account is used.
