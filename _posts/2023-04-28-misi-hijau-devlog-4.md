---
title: "Misi Hijau: Devlog #4"
tag:
- programming
- art
- gamedev
excerpt: "Almost a month after the last blog update. Crazy, right? I'm kinda losing motivation to do anything though 😞"
---

My last devlog on Misi Hijau was from.. March 31st. Kinda insane.

My game submission deadline was postponed to May 5th, which is awesome. Unfortunately, nothing much changed since my last devlog (kinda because I was focusing on the artwork and game architecture more) and I kinda feel guilty about it.. eer.

Anyways, I'll just go to the changes I made real quick!

# Minor Changes
- Player damage system got implemented
- Statusbar gets more efficient
- Enemies coordinates can now directly be edited from Pyxel's tilemap editor
- New blasts effect when aliens got hit
- Less drag on the player movement

# The New Level System

> This little piece of the game sucks to think about (although I can like just look for an idea on the internet like a normal programmer).

It's super simple, *idiot past me*. Yes, I have figured out the best way on how to manage level progression.

So previously, on every new level, all my sprites and UI components will need to be reinstantiated. It works, but kinda inefficient and unelegant, I suppose.

Why iniefficient? Simply because EVERYTHING is recreated.

Why unelegant? This is more fun to answer!

As this code snippet shows, the game loop handler (`game.py` or `startup.py` on older versions of this game) needs to know the behaviour of EVERY sprite during level restart, new level, etc etc. This is bad because.. you guessed it, abstraction is important!

I have a rule of thumb for this `game.py` file—and that is, it should NOT access ANY sprite/UI component directly. Any `sprites` or `game_ui` import is strictly forbidden. My leveling system broke that rule, so I definitely need to refactor my code.

```python
class Game:
    ...

    def level_scene_setup(self):
        """
        Level scene initialization. Run ONCE in each level.
        """
        level = self.game_handler.levelhandler.get_curr_lvl()

        self.game_handler.game_components.statusbar.clear()
        sprites_collection = self.create_game_sprites(level)

        # As you can see, this game.py needs to know all the sprites that need to some method
        self.init_sprites(sprites_collection)
        self.spr_minerals.spawn()
        self.spr_enemies.spawn()
        self.spr_powerups.spawn()

        self.game_handler.game_components.statusbar.update() 
```

Instead of that, I made all sprites able to access the level handler and let all of them get the current level by itself. They will then need to implement an `init_level` and `restart_level` methods which will be called during the level intialization and restart, respectively. 

```python
class Sprite(ABC):
    ...

    @abstractmethod
    def init_level(self):
        """
        Function to be called on each new level.
        """
    
    @abstractmethod
    def restart_level(self):
        """
        Function to be called after restarting a level.
        """
```

This approach is much more clean—just add a new `init_level` and `restart_level` method on our game's sprites and UI component handler. Then, make 2 new methods respecting to those 2 methods and subscribe to the `LevelRestart` and `LevelNext`. The event handler for `LevelRestart` and `LevelNext` can then call whatever code it needs (including the sprite/UI component initialization, with just one block of code):

```python
class Game:
    ...

    def init_game_handlers(self):
        ...
        self.game_handler.game_components.event_handler.add_handler(events.LevelRestart.name, self.level_restart)
        self.game_handler.game_components.event_handler.add_handler(events.LevelNext.name, self.level_next)

        ...

    def level_restart(self):
        self.game_handler.game_components.game_sprites.restart_level()
        self.game_handler.game_components.game_ui.restart_level()

        self.game_handler.game_components.statusbar.update()

    def level_next(self):
        curr_level = self.game_handler.levelhandler.get_curr_lvl_idx()
        self.game_handler.levelhandler.set_lvl_by_idx(curr_level + 1)

        self.game_handler.game_components.game_sprites.init_level()
        self.game_handler.game_components.game_ui.init_level()

        self.game_handler.game_components.statusbar.update()

```

All you need to restart a game is to trigger the `LevelRestart` event, and `LevelNext` for going to the next level.



# Factory!

My game handler had the responsibility to create sprites and UI components in the older versions of my game:

```python
class Game:
    ...

    def create_ui_components(self) -> dict[str, UIComponent]:
        # We separate stars because it needs to be rendered before anything else
        self.ui_stars = stars.Stars(100, self.game_handler.game_components)

        ui_components: dict[str, UIComponent] = {
            "healthbar": healthbar.HealthBar(self.game_handler.game_components, self.game_handler.levelhandler.curr_level.max_health)
        }
        
        return ui_components

    def create_game_sprites(self, level: Level) -> dict[str, Sprite]:
        # FIXME currently the "temporary" sprites are global. Defintely not good, but it allows
        # the game (this class) to access each individual sprites in a safe way without causing
        # a dependency cycle.

        # ↑ the comment above is caused by the previously crappy leveling system

        self.spr_bullets = bullets.BulletsHandler(level, self.game_handler.game_components, level.bullet_color)
        self.spr_player = player.Player(level, self.game_handler.game_components, level.max_health)
        ...

        sprites_collection: dict[str, Sprite] = {
                # Order matters (the layering)
                "bullets": self.spr_bullets,
                "enemies": self.spr_enemies,
                "player": self.spr_player,
                "blasts": self.spr_blasts,
        }

        return sprites_collection
```

Now that the game loop handler doesn't need to access each individual sprites, I can remove all `sprites` and `game_ui` dependencies from the the file. I can then create a factory that returns a sprites/UI components collection:

```python
class SpritesFactory:
    """
    A sprite factory.
    """
    def __init__(self, game_handler: GameHandler):
        self.game_handler = game_handler

    def create_tilemap_sprites(self) -> dict[str, TilemapBasedSprite]:
        tilemap_sprites: dict[str, TilemapBasedSprite] = {
            "flag": flag.LevelFlag(self.game_handler),
            "minerals": minerals.MineralsHandler(self.game_handler),
            "powerups": powerups.PowerUpHandler(self.game_handler)
        }
        return tilemap_sprites
    
    def create_sprite_handlers(self) -> dict[str, SpriteHandler]:
        ...

    ...
```

# The Long Awaited Storyline!

Without story, my game is definitely nothing more than just messy code which draw pixels to the screen. Well, eh, I have a working intro now (with slide skipping feature!):

<p style="text-align: center;">
    <video loop autoplay width=400px>
    <source src="/blog/image/misi-hijau-rec-4-storyline.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video> 
</p>

Don't mind the crappy transition to the game; I definitely still need to work on that. The text engine was.. kinda challenging (but very fun!) to make. The coolest part is, I used recursion in the algorithm for the first time in this game!

# Opened up My Repo

My GitHub repository for Misi Hijau is now [visible to everybody](https://github.com/DaringCuteSeal/misi-hijau)! Thanks for everybody who supported me in this project so far 💙