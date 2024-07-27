---
title: Raspberry Pi as a Server? Lame. Use a Phone Instead!
tag:
- sysadmin
- linux
- server
- selfhosting
- nextcloud
---

*I just got a new Raspberry Pi 5 like 2 days ago, but let me tell you, using your phone to host a server is actually not a bad idea. I haven't personally tested hosting a server on that Raspberry Pi so I can't compare them two, but I'll update on that soon.*

A month ago, I deployed a [Nextcloud](https://nextcloud.com) instance on my phone! (still up and running as I wrote this)

Yeah, I know, that sounds silly. But for an experiment, why not? After all, it's not like I bought a new phone just for this—I just took my old and slightly abandoned [Asus ZenFone X00TD](https://wiki.lineageos.org/devices/X00TD/) and tried to poke around with it. My Asus phone has been around since 2019 and I've installed custom ROMs there for like 20 times or something idk 💀—and surprisingly, it still works great! Also, yeah, that old phone will be used for something else if I don't utilize it soon, so I decided to do this experiment.

<a href="/blog/image/phablet.png">![Ubuntu Touch server ssh](/blog/image/phablet.png)</a>

# First Attempt

My first attempt was with Termux, as usual. And uh, for convenience, I installed a proot container there using `proot-distro`. Tried both Arch Linux and Debian but I got so many errors launching my web server! Or rather, the web server works but the database server didn't work. Then, I tried chrooting natively with the real `chroot` utility from Android, but now the server doesn't work instead 💀 That's to be expected though, since I didn't use any service manager. And in a weird environment. And I was too dumb to start the services correctly, probably.

# Well, Maybe not Android.

I am soooo lucky (and grateful that an amazing community like UBports exist!). [Ubuntu Touch](https://ubuntu-touch.io/) is very well supported on my Asus Phone. It's also a *real* Ubuntu GNU/Linux. Sure, it uses an Android container to setup the hardware, but that part doesn't matter. I proceeded to install Ubuntu Touch to get better support for running services and have a file system hierarchy that *actually* makes sense.

## Setup

My phone ran Ubuntu Focal Fossa (20.04 LTS—which happens to be my favorite version coz it's the latest Ubuntu LTS back when I started using Linux in 2021). I think that back when I used Ubuntu 19.something, they still use Upstart? I'm not sure but point is, this 20.04 has Systemd, so I'm already familiar with the service management there.

I followed [this tutorial](https://cloudcone.com/docs/article/how-to-install-nextcloud-on-debian-10/) and installed Apache2 with PHP (7.4.3). Oh yeah and you do need to remount the root as read-write (`sudo mount -o rw,remount /`) first. Really bad idea coz this is supposed to have OTA updates but I think that your packages are preserved after upgrades anyways.

For the database, the tutorial uses MySQL—but for some reason, I couldn't execute the commands from that tutorial and since I don't really understand why, I switched to MariaDB instead and it works fine ;)

And then, I downloaded the latest [Nextcloud zip](https://download.nextcloud.com/server/releases/) and unzipped it to `/var/www/html`. However, it turns out that the latest Nextcloud needs PHP 8.0 which I don't have on the repository. So.. I unzipped Nextcloud 25 instead—only to get a disk full warning because my `/` is only 5 gigabytes big. I then moved the Nextcloud directory to my home directory and symlinked it to `/var/www/html/nextcloud`.

After that, I launched the setup on my `http://localhost/nextcloud`. It told me about all the missing PHP modules so I installed them and enabled them. I then made my admin account and all is good!

Next task: making it public.. just because I want to. Would be great anyways. I am behind NAT from my ISP, so I can't just setup port forwarding on my router. I asked my ISP if I can get a public IP and do port forwarding, but unfortunately, I'm not allowed to. Now I have to look for tunneling solutions to expose my web server port.

I chose [Cloudflare's tunneling service](https://github.com/cloudflare/cloudflared) because it's free* (I'm broke) and is dead easy to setup. Furthermore, I can also use my own domain.

And then, boom! It's public!

<a href="/blog/image/nextcloud.png">![Nextcloud screenshot](/blog/image/nextcloud.png)</a>

\*plan with no charge is available

# Performance (What do You Expect..?)

The site loading is kinda laggy but still usable (considering this runs on a phone). Are file transfers fast? Well, both my upload and download speed are actually not too bad..  But then again, it's probably because I'm literally next to the server right now. I tried to share a media to my friend in Germany, and they said that the playback is really bad. Then another media to my friend in Indonesia, also bad. Ugh, I think it's my 30 Mb/s network bandwidth, lol. And poor performance, perhaps.

But then again, let's just call this *an experiment*.

# Wait, Now It's *HEADLESS*??

Extra (funny) bit.

A few days after I ran the server, I started to find the fact that I can't start MariaDB through Systemd a bit annoying and odd. It would just freeze there uncertainly, never actually returning; but the service itself actually runs fine. After a bit of investigation, it turns out that it happened because of my near zero space left on the root partition.

So then, I tried to clean my root partition using [`dust`](https://github.com/bootandy/dust/) (to first analyze the drive usage). One of the culprits was the big Systemd journal files. But also, I found this "random" Android image file. It's located at `/var/lib/lxc/android/android-rootfs.img`, and is around 500 Mb in size. I thought, "hey maybe that's just some random Android image for the LXC container that'll get utilized when I *actually* make a container," and so I deleted that file. Not really, actually, I moved the file to my computer. Who knows, maybe I'll need it back one day.

A few days later, my phone ran HEADLESSLY 💀 Like, it's just suddenly blank. No rebooting, no configuring, nothing. Screen won't turn on, and the LED indicator stopped responding so I don't know if it's actually being charged or not (unless I ssh to it). But other than that, it's still up and running well. Instead of panicking, I laughed and thought, "Yay, now it's **_a_ real server**!"

..until, I realized that my phone won't boot up anymore.

![uh-oh](/blog/image/uh-oh.gif)

I thought it was just some one-time anomaly, but even after a couple other reboots, it's just blank 🫥 

Later, I found out that my phone still appeared when I run `adb devices`. It's just that I couldn't really authorize my computer. But [a page on UBports' documentation](https://docs.ubports.com/en/latest/userguide/advanceduse/adb.html) mentioned this:

> If you’re bringing up a port and you require ADB access before the UI is available, you can disable this protection by editing /etc/default/adbd and change ADBD_SECURE=1 to ADBD_SECURE=0.

So I did that, and I'm in! I tried running `systemd-analyze` only to find out that the boot is not even completed yet, lol. Many services failed to start, explaining why it's just blank.

\*GASP\* wait, what if it's that Android image I deleted earlier? ***YUP!*** Remember when I said that [Ubuntu Touch uses an Android container to configure the phone's hardware](https://wiki.ubuntu.com/Touch/ContainerArchitecture)? The file I deleted earlier is the container's image. It probably made some of the hardware unusable, making all those services fail to start. But luckily, since I have the backup of that image file, I can just pull it back and place it to the previous location. After that, boom! It's all good again.

Moral of the story: *always make backup, kids.* And don't just delete random files.

