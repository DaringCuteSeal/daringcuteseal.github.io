---
title: "Blender's EEVEE is Better than I Thought"
tag:
- art
- animation
- blender

excerpt: "'It'll be Alright' is yet the craziest animation I've ever made! Insane render time forced me to use EEVEE and I found out it's actually better than I thought..."
---

![solid and rendered](/blog/image/itll-be-alright.gif)


So, this semester, I had to create a short animation for my animation extracurricular. My teacher prompted for a simple 2D animation, which is what we've been learning all this time. It's just easier to teach and isn't time-consuming. However, I asked if I can make a 3D animation and apparently, my teacher didn't mind! It took me 3 months to make [this dumb 31 second animation](https://youtu.be/VDJWoM5AC4o). But hey, I learned a lot! This is the first animation that actually looks natural to me.

# The Start
I actually made Narwhump and Zack (my lion and bird character in the animation, respectively) for another project, but that has been abandoned so why not use him for this animation. They're inspired by my 2 of my

I made the animation storyboard in my first animation class this year. The storyline is inspired by my personal struggle with working on a task, ahah. Honestly, I doubt that I can even animate a complex scene, so I made much simpler movements to make my life easier.

![storyboard](/blog/image/itll-be-alright-storyboard.png)

Then, I made my models. I focused on Narwhump overall; he was a really good model with nice topology. I only made Zack (my bird character) in like 2 days or so 🙂

# Animating
I didn't record any reference video—which no one should do, lol. However, this time, I had an odd hunch that allowed me to animate with a more natural movement. Just take a look at some of my old animations ([this animation](https://www.youtube.com/watch?v=FBKse0PB8lY) and [this too](https://www.youtube.com/watch?v=OZB-OSyWpg8)) and compare it with this one. Huge improvements!

![slam animation](/blog/image/slam.gif)

# The Rendering Problem
After I'm done with the shots, it's finally time for the most painful part in crafting an animation: rendering!

I originally planned to render this animation with Cycles (Blender's ray-tracing render engine). However, it takes like 15 minutes to get just one frame. There are 780 frames in this animation—that would take an entire week to render!

Actually, I can probably lower the render time by using OptiX instead of CUDA, but using OptiX leaves a weird glitch in my final render:

![render glitch](/blog/image/itll-be-alright-render-glitch.png)

This could be a driver problem, so I tried to render the frame on Windoze instead. Problem is: Blender screamed "I ran out of RAM!" 👏

*Well fsck you Windoze. Ilysm Arch.* Okay, any other solution?

I went to Blender's site again to... I forgot why, maybe I was looking for some resources. But I did. And I watched [CHARGE](https://youtu.be/UXqq0ZvbOnk) which is displayed on Blender's homepage to charge my inspiration. And I was so surprised when I found out that it is rendered with EEVEE, Blender's realtime render engine!

After some thought, I switched my render engine to EEVEE. I tried everything I could to make the scene look good—surface reflections, refractions, contact shadow, and cubemaps. All that combined turned my scene to look quite realistic, comparable to Cycles. Just one thing that's not comparable: hair. My EEVEE hair material looks bad. But okay, I'd trade that for a more sensical render time.

![bad hair](/blog/image/itll-be-alright-hair.png)

Then, I rendered everything in a day! However, I noticed so many damn mistakes, and so I re-rendered everything 💩 the second one is better, although there were still some mistakes.

And finally, after some **62** days, I finally finished my animation. Kinda satisfied, but I still need more practice 🔥

# Thanks
* [BlenderKit](https://www.blenderkit.com) for interior asset
* [SeF on Sketchfab](https://sketchfab.com/_SeF_) for the [notebook model](https://skfb.ly/6WLYD)
* [Pixabay](https://pixabay.com/) and [Canva](https://canva.com) for SFX
* [Eason](https://ezntek.github.io/) for voicing Zack
