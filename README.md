# simple-file-host-for-lan

i made this to transfer files using LAN from my pc to my laptop using the local ip, you can use that too, put your files in uploads and run the app using npm start or yarn start, you need to get your device local ip using the command `ipconfig` in the command prompt, then copy the local ip and add the port/download/filename in the other device (on the same network)
for example open 192.168.1.5:3000/file.txt on the other device and it's gonna be transfered in high speed (depends on your motherboard max internet speed)

note that if you use this with no firewalls on your pc or router, anyone can access your files using your public ip, but most routers come with a firewall that block connections from outside.
