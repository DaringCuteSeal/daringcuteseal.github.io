---
title: Raspi as Server? Lame. Use a Phone Instead!
tag:
- sysadmin
- linux
- server
- selfhosting
---

Can I *actually* buy a raspberry pi? Yes. But that's lame, so I hosted a [Nextcloud ](https://nextcloud.com) instance on my phone instead!

Yeah, I know, that's stupid. But for an experiment, why not? After all, it's not like I bought a new phone just for this—I just took my old and slightly abandoned [Asus ZenFone X00TD](https://wiki.lineageos.org/devices/X00TD/) and tried to poke around with it. My Asus phone has been around since 2019 and I've installed custom ROMs there for like 20 times or something idk 💀—and surprisingly, it still works great!

# First Attempt

My first attempt was with Termux, as usual. And uh, for convenience, I installed a proot container there using `proot-distro`. Tried both Arch Linux and Debian but I got so many errors launching my web server! Maybe I should've tried with a native chroo
# Yoo I hosted my own [Nextcloud](https://nextcloud.com)..!

***And the coolest part is: it's running on my PHONE!***

Well my phone runs [Ubuntu Touch](https://ubports.com), actually.

![scrot-shot.xgHdj.png](019314ab7ff263bf7fa30e8eb30852a1.png)

And obviously the reason why is because I'm broke™! While I do have an old laptop around, I just don't think it's cool to use as a server.. and besides, it's an x86_64 power-hungry machine.

My dad will take my old phone and use it for something else if I don't utilize it soon, so I turned it into a server. 😎

# Performance

Is it fast? Well my upload and download speed is actually not bad.. and the site loading is kinda laggy but still usable (considering this runs on a phone). but then again, it's probably because I'm literally next to the server right now. I tried to share a media to my friend at Germany, and they said that the playback is really bad. *Sudahlah, buat kita-kita yang dari alam +62 aja ya ges ya.*

But then again, let's just call this *an experiment*.

# Setup

My phone (Asus X00TD) supports Ubuntu Touch and it's running Ubuntu Focal Fossa (20.04 LTS—which happens to be my favorite version coz it's the latest Ubuntu LTS back when I started using Linux in 2021). I think that back when I used Ubuntu 19.something, they still use Upstart? I'm not sure but point is, this 20.04 uses systemd which means it's less painful to work with as a server.

I followed [this tutorial](https://cloudcone.com/docs/article/how-to-install-nextcloud-on-debian-10/) and installed Apache2 with PHP (7.4.3). Oh yeah and you do need to remount the root as read-write (`sudo mount -o rw,remount /`) first. Really bad idea coz this is supposed to have OTA updates but I think that your packages are preserved after updates anyways. Not too sure, though.

For the database, the tutorial uses MySQL—but for some reason, I couldn't execute the commands from that tutorial and since I don't really understand this, I switched to MariaDB instead and it works fine ;)

And then, I downloaded the latest [Nextcloud zip](https://download.nextcloud.com/server/releases/) and unzipped it to `/var/www/html`. However, it turns out that the latest Nextcloud needs PHP 8.0 which I don't have on the repository. So.. I unzipped Nextcloud 25 instead—only to get a disk full warning because my `/` is only 5 gigabytes big. I then moved the Nextcloud directory to my home directory and symlinked it to `/var/www/html/nextcloud`.

After that, I launched the setup on my `http://localhost/nextcloud`. It told me about all the missing PHP modules so I installed them and enabled them. I then made my admin account and all is good!

Next task: making it public.. just because I want to. I am behind NAT from my ISP, so I can't just setup port forwarding on my router. I asked my ISP if I can get a public IP and do port forwarding, but unfortunately, I'm not allowed to. Now I have to look for tunneling solutions to expose my web server port.

I chose [Cloudeflare's tunneling client](https://github.com/cloudflare/cloudflared) because it's free* (I'm broke) and is dead easy to setup. Furthermore, I can also use my own domain.

\*plan with no charge is available

# Yay!

I'm probably gonna get an SD card soon to put all my data because my phone's micro USB port will probably be used to charge it all the time. I'm probably not gonna really rely on this for serious tasks

