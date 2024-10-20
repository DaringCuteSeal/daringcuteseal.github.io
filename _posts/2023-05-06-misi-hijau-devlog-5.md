---
title: "Misi Hijau: Devlog #5"
tag:
- programming
- art
- gamedev
excerpt: "I finished Misi Hijau; I'M FREE FROM THIS CURSE!!!"
---

This week I glued different parts of my game together, and prepared for my game submission.

[Check my final game here!](https://daringcuteseal.xyz/software/misi-hijau/)

# Progress Bars
![Progress bars](/blog/image/misi-hijau-5-progress-bars.png)

Super fun piece to implement (I like geometry math and logic now).

Check this out:

```python
class ProgressStatusbarItem:
    ...
    def _recalculate_text_coords(self):
        if self.text_over_bar:
            self.text_x = self.bar_x + (self.bar_width - len(self.text_over_bar * pyxel.FONT_WIDTH)) // 2
            self.text_y = self.bar_y + (self.bar_height - pyxel.FONT_HEIGHT) // 2

    def _recalculate_bar_coords(self):
        if self.icon: # as you can see, the icon is an optional addition
            self.height = max(self.icon.h, self.bar_height)
            self.bar_y = self.y + (self.icon.h - self.bar_height) // 2
            self.bar_x = self.x + self.icon.w + self.icon_gap
        else:
            self.height = self.bar_height
            self.bar_y = self.y
            self.bar_x = self.x
    ...
```

I still had the `GameStatusbar` class in `components.py`, but I modified it to allow 2 types of statusbar item: the text statusbar item and this progressbar item.

# Game Dialog
![Alt text](/blog/image/misi-hijau-5-dialog.png)

Another fun to implement component, but it's pretty much the second most buggy thing in this game (the first one being my blinking hint text). I left out some important parts of the dialog, like a proper middle-alignment for the text and a blinking "close dialog" text. But I'm fine with it since the dialog only show up (at least) 3 times in my game.

# Squidge

![Squidge](/blog/image/misi-hijau-5-squidge2.png)

> THE PINK RETARDS
>
> I CANT MELEE THEM 
>
> THEY CAN PISS ON ME THOUGH
>
> — [Eason](https://ezntek.com) 2023

So uh, I rushed Squidge's (my fav alien in this game btw) behaviour in like 15 minutes. They shoot "bullets" (idea from same person I mentioned before too) like so:

![Squidge being shot](/blog/image/misi-hijau-5-squidge.png)

<!-- future editors: i am aware that this should have been "trigonometric functions" and not whatever this thing below is. -->
I had to use some weird trigonometry functions to get x and y components for my squidge's bullet movement, which was very fun to write:

```python
dx = x_enemy - x_player
dy = y_enemy - y_player
angle_rad = pyxel.atan2(dy, dx) # get angle
# calculate the x and y components of the angle
x_component = pyxel.cos(angle_rad)
y_component = pyxel.sin(angle_rad)
self.append_bullet(x_enemy, y_enemy, pyxel.COLOR_YELLOW, y_component, x_component, 2, 2, True)
```

<sub>thanku chatgpt</sub>

However, the overall implementation was so bad—I had like 3 different event handlers on different sprites just to handle Squidge's bullets.

# Video Editing
I began editing my video at like 10 PM 💀 Oh and yes, I was supposed to submit a video about my game, not the game file itself.

I only need to show these things:
- My game script
- My gameplay
- Pic of me coding 🙄

I recorded my gameplay while praying there won't be any bugs anymore, and slammed it into Blender—only to realize I forgot to show my game script. And so, I quickly just showed a tour of my project, while explaining a bit of my game architecture in Vim 🤡 I planned to talk in video while flexing my cool programming vocabulary but I didn't because I don't want to waste my time suppressing static noise in my audio and doing that kind of thing.

# Final Words

Game development isn't really my cup of my tea, but I learned a bunch of new things from this game jam! This is the first game I consistently developed in 2 months, and I still couldn't believe I made it till the end.

I have a really bad feeling about my submission after looking at my friend's submission which looks way better. Hopefully using Python is a plus point (can't wait to write games in Rust or something).

Yay, maybe I can call myself a *real* programmer now.
