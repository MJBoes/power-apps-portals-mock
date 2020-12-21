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
* bundleblocks
* css
* fonts
* img
* js
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
In the bundleblocks folder, create an HTML file with the contents of the head section.
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
## Body
Also in the bundleblocks folder, a HTML file is created for the body. The contents of this file will end up in a custom web template in the dataverse. Creation and sync of this content is no more fancy that a copy / paste action in the Portal Management App in Power Apps.
```html
<body>
    <header>
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-sm-8">
                    <div id="logo">
                        <!--logo snippet-->
                        <a href="/"><img
                                src="https://stpowerappsportals.blob.core.windows.net/assets/img/DTS-sitelogo.png"
                                alt="" /></a>
                        <!--end logo snippet-->
                    </div>
                    <div class="tagline">
                        <h2><span>Solutions</span> Subjects</h2>
                        <h2><span>Applications</span> Services</h2>
                    </div>
                </div>
                <div class="col-md-4 col-sm-4">
                    <div class="searchbox">
                        <div id="searchInputBox">
                            <!--search snippet-->
                            <div bundle-html="indexsearch.html">{% include 'Search' search_id:'q' %}</div>
                            <!--end search snippet-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ...
</body>
```
Note here the div bundle-html="indexsearch.html" tag. What will happen, is that this code renders a liquid tag in Power Apps Portals, but locally it will be replaced with an HTML file. This way the design can be created localy and the resulting css and html works on Power Apps Portals. The content of these bundle-html files is copied from the generated HTML from these liquid tags.
## Bundler
The html blocks are combined in bundle.html in the root of the project.
```html
<html>
    <head bundle-html="indexhead.html">
    </head>
    <body bundle-html="indexbody.html">
    </body>
</html>
<script>
    function BundleHTML() {
        var z, i, elmnt, file, xhttp;
        /* Loop through a collection of all HTML elements: */
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            /*search for elements with a certain atrribute:*/
            file = elmnt.getAttribute("bundle-html");
            if (file) {
                /* Make an HTTP request using the attribute value as the file name: */
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                        if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                        /* Remove the attribute, and call this function once more: */
                        elmnt.removeAttribute("bundle-html");
                        BundleHTML();
                    }
                }
                xhttp.open("GET", ("bundleblocks/"+file), true);
                xhttp.send();
                /* Exit the function: */
                return;
            }
        }
    }
    BundleHTML();
</script>
```
This is just a carrier for a simple Javascript routine to substitute the bundle-html references with the HTML files.
## Running the solution
Live Server (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) is used to host these local files.
## The result
The result is a local HTML instance where the css files, html and liquid tags can be mocked:
![Example](/img/git preview.jpg)