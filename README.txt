--------------------------------------------------------------------------------------------------------------
What do you need ?
* Install NodeJs: http://nodejs.org/
* Install MongoDB: https://www.mongodb.org/downloads (read http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
* Install Git: https://code.google.com/p/msysgit/ or http://git-scm.com/download/win
* Install PhantomJs: http://phantomjs.org/
* Install Chrome: http://www.google.fr/intl/fr/chrome/browser/
* Install SVN: http://subversion.tigris.org/

Next, put into the system PATH:
* NodeJs bin
* MongoDB bin
* Git bin
* SVN bin


--------------------------------------------------------------------------------------------------------------
If you have a proxy:

You have a configuration property to configure Git
git config --global http.proxy http://proxy.company.com:8080
git config --global https.proxy http://proxy.company.com:8080
git config --global http.sslVerify false

And if needed
git config --global url."https://".insteadOf git://

You have two configuration properties to configure NPM
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
npm set strict-ssl false

For Bower, put into the PATH the variable "HTTP_PROXY"
HTTP_PROXY http://proxy.company.com:8080
HTTPS_PROXY http://proxy.company.com:8080

--------------------------------------------------------------------------------------------------------------
If you want to start MongoDb, type:
> mongod --dbpath "./mongodbdata"


--------------------------------------------------------------------------------------------------------------
After that, open a shell prompt, go to the current directory and type the following commands
> npm install
    -> We will install required NodeJs main and development plugins


> grunt default
    -> If 'Logging some stuff...' appears, the install seems good

> grunt dependencies
    -> download all required dependencies for the application
    -> we can do too: > grunt dependencies:install


--------------------------------------------------------------------------------------------------------------
To clean the target folder
> grunt clean

To generate reports:
> grunt reports

To update dependencies
> grunt dependencies

To launch the server (default: in development mode)
> grunt server
> grunt server:dist
> grunt server:dev


Nota Bene: if "grunt" is not recognized:
* do a global install
    > npm install -g grunt grunt-cli

* use instead of the following command
    > "./node_modules/bin/grunt" reports

