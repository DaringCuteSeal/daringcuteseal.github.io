---
title: Trojan Injected Flashdisk

tag:
- software
- malware
- security

---

A week ago, I went to a stationary store to print a document because my printer is sort of broken. I brought an 8 GB flashdisk with only one file in it 🤷. Oddly enough, the person there said that their computer has a virus in it so I probably shouldn't use a flashdisk to print my document. But I don't want to go back home to get my phone to set up the printer there so I decided to just use the flashdisk anyway.

Today, I decided to check my flashdisk on my old laptop running Artix Linux—and something strange showed up!

![content of flashdisk](/blog/image/trojan-flashdisk-content.png)

Yep, that's a Windows® autorun file that tells the OS what to execute automatically when you plug your flashdisk!

That's sus as hell. Here's the content of it:
```ini
[AUtoRuN]
ShEllExECUte=__\DriveMgr.exe
UseAUtoPlAY=1
```

Apparently, it executes a file inside the `__` directory. I uploaded the file to VirusTotal and...

![virustotal](/blog/image/trojan-flashdisk-virustotal.png)

Boom! I got a Windows® trojan. Pretty cool. I then stored it to my hard disk as a malware sample because why not.

Yeah there's nothing much about this story but it's just kinda interesting how I wanted to print a document and ended up not only getting papers but also a trojan.
