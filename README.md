# kosmtik-thib

This plugin is used to print maps from Kosmtik
<br/>
# install on Linux

<br/><br/>
  Step 1  : Download and Install Kosmtik following the instructions on this Kosmtik web page<br/>
<br/>
https://github.com/kosmtik/kosmtik

<br/><br/>
  Step 2 : Download and install kosmtik-overpass-layer and kosmtik-fetch-remote<br/><br/>
<br/>
Run the following commands on Kosmtik's folder:<br/>
<i>npm install kosmtik-overpass-layer</i><br/>
<i>npm install kosmtik-fetch-remote</i>

<br/><br/>
  Step 3 : Add the plugin to the file /etc/.config/kosmtik.yml<br/>
<br/>
Run the following commands:<br/>
<i>sudo -i</i><br/>
and then:<br/>
<i>gedit /root/.config/kosmtik.yml</i>
<br/><br/>
Add the following line to the file and save<br/>
  - kosmtik-thib
  
<br/><br/>
  Step 4 : Install kosmtik-thib<br/>
<br/>
Download and unzip file in kosmtik folder or clone/pull it from git

Run the following command line in Kosmtik's folder:<br/>
<i>npm install kosmtik-thib</i>
<br/><br/>
  Step 5 : Launch Kosmtik<br/>
<br/>
From now on, when you will use Kosmtik, the plugin wil be avaliable on the right toolbar.
