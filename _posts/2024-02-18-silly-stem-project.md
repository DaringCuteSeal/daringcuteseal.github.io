---
title: Silly STEM Project
postdesc: "My team got chosen to join a STEM project competition! What could go wrong..?"
excerpt: "My team got chosen to join a STEM project competition! What could go wrong..?"

tag:
- programming
- arduino
- engineering
- competition


---



![BloomBot Prototype](/blog/image/bloombot.png)


It was my first time poking with an Arduino and electrical components... and it's pretty cool! I will usually get overwhelmed after doing something for too long (like coding, drawing, etc.), but not when I was setting up my Arduino components somehow.

So yeah, my team got chosen to join a STEM project competition on Feb 1st 2024 at another campus of my school. We got chosen because no other teams from my campus actually spent their effort to write a good proposal though. There were like 40 participants from many other campuses of my school in Jakarta, so to be fair, I had low hopes.

The competition's theme was sustainability. We decided to make a "smart" pot powered by Arduino that we call BloomBot, believing that people would be mezmerized by anything that has electrical circuitry on it :P (but not really, none of the winners actually had such thing). We were completely stumped because we got no other good ideas that we could actually execute, so we went with that smart pot thing. 

Our team was actually okay, probably the best team I've ever been in. However, our time management SUCKED. I'm sure our team could've done a better job at this competition if we actually plan ahead of time 😭 I'll tell you about it.

# Making our Proposal 
The first stage of the competition was the early selection stage. Each team would compete with other teams from the _same campus_ by brainstorming project ideas revolving around the sustainability theme. My team had already got stumped at this stage, actually. We got so many ideas but pretty much all of them are not-so-original and doesn't really spark the "WOWWWWW YESSSS AHHH" mutter. And then, in a meeting session, I looked at my tiny plant pot at my room and thought, "Maybe we can just slap some electrical components to it and make the pot 'smart'." My teams liked the idea and we decided to go for it.

We then wrote our proposal in a rush because we only got a few days to finish it (beacuse again, we sucked at managing time). Since my original idea wasn't really about sustainability, we had to improve upon the idea to turn it to a sustainability-focused pot. We went for a urban farming-centric pot.

You can read [our proposal here if you want](https://github.com/DaringCuteSeal/bloombot-src/raw/main/res/PHI%20FUTURE%20FOUNDERS%20-%20PROPOSAL.pdf).

# Execution
![TinkerCad Prototype](/blog/image/tinkercad-bloombot.png)
![Mess](/blog/image/what-is-this-mess.jpg)


We got informed that our team got chosen to join the next stage of the competition at December 1st, 2023. However, they didn't inform when the competition will actually take place, so we just kinda wait and do nothing because it was nearly holiday. I made a circuit prototype over on TinkerCad during the rest of my holiday in January 2024 which gave me an idea on how Arduino works. We planned to use an UNO, but it turns out that one of my team member's dad has like an Arduino starter kit which contains an Arduino Nano, jumper wires, resistors, breadboards, LEDs, and some other small goodies—so we used that kit instead :D

And then, we were finally told that the competition takes place on February 1st. Wow, now we have to make a smart pot in less than a month? Shi-

But let's just say it kinda worked. We had to complete the pot at our school till the evening for a few days and our school janitors kept on asking us to get the hell out of the electronics lab 💀 (<small>I'm kidding. They're nice.</small>)


## The DHT11 Drama
Here's my favorite story of all this:

Our pot uses a DHT11 sensor—it's a cheap temperature and air humidity sensor for embedded devices. However, we were stumped because our sensor keeps outputting 1°C temperature reading along with nonsensical humidity percentage. We have bought a brand new sensor (which was also a pain to configure) when _I CHANGED MY CODE TO ASSUME THAT THE SENSOR IS A DHT22 <small>(another variant of the DHT family)</small> AND IT WORKED_. What a waste of money. But that was funny. Was our sensor a DHT22 in disguise? It is silly accurate though—my aircon and the DHT would tell the same temperature level.

![DHT11](/blog/image/dht11.png)


# Oh no..
However, for my part—coding and circuitry, it didn't go as planned. I am a silly, goofy programmer and I've never coded any proper app in C/C++ before. So.. in a nutshell, my code sucks. And in the day that our team went to compete, my code is still like 80% done and I had to CODE THERE. Aah.

Here's another silly part: when one of the judges <small>(he was scary looking and roasts people 🗿)</small> was talking about a genuine feature of our pot, a bug arose. LITERALLY while I was saying that it's a feature. Like bro, my code straight up bullied me and said "fuck you it's a bug not a feature hahahahahahahaa."

(👎 I wish I was better at programming.)


# The Competition
![Stands](/blog/image/stem-comp-stands.png)
![Our Stand](/blog/image/bloombot-stand.jpg)

The competition starts with an exhibition. Every team from many campuses will set up their stand to show off their project. And then, the judges will visit every stand to score each project. After that, the finalists were announced. We didn't make it—even to just the final :< 💔

We're supposed to watch the finalists present their project, but funnily, we decided to return to our campus early 💀

Oh and the top three winners are (I think) a team who turned bycatch fishes to cookies, a team who made a mototorcycle muffler filter to reduce air pollution, and a team who made a compost bin. Definitely brilliant compared to ours..

# Second Chance?
Our highschool teacher had recently contacted us and asked if we could join yet another competition. So, we may develop this silly pot even further. This time the theme is water management which is slightly better than sustainability, I guess. She will meet us tomorrow and I have to refactor my code now. Lol. Bye!
