Graph Paper
=============


#Change Log

## v0.2.0
* Added support for turning any workspace into fullscreen mode, hiding all menu UI
* Added support for toggling edit/lock mode
* Added function to add canvas to favourite.
* Removed all 'background' tiles, greatly improving the performance of the site.
* Added support for changing workspace background using the sidebar
* Improved embed widget to directly accept URL from most popular websites. Without the need for user to copy/paste the full embed code.
* Added a Widgets page to list all current available modules.
* User login page. Facebook login works on local dev environment, but it has been turned off for the current deployed version.
* Auto-enhance mode that can be skips the need to click on the enhance button all the time. This setting is stored in the user profile.
* Canvas page is now protected by login.



## Installation 
# Step 1 
`
apt-get install python-software-properties
add-apt-repository ppa:chris-lea/node.js
apt-get update
apt-get install nodejs
npm install -g demeteorizer
npm install -g meteorite
curl https://install.meteor.com/ | sh
`

# Step 2
`
docker pull andrewbeng89/demeteorize
`
#git/hooks/post-update

# Step 3
#mkdir /home/app/graphpaper
#chmod +x build.sh


&copy; 2014 GraphPaper Pte Ltd