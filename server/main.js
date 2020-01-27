import { Meteor } from 'meteor/meteor';

var ffmpeg = require('ffmpeg');

Meteor.startup(() => {
  myPath = 'empty';
  const { exec } = require('child_process');
  exec("echo %cd%", (err, stdout, stderr) => {
    if (err) {
      return;
    }
    myPath = stdout.split('server')[0];
    console.log(myPath);
    //exec(myPath + "web.browser\\app\\ffmpeg\\bin\\ffmpeg.exe -f vfwcap -r 30 -i 0 -b 2500k -f flv rtmp://localhost/live/evento", (err, stdout, stderr) => {
    exec(myPath + "web.browser\\app\\ffmpeg\\bin\\ffmpeg.exe -re -stream_loop -1 -i " +  myPath + "web.browser\\app\\videos\\video.mp4 -c copy -f flv rtmp://192.168.200.88/live/evento", (err, stdout, stderr) => {
      if (err) {
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  });
});

Meteor.methods({
  getEnv() {
    return myPath;
  }
});
