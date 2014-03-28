--------------------------------------------------------------------------------------------------------------
What do you need ?
* Install NodeJs: http://nodejs.org/
* Install Git: https://code.google.com/p/msysgit/ or http://git-scm.com/download/win
* Install PhantomJs: http://phantomjs.org/
* Install Chrome: http://www.google.fr/intl/fr/chrome/browser/
* Install SVN: http://subversion.tigris.org/

Next, put into the system PATH:
* NodeJs bin
* Git bin
* SVN bin


--------------------------------------------------------------------------------------------------------------
If you have a proxy:

You have a configuration property to configure Git
git config --global http.proxy http://proxy.company.com:8080
git config --global https.proxy http://proxy.company.com:8080

And if needed
git config --global url."https://".insteadOf git://

You have two configuration properties to configure NPM
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

For Bower, put into the PATH the variable "HTTP_PROXY"
HTTP_PROXY http://proxy.company.com:8080
HTTPS_PROXY http://proxy.company.com:8080

--------------------------------------------------------------------------------------------------------------
After that, open a shell prompt, go to the current directory and type the following commands
> npm install
    -> We will install required NodeJs main and development plugins
