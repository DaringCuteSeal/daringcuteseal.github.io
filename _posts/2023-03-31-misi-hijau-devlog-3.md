---
title: "Misi Hijau: Devlog #3"
tag:
- programming
- art
- gamedev

excerpt: "Introducing: event handling!! - Fixing my biggest mistake in making Misi Hijau"

---

School has started again for me, so I got less time to work on this game. Plus, I have to prepare for a student exchange program (I always get the job to edit videos 💀👎). I really need to rush this game, or else: I'll enjoy suffering being called a baby after rushing a [Scratch](https://scratch.mit.edu) game. But anyways, I made a huge improvement to my game architecture this week—and it's all about under-the-hood improvements.

# Event System: An Approach for Decoupling my Code

I never had a clear architecture design for my game since the beginning. It's just, "write good code and refactor when needed"—which is a fatal mistake. I built my game without level handling in mind. The first thing I worked on was the actual game logic, so my codebase is kind of very dependent on each other. 

My sprites used to depend on a GameStateManager (kind of like a handler for my game components) and bunch of other sprites. That made my sprites very tightly coupled to one another—which makes my codebase less modular and readable. I tried to create a system where the sprites can access each other's function and variables, but that just ends up in a circular dependency no matter how hard I try. I was about to give up when I found one approach to code decoupling: crafting an event system!

For a few hours, I tried to browse and learn about [tHe oBserVer PatTern](https://en.wikipedia.org/wiki/Observer_pattern) which was confusing as hell! Like, I just can't grasp anything. Maybe I was a little burnt out, but yeah, I was so desperate to fix my codebase. And I was scared that I'm gonna mess my code and restart my commit again. At least I have git, haha.

But I was like, *"you know what? Screw all this, let me just copy and paste this code."* And then, I tried to glue it properly to my game. **Suddenly, out of nowhere, an idea about how it might work pops into my mind**: when an event is triggered, an event handler will call all the functions that has been added to a list (a.k.a subscribed functions). THAT'S IT! IT'S THAT SIMPLE, APPARENTLY...

# ↑ Not the End: Level Handling Still Sucks
Ok I wasn't done yet. Apparently, I have another problem: I store my game progress to the game handler instead of storing appropriate values on the corresponding sprites. Bad idea. I thought this is gonna be another confusing redesign, but no, stricting the sprites to only access level data from given argument is good enough (for now, I think).

# But can I Peacefully work on it?
No,

Prolly not,

I don't have a clear picture of the level handling—

This little piece of the game sucks to think about (although I can like just look for an idea on the internet like a normal programmer).