# kosmtik-thib

This plugin is used to print maps from Kosmtik

# install on Linux


  Step 1  : Download and Install Kosmtik followong the instructions on this Kosmtik web page
https://github.com/kosmtik/kosmtik


  Step 2 : Download and install kosmtik-overpass-layer and kosmtik-fetch-remote

Run the following commands on Kosmtik's folder:
npm install kosmtik-overpass-layer
npm install kosmtik-fetch-remote


  Step 3 : Add the plugin to the file /etc/.config/kosmtik.yml

Run the following commands:
sudo -i
and then:
gedit /root/.config/kosmtik.yml

Add the following line to the file and save
  - kosmtik-thib
  

  Step 4 : Install kosmtik-thib

Download and unzip file in kosmtik folder or clone/pull it from git

Run the following command line in Kosmtik's folder:
npm install kosmtik-thib


  Step 5 : Launch Kosmtik

From now on, when you will use Kosmtik, the plugin wil be avaliable on the right toolbar.
