---
title: I Changed My Mind. Wayland is (kinda) AMAZING!
postdesc: In this post, I talk about the Wayland hype and my Wayland-based desktop setup on my ASUS convertible laptop.
toc: true
tag:
- hardware
- linux
- wayland

---

Ever since the dawn of time, the X Windowing System has been the predominant graphical windowing system used amongst Linux users. This has changed recently as several Linux distributions with relatively high market share (such as [Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/), [Ubuntu](https://www.omgubuntu.co.uk/2021/01/ubuntu-21-04-will-use-wayland-by-default), [Debian](https://wiki.debian.org/Wayland#GNOME_.28supported_since_3.20.2B-.29), etc.) started to make Wayland the default choice for users.

Okay, I wouldn't say _that_ "recently". For instance, Fedora 25 was released way back in 2016[^1] and had already shipped GNOME with Wayland by default. The option to use X11 was still there though—up until the latest version (as of when I wrote this post), Fedora 41[^2]. In another case, Ubuntu shipped Wayland by default again with its 21.04 release after receiving negative feedback back when Canonical first poked with Wayland in 17.10[^3]. It's now kinda obvious that Wayland has only veeery recently becoming _actually_ usable.

My first ever Linux distribution was Ubuntu 20.04 LTS which came with X11 by default. Funny enough, exactly 4 years ago (as of when I wrote this post) marks that date. I never really used Wayland in any meaningful way since then—at least up until recently. Maybe I did try GNOME and KDE Plasma under Wayland a few times back then, but honestly, I'm never really a big fan of full-fledged, out-of-the-box desktop environments where Wayland happens to be a lot more mature that time, so I had to rely on X11 to prevent myself from getting headache.


# An Excuse to Try Wayland
A while ago, I was handed an [ASUS VivoBook Flip 14](https://www.asus.com/laptops/for-home/vivobook/vivobook-flip-14-tp401/). It's around 4 years old, but definitely still usable. I then started to use it as a school laptop because my main laptop is quite massive. I was unsure about which distro I should use and how to configure my desktop though, as I'm not a big fan of simply copying from my old setup. Plus, my old i3/Qtile setup was mainly keyboard-focused and is pain to navigate with touchscreen. I went with [Chimera Linux](https://chimera-linux.org/) and GNOME for a fresh start, and it was surprisingly great for something that uses Wayland, musl, FreeBSD core utilities, and its own package repository. Truly impressive what desktop Linux has evolved into.

# First Use of GNOME Under Wayland
At that point I was really enjoying modern GNOME (I had never used GNOME >=40 for a long time). I'm really impressed with how it handles my lid switch pretty well—the automatic on-screen keyboard works perfectly. My touchscreen works in majority of apps and actually makes sense, i.e it's not just emulating a mouse but actually behaves like how you expect in phones/tablets. My stylus pen (which, by the way, uses Microsoft's Pen Protocol) also works out of the box which was veery surprising for me.

Whoops, no video or anything, though. I did not have the plan to write this post back then :P

# Piecing Together A Desktop with Wayland

Unfortunately, I gotta admit, Chimera is simply too annoying for daily use. As something that I only use once or twice a week it is actually more than perfect, but they flat out refuse to package old software (like Qt 5) and therefore their dependents (like [Krita](https://krita.org)). As time goes on, I started to use this ASUS laptop more and more often, and I then decided to hop into something more usable for now. I was a bit overwhelmed about the choices available at first, but I decided to just go with [Artix Linux](https://artixlinux.org) since it's what I daily drive on my other laptop.

Again, as I do not like out-of-the-box desktop environments because of its "learn to use" rather than "define how to use" approach, I had to make another confusing choice of which window manager I should use. My friend began experimenting with [Hyprland](https://hyprland.org/) quite some time ago, and then I recommended it to my other friend <small>(somehow it was his first taste of Linux desktop, he's a madman)</small>. After seeing that they both have 0 complaint I decided to try Hyprland for myself.

It wasn't my first time with Hyprland, though. Quite some time ago, I tried [CachyOS](https://cachyos.org/) and went with Hyprland as well (on my other laptop), but I stopped customizing it after I failed to configure plug-ins through `hyprpm`. It kept on complaining about unmet dependencies despite me having everything it mentioned already. After some digging of the source code, it turned out that `hyprpm` did not mention `pkgconf` as its dependency -_- But don't worry, that's fixed already as of now.

So then, after having everything ready, I started ricing my setup =D Not too big of a tweak, I only changed key-binds and customized my [Waybar](https://github.com/Alexays/Waybar) status bar with relevant information. I also used [hy3](https://github.com/outfoxxed/hy3) to match how i3 manages windows. After a while, my desktop is ready for use!

![Hyprland rice](/blog/image/grim-hyprland.png)

..well, almost. The problem is that, this is barely leveraging the fact that the laptop is a convertible. I still have touchscreen gestures and on-screen keyboard to take care of.


## Gestures

[Hyprgrass](https://github.com/horriblename/hyprgrass) is an awesome Hyprland plug-in that provides you the ability to assign dispatchers to touch events. I have these:

```
hyprgrass-bind = , swipe:4:d, hy3:killactive
hyprgrass-bind = , swipe:4:u, fullscreen, 0
hyprgrass-bind = , swipe:4:r, hy3:movewindow, r, visible
hyprgrass-bind = , swipe:4:l, hy3:movewindow, l, visible
hyprgrass-bind = , swipe:3:d, exec, $menu

```


I definitely do not plan on using my window manager solely with my fingers since that sounds hilarious (or not really, but still), so that's more than enough for me.

Oh yeah, speaking of touchscreen, I used [nwg-drawer](https://github.com/nwg-piotr/nwg-drawer) for my app/power menu (`$menu` above) since it's the most touchscreen friendly standalone solution that I know of.

I can do these:

<div style="text-align: center">
    <video loop controls width="500">
        <source src="/blog/image/hyprland-gestures.mp4" type="video/mp4"/>
    </video>
    <p><i>Touchscreen Controls</i></p>
</div>

(Ignore the keyboard for now, I will talk about that under the next section!)


## On-Screen Keyboard

I found [Squeekboard](https://gitlab.gnome.org/World/Phosh/squeekboard) which is originally written for Phosh, GNOME's mobile environment. It actually worked out-of-the-box, except for the automatic triggers which I had to take care of myself.

Squeekboard follows the rule that it will show up when an input field is focused and the `screen-keyboard-enabled` has its value set to `true` under `org.gnome.desktop.a11y.applications` in the user's dconf configuration schema. The first point is straightforward, but the second one we need to tweak a bit with `gsettings`:

```
gsettings set org.gnome.desktop.a11y.applications screen-keyboard-enabled true
```

With that set and Squeekboard launched, an on-screen keyboard should appear under compatible apps (all GTK+ apps and several others).

Now, I need to set that `dconf` value to `false` when I'm not rotating it to use it like a tablet. This was automatic under `GNOME` but I'm not sure about Hyprland, so I just looked for sources of events.

Apparently, you can use `libinput` to listen to events emitted by the lid switch (you can use `libinput list-devices` to get the event device path):

```
$> sudo libinput debug-events --device /dev/input/event20
-event20  DEVICE_ADDED                Intel HID switches                seat0 default group1  cap:S
 event20  SWITCH_TOGGLE               +0.000s	switch tablet-mode state 1
 event20  SWITCH_TOGGLE               +1.496s	switch tablet-mode state 0
```

Now with a little bit of shell script magic I can write a magic ""daemon"" that toggles the `dconf` configuration value:
```sh
#!/bin/sh
# Tablet mode daemon.
TMPFILE="/tmp/.squeektablet"

if [[ -f "$TMPFILE" ]]
then
	echo "Daemon already running. Remove $TMPFILE to proceed."
	exit 1
fi

cleanup() {
	rm "$TMPFILE"
}

touch "$TMPFILE"
trap cleanup SIGINT SIGABRT

dev="$(libinput list-devices | grep "HID switches" --context 1 | tail -n 1 | awk -F '           ' '{print $2}')"

# If this is being executed the first time then the user must have
# triggered the tablet mode to on.
# May also not be the case, but we don't want
# inefficiencies.
toggle-squeekboard "tablet"

# Sleep to make sure the device is already available
sleep 2s
libinput debug-events --device "$dev" | while read log
do
	echo "$log" >> /tmp/squeekboardd_log
	if echo "$log" | grep "state 1" &>/dev/null
	then
		toggle-squeekboard "tablet"
	elif echo "$log" | grep "state 0" &>/dev/null
	then
		toggle-squeekboard "disable"
	fi
done
```

Where the `toggle-squeekboard` just comes from:

```sh
#!/bin/sh

status="$(gsettings get org.gnome.desktop.a11y.applications screen-keyboard-enabled)"

if [[ $# == 0 ]]
then
	if [[ "$status" == "true" ]]
	then
		gsettings set org.gnome.desktop.a11y.applications screen-keyboard-enabled false
	else
		gsettings set org.gnome.desktop.a11y.applications screen-keyboard-enabled true
	fi
	exit
fi

if [[ "$1" == "tablet" ]]
then
	gsettings set org.gnome.desktop.a11y.applications screen-keyboard-enabled true
else
	gsettings set org.gnome.desktop.a11y.applications screen-keyboard-enabled false
fi
```

The toggling logic in the script, is uhm, weird, but it's fine for me. Definitely customizable if you're willing to copy my approach.

However, I found out that simply launching the daemon does not work well. This is because the input device is not registered before I _actually_ rotate my lid by 360°, as you can see with this kernel message example:
```
[   40.320906] intel-hid INT33D5:00: switch event received, enable switches supports
[   40.321033] input: Intel HID switches as /devices/platform/INT33D5:00/input/input28
```

and only then the input path would actually exist. This meant that I have to start the daemon _after_ the input has been registered. Sounds like a udev rule moment, doesn't it?

```
/etc/udev/rules.d/30-tablet.rules:

ACTION=="add", SUBSYSTEM=="input", ATTRS{name}=="Intel HID switches", RUN+="/usr/bin/user-squeekboard"
```


and lastly, the `user-squeekboard` is a hacky script that switches to my user and executes the actual Squeekboard daemon (because otherwise it would get executed under the root user):

```sh
#!/bin/bash
PATH="/usr/bin" XDG_RUNTIME_DIR=/run/user/1000 su cikitta -c 'hyprctl -i 0 dispatch exec squeekboardd' &> /tmp/.squeekboard_daemon__log
exit $?
```

All those sound really janky and dirty, _but at least it works_ :) Maybe one day I will write a daemon that executes a user-defined command while listening to input device events, that's going to be useful for standalone window managers/compositors.


## (Bonus) Alternative Input Method?

I was trying to set up several input methods that use [IBus](https://github.com/ibus/ibus) and I had set up all the needed environment variables under `/etc/environment`:

```
/etc/environment:

GTK_IM_MODULE=ibus
QT_IM_MODULE=ibus
XMODIFIERS=@im=ibus
```

However, I realized that it broke my Squeekboard instead. Spent hours of debugging just to found out that it was a few lines of variables that's messing up my entire workflow! Ughh... I'm not really sure how to set IBus alongside it, let me know under the comments section if you do know how to! :)

## Is It Perfect?

I haven't encountered any major issues so far. But yeah, touchscreen support is still slightly whacky. For example, I can't even properly double-click to enter a directory in Thunar :P But other than that I don't think anything is hindering me from daily driving it.

# Under The Hood Look

## First Impressions about Wayland

Wayland handles inputs reaaaalllly well[^4]. I am especially impressed with the touchscreen, lid switch, and stylus handling (although I haven't tried those in X11, so this isn't really a comparison). I thought that I have to poke around with configuration files for exotic peripherals, like in X11. Yes, somehow it's the 21st century and I still had to write X11 configurations (notably with my Huion graphics tablet)[^5].

The other thing I really like about Wayland is how it has protocols for specific features of a desktop. Or, honestly, Wayland is just a bunch of protocols anyways. For instance, think the [virtual keyboard protocol](https://wayland.app/protocols/virtual-keyboard-unstable-v1). It is highly specialized on that specific virtual keyboard feature. Then, compositors can adapt and implement it.

On the contrary, X11 is mostly focused on the displaying side of the job and not other desktop environment-supporting features. Some things are kinda hacked together in X11, creating a Frankenstein desktop that consists of programs that work on their own way talking to the display server.

And also, one last thing I'm really impressed about is the fact that I can actually share my screen with [Vencord](https://vencord.dev/) under Hyprland with the helf of its XDG Portal. This is crazy cool.


## Architecture Design

While it is true that Wayland is designed to replace X11[^6], it really is a reinvention of the wheel (just see the [high-level overview of the architecture](https://wayland.freedesktop.org/architecture.html)). As you probably already know, Wayland protocols removes the need for an extra display rendering middleman between applications and the kernel. Wayland allows applications to directly talk to its compositor (analogous to a window manager under X11), as opposed to X11 where applications need to talk to the display server and don't directly communicate with the window manager. Wayland's approach definitely increases performance and maintainability.

With this kind of architecture, each compositor would have to handle many, *many* things on its own: input, multi-monitors, etc. From the user's perspective, this can cause slight annoyance as this means that they have to reconfigure every single compositor they attempt use for even the most basic settings like keyboard layout and input options. I wouldn't say that it's necessarily a major deal breaker, though. After all, it's not like you switch compositor every month, right? _Riiight?_ Having a centralized place to configure everything isn't bad either—it's sort of the kind of thing you expect from big, major operating systems.

## Okay, What's REALLY Wrong With Wayland Then?

In my opinion, there are really two reasons why Wayland is still a problem: lack of adoption and lack of agreement upon protocols and its details. The first one is certainly expected. With lack of support in several areas, Wayland became less usable, so some people are hesitant to use it, which then causes less adoption, and it loops. But more and more people are already doing the shift slowly! At one point it wouldn't be a problem anymore. The last one, however, is really something worth looking at. As Wayland is still a big work in progress, it is still receiving a lot of updates and there has been a lot of disagreements throughout its development. [Here's an instance of a protocol disagreement](https://gitlab.freedesktop.org/wayland/wayland-protocols/-/merge_requests/269). But all these really arose due to the large fragmentation in the Linux desktop, so it's to be expected.


# Final Thoughts
Wayland is finally mature enough for daily use and it's fantastic. Even though its architecture and attempt at replacing the crusty X11 is still a really hot debate, I can see it having a big potential in becoming the next display architecture for modern Linux desktop as it contains native protocols (still work in progress) that support many features a modern desktop would have. I would totally recommend trying out Wayland.


[^1]: https://fedoramagazine.org/whats-new-fedora-25-workstation/
[^2]: https://linuxiac.com/x11-is-no-longer-part-of-fedora-workstation-41/
[^3]: https://www.omgubuntu.co.uk/2021/01/ubuntu-21-04-will-use-wayland-by-default
[^4]: Or, rather, Hyprland. But with the help of Wayland so that gets the credit as well.
[^5]: My Huion is not detected as a Wacom tablet directly which it's compatible with so I have to force it to use the wacom driver.
[^6]: https://wayland.freedesktop.org/faq.html#heading_toc_j_4
