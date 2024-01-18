---
title: "New Year, New Android ROM"
postdesc: "I switched to EvolutionX... at least for now"
tag:
- personal
- android
- rom
- customrom

---

I had to celebrate new year's eve without a properly functioning phone—yet again.

Back in December 2022, I had already planned to do a mobile phone trade with my dad just so I could use LineageOS, or just any custom ROM, really. And yeah, I did that at the end of the month. However, I needed to wait like 2 weeks before I could actually unlock my phone's bootloader, so I ended up installing LineageOS in January 2023.

<img src="/blog/image/lineageos_old.png" width=200px>

<small>(I have no other home/lock screen screenshot other than the one above)</small>

The same thing happened again in 2024! Except that I had to let go of my LineageOS that couldn't even get to celebrate its first birthday 😢

A while back, I decided to switch my phone's pin—and so I did exactly that. However, I only remembered the pin for like 10 seconds before it disappearing into the void of my mind (don't ask how). I even forgot that I have switched my pin at all, because there's this thing called a fingerprint reader at the back of my phone.

The next day, I finally remembered that I have switched my pin, and so I tried to unlock my phone by guessing my pin—but I failed. I **still had adb access, but I was like, *what's the worst thing that could happen..?*** (I did not have anything severely important there like GPG keys or some sort of that so it is ok)

Well, she did not know that this time *she's not lucky enough*.

I rebooted my phone.

Please don't call me dumb, I know that I am—*you don't have to emphasize it.*

Bare with me for a second. Yeah, I had just been officially locked out of my phone. 

My system uses file-based encryption (FBE), so no pin = no data back. For the first few days, I tried as much pin combinations as I could. All I remember is that I used a 4-digit pin and that I primarily used the second row of numbers from the numpad. But yeah, I couldn't figure it out. After all, there are 10k possible pins that you can make using 4 digits of base-10 numbers.

I tried to lurk around the internet to find anything that could help me—tricks, exploits, hacks, etc. However, none of those helped me either.

I was forced to use my other phone with Ubuntu Touch for over a week while I desperately try to unlock something that.. I thought I own. It was sad, I have forgotten the worth of having access to my phone. I loved my handcrafted system very much. And the worst part is that my system is still there, it's just locked away by some pin I don't know. 

> Lost but is owned, it hurts more than losing it all. When you don't have to give it away, there will still be a tiny hope on your heart. Seeing the thing that I feel like I've owned forever suddenly locking itself as if it has never met you? That hurts more than having only one choice of giving up and accepting the chain of events that has led to this.

And just after I'm about to give up and install some new custom ROM (because it feels strange to have to craft my system on the exact same ROM again), I tried installing [TWRP](https://twrp.me/) and browsing it—only to realize that I can try to unlock my phone's storage through TWRP's UI or its CLI utility—without any cooldown! (or at least I thought so)

I tried brute forcing my phone manually through TWRP at first, but then I discovered [this neat Rust utility to automate the brute forcing process](https://github.com/timvisee/apbf/). A [post on this thread](https://android.stackexchange.com/questions/212261/attempting-to-brute-force-android-security-pattern-through-twrp-via-adb) by the program's author points out that there's a 10 second cooldown for every pin attempt. I then tried running the script, but it failed to guess my pattern—possibly because I did not specify the proper pattern and the program didn't actually went through all the possible pins.

Then, I discovered [a thread on Android Stack Exchange](https://android.stackexchange.com/questions/216155/how-exactly-does-fbes-key-derivation-work) which points out that TWRP's pin attempt cooldown duration is actually around 30 seconds. I then decided to write my own script which tries to decrypt my phone with all of the possible 10k pin combinations—but after a week of trying, it couldn't crack down my pin either. Perhaps TWRP's cooldown duration increases for each attempt, my pin's length is actually longer, I missed a pin or two, or.. god who knows.. 💀

So yeah, I gave up.

And as my friend suggested, I decided to try a new ROM that's *actually properly maintained*. I really didn't wanna use LineageOS again because it may evoke the nostalgic feeling that would kill me 😔 I don't know, it just feels wrong. Anyways, I went with [EvolutionX](https://evolution-x.org/) (latest version for my phone is based on Android 14) and it's been pretty smooth, I gotta say. EvolutionX (and Android 14 in general) comes with a plethora of customizations available. I also ditched many of the Google components here 😋 (I need decentralization). I still kept Google Play Services though since it's wayyyy more usable than MicroG.

<div>
    <img src="/blog/image/evolutionx_home.png" width=300px>
    <img src="/blog/image/evolutionx_lock.png" width=300px>
</div>

