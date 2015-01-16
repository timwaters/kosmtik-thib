# kosmtik-thib

This plugin is used to print maps from Kosmtik
<br/>
# install on Linux

<br/><br/>
  <u>Step 1  : Download and Install Kosmtik following the instructions on this Kosmtik web page</u><br/>
<br/>
https://github.com/kosmtik/kosmtik

<br/><br/>
  <u>Step 2 : Download and install kosmtik-overpass-layer and kosmtik-fetch-remote</u>><br/>
<br/>
Run the following commands on Kosmtik's folder:<br/>
<i>npm install kosmtik-overpass-layer</i><br/>
<i>npm install kosmtik-fetch-remote</i>

<br/><br/>
  <u>Step 3 : Add the plugin to the file /etc/.config/kosmtik.yml</u><br/>
<br/>
Run the following commands:<br/>
<i>sudo -i</i><br/>
and then:<br/>
<i>gedit /root/.config/kosmtik.yml</i>
<br/><br/>
Add the following line to the file and save<br/>
<div>  - kosmtik-thib</div>
  
<br/><br/>
  <u>Step 4 : Install kosmtik-thib</u><br/>
<br/>
Download and unzip file in kosmtik folder or clone/pull it from git

Run the following command line in Kosmtik's folder:<br/>
<i>npm install kosmtik-thib</i>
<br/><br/>
  <u>Step 5 : Launch Kosmtik</u><br/>
<br/>
From now on, when you will use Kosmtik, the plugin wil be avaliable on the right toolbar.
