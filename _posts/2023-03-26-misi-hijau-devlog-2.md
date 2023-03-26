---
title: "Misi Hijau: Devlog #2"
tag:
- programming
- art
- gamedev

excerpt: "It's that week of your project when things started to work out not as planned."

---

Okay I'm writing this in English because it's painful to explain programming in Indonesian somewhow.

I caught a cold in March 19. It gets worse and I wasn't productive for the last 5 days, so I didn't make a lot of progress 😢

# DEPENDENCIES MANAGEMENT
I had headache this entire week because of my sprites dependency management. This is the first time that I have a really nicely structured project—so nice that I have to be super careful about the dependencies. I never really bothered about this because I was a shell scripter (I wrote [Whow](https://github.com/DaringCuteSeal/whow) in a single file with 1439 lines).

So yeah, circular dependencies. It was fun until I started working on my game sprites. This needs that, that also needs this. The thing is, I abstracted so many Pyxel components so I need to access them through a game collection from my `base.py` wrapper. Like, I can't just do an `if` statement that checks for keyboard input, I have to register them to my keylistener class. It makes everything much cleaner so I won't get overwhelmed—but that is the root of this dependency issues. Sure, my code is clean (good enough for me; but still is a dumbcode), but the imports are not.

![Dependency graph](/blog/image/misi-hijau-2-dependency.png)

# Performance Optimization and Efficiency

Apparently, my game eats about 150 megabytes of RAM and ~0.3 CPU%, while my reference space shooter game eats about 130 megabytes of RAM and ~0.2 CPU%. Not bad, considering that my architecture is like 3 times more complex and has 2.5x more lines of code. I've added a way to only draw sprites when it is within the camera boundary in this update too which is cool.

# Sprite Creation
```python
spr_bullets = bullets.Bullets(self.game_collection.camera)
spr_player = player.Player(self.game_collection, spr_bullets)
spr_enemies = enemy.EnemyGroup(enemy.EnemyType.ENEMY_1, self.game_collection, spr_player, spr_bullets)

self.sprites_collection: dict[str, Sprite] = {
        "bullets": spr_bullets,
        "player": spr_player,
        "enemies": spr_enemies
    }
self.sprites = SpriteGroup(self.sprites_collection, self.game_collection)
```

Super bad. Looks like crap? Look at the arguments I pass. Is it normal?????? Well I'm considering to create a fixed class with fixed sprites slot that initializes everything so I don't need a fricking dictionary to store my sprites.

# The Progress
<p style="text-align: center;">
    <video autoplay loop width=400px>
    <source src="/blog/image/misi-hijau-rec-2.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video> 
</p>



Not much since the last devlog, but here goes the list:
- [ ] Level designs
- [x] Level handling
- [x] Handle enemies
- [x] Statusbar in base.py
- [x] Organize game initialization
- [x] Stars background (unplanned)