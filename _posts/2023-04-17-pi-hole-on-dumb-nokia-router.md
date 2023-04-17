---
title: Pi-Hole on My Dumb Nokia Router
tag:
- internet
- security
- privacy

---

Internet, oh internet! What a dangerous place.

Anyways, I've been having the plan to get a Raspberry Pi for a while now. I didn't buy one so soon because I have no idea what I'm going to use it for.

I watched [this video from LTT about Android TV Boxes](https://youtube.com/watch?v=1vpepaQ-VQQ) a couple days ago. Guess what? I have one of em at my house. I tried to look for signs of malware myself with adb (somehow using a USB-A to USB-C cable works..?) but I can't find a `Corejava` folder mentioned in the video.

And then, I wanted to monitor the TV Box's connection. There tons of ways to do that, but I decided to try out Pi-Hole for the first time! I then deployed a Pi-Hole server at my old laptop running Ubuntu to first try it out (I might get Pi-Hole running on a Raspi later). 

However, I got into some issues: I can't get my Nokia G-240W-F router to use my Pi-Hole's IP address as the DNS resolver *because all the setting fields at my router's admin web panel cannot be changed!*:

![locked options](/blog/image/locked-router-admin-options.png)

After some research, I found out that there's a well-known admin user you login to in order to unlock those options: username `AdminGPON` with password `ALC#FGU`. Heh, seems not secure. But luckily, I could change the password for the AdminGPON user.

After that, I'm finally able to configure my router to use Pi-Hole. There are also a bunch of new settings to play with, yay :D

![pi-hole](/blog/image/pi-hole.png)