---
title: The Event Dubbed Excelsior
toc: true
---

In my [previous blog post](/blog/the-unexpected-interview), I highlighted briefly about my school's yearly competition dubbed Excelsior. I'm gonna discuss about it a little further here, as well as sharing all the wonderful (and _annoying_) experiences I've gotten along the way as one of the tech infrastructure maintainers for the event.

# The Awaited Yearly Event!


<p style="text-align: center">
    <img src="/blog/image/excelsior-globe.png">
</p>

As I mentioned previously, Excelsior is my school's yearly event held for about a week where students from other schools can come along and compete against one another in a variety of academic, arts, and sports competitions. This year, it is held from 5th to 12th of October with the theme _Treasures of the Sea_. I believe that it has been held annually since 2008, judging from the about page of our website.

The event is _bigggg_ and is mostly student-run. There are over **400** students taking part as members of the committee, with about 18 divisions in total.

During the first day (yesterday!), we held an opening ceremony filled with exceptional theatrical, dance, and singing performances. I was _beyond useless that day, haha_. We were given the task to control the slideshows for our opening ceremony, but somebody else in our team had decided to do that, so I guess I (and the other people from the team) was free.

Here's my POV of watching the show from the operator room:

![The Actual Opening Ceremony](/blog/image/excelsior-control-panel.png)

And my glorious nametag with two-letter division name!

![Nametag](/blog/image/excelsior-nametag.jpg)

<small>How dare they misspell my name :(</small>

After that, because I literally have nothing else to do (but still forced to go home at 5 PM), I just decided to chill in the committee room doing absolutely random things :)

The actual competitions will be held from Monday until Friday this week. We will announce the winners for the competitions on Saturday. A singer will also fill the event—it would turn into a concert or some sort of that. I don't really know or like that guess star's songs, though.

Alright, that's just how I'd like to put it. Here's what the [homepage](https://excelsiorahi.com) has to say (translated):
> On this 16th year celebration, EXCELSIOR invites Indonesia's best junior and senior high school students to compete in (my school name)'s competitions. The competitions are divided into four categories: Intelligence (academic competitions), Linguistics (language competitions), Ingenuity (arts competitions), and Strength (sports competitions). In EXCELSIOR 2024, we will all venture and face a diverse range of challenges to develop and sharpen the potentials we have. Ready to venture and face challenges together? Register now!

I had just realized that there are a loooot of repetitive yap words here, aha 😑 And no, I am obviously not the author of that.

What, you don't believe me?

# The Website

I am one of the maintainers of the website above (as of now). I mostly tackle the background jobs, though. The frontend of the site has pretty much been left unchanged since my first day here. Fair enough, it surely does look good already.

Now, you may have known about the whole revelation about the website from my previous blog post. It is written in pure HTML, CSS, JavaScript, and of course—PHP! ***PHP***. That is totally out of my expectation, I thought of _fancy WordPress or React or Svelte or Vue.js or something I don't know_. Ugh my hope turned out to be false[^1]. 😭

<a href="https://excelsiorahi.com">![Excelsior's home page](/blog/image/excelsior-home.png)</a>

But the most fascinating thing is that, all the code of various features are implemented by the IT team themselves years ago. ***THEMSELVES***, by hand. You can still see funny traces of it:

```php
// If ye wanna use it again, login to ur own account then change the token, the trial only lasts for 2 weeks afaik
$qr = "https://api.qr-code-generator.com/v1/create?access-token=GWND_iFIiZBthFVUojrmGG7p_oMx7K3TcXbjvNYgjnPblbljkVNJ_uHDd-5YiAnB";
```

Silly to read. They didn't literally write that, though—it's more of a rough translation.

The codebase is very, very insane for what I thought about my school at first (oops). However, even though things are smart and okay, the overall structuring is still admittedly messy. It's capable of doing what it's intended to do:

```markdown
(README.md)

# Excelsior Website

This repository hosts the files for excelsior's website.

The website **must** achieve several things:
- To provide a brief introduction to what Excelsior is.
- To provide information regarding events and competitions being held.
- To provide an inlet for participants to sign up for the events and competitions and acquire the necessary tickets.
- To provide a system for the excelsior committee to manage and verify registered tickets and participants.
Beyond these main goals, anything else may be considered an aesthetic choice.
```


..but I won't say it's powerful and adaptable enough for long-term use.

Still, too sad that I do not really know the origin of this site or the original authors, they're really web developer cracks.

I think the words from the current IT division coordinator sum all the feelings well:

> _[..] this thing just dropped out of the sky unto my doorstep and it says it has existed since 3 years ago._
> —[the coordinator](https://github.com/sbxte)


# The IT Division

How did I get here? It still baffles me. I didn't think of this seriously at all—I'm sure that I filled the committee registration form while giggling, not knowing this would be a big life turning point. Then I just got this amazing opportunity. I'm so beyond grateful. I was just this random unknown ""programmer"" with 0 experience on working with production ready app—suddenly having to carry some of tasks of the IT division of my big as heck school event. 

Anyways, I'm the only 10th grade student in this whole team! :3 There were 4 official members of the team. Then, another person came over and their name got written in the official list (somehow). So now, there's 5 of us! Our tasks as part of the committee are related to maintaining both the public and the administrative panel website along with some miscellanous IT-related tasks. I don't do the miscellanous ones, aha. Who would bother giving those tasks to an obscure and unknown 10th grade student?

Being obscure sucks, but at least I work close with the coordinator himself. Proud to say that I've made over 100 commits for the past few months. Not a lot per se, but that's still over 30% of the whole history now.


# Infrastructure Overview

Excelsior's website is the main entry point for users to interact and communicate with us (the committee/school) before and during the event is being held. It is hosted with [Rumahweb](https://www.rumahweb.com/) with their unlimited hosting plan. It is not a virtual private server, so control is quite minimal—there's no root access. But we do get all we need, even our very own database server (with [MariaDB](https://mariadb.com)) and mail server. *Almost perfect (we'll talk about that on my next post)*.

The cPanel deployment provides a bargain of useful tools and utilities, including an integrated Git repository manager that we use to manage our website. So to update the site, we can simply push our commits to there. The source code is also at our GitHub and branches for feature additions/changes can be created there and merged to the server's master branch anytime.

![Git Repo](/blog/image/excelsior-onefetch.png)

8 months ago?! **Fun fact**: the usage of Git to track the website's source code is not new. I've been told that the previous IT teams did not use Git to track their contents—and so at the start of this year, our current IT team had to clean up the mess that the codebase was. I really can't imagine not using Git for things like this.

# Tour The Site Infrastructure with Me!

## The Main Site
The homepage is really just a normal ~~index.html~~ _sorry_, I mean `index.php` file. It is made from a template, but adjusted to match our needs.

![Homepage](/blog/image/excelsior-site-home.png)

Even though it is served as a PHP file, there is little to no actual PHP logic here. Most of them are just used for comments because `<?php // comment ?>` is much cleaner than using `<!-- -->`.

Here's an example of us struggling to do frontend work:
```php
<?php 
# The only reason this thing is inside a <p> block is because the title is too long to fit in a single line. 
# Try removing the <p> block and assigning the class to the <a> block to see yourself what happens otherwise 
?>
<a href="form/index.php?lombaID=soc">
    <p class="main-stroked-button">Society (Social, Science, Math, English) SMP</p>
</a>
```


Ah, right, now you notice the `form/index.php`? We'll get straight there, then.

## The Competition Registration
Ooh, this is the one of the first things I tackled when I started contributing to the codebase.

![Competition Registration](/blog/image/excelsior-site-compreg.png)

<small>And no, the site is not in English—I translated that one in particular by hand.</small>


You see, competitions have similarities with the kind of informations that we need to gather. They _should_ share some if not all form fields (full name, email, and so on), with the exception that we need to know which competition the user is registering for. We can simply create a backend logic that creates and presents a registration form to the user based on what they're registering for. That's what the `lombaID` (means "*competitionID*") URL parameter is for.

We store the configuration for each competitions in our database. The form backend would then query the necessary field infos based on the given `lombaID` URL parameter.

![CompReg](/blog/image/excelsior-compreg.png)


```php
<?php
    if (!$is_solo) {
    // Team competition
?>
    <!-- SECTION 1 -->
    <h4></h4>
    <section>
        <?php 
            generate_text_field(...)
            generate_text_field(...)
            
            // TODO: Do not hardcode this 
            if ($comp_ID == "arm" || $comp_ID == "art") {
                generate_text_field(...)
                generate_select_field(...)
            } else {
                generate_text_field(...)
            }
            if ($is_strict_members) {
                generate_number_field(...)
            } else {
                generate_number_field(...)
            }
            generate_text_field(...)
            generate_text_field(...)
            generate_cp_info();
        ?>
    </section>
    ...
```

Oh and those `if`s? Right, this pattern doesn't always apply to all competitions.

The sad truth is that exceptions will always exist no matter where you go. You may need extra form fields for specific competitions—or, say, tweaking them. This is what happened in our case with Archery competitions. The committee _kept_ on asking us to add more and more fields and other logics that increase the complexity of the form page. Sooo annoying! This actually tripped me out eventually, as I did some fatal mistake with the naming of the form field.

Now, a really great way around this is to make the form fields specific to each competitions—essentially reimplementing Google Forms, but with better integration with the rest of our backend. This would require more logic though, but with the correct formula, we should be able to have a system where the competition admins can manage the form fields themselves—in contrast to what we do here, where only IT people having access to the database can edit the form fields.

I have a proposal already, [heck even a database schema for that](https://drawsql.app/teams/daringcuteseal/diagrams/ekselsior-lomao-ze-painful-reimplementation-of-a-codebase-that-will-be-rewritten-anyways). But we are still unsure about future rewrite plans.

## Ticketing

Our last major frontend is the closing ceremony ticket form. It's nothing too crazy—just a normal ticket purchase form for those who'd like to join the closing ceremony.

![Ticketing](/blog/image/excelsior-ticketing.png)

The logic is even easier, as this time, there is no need to handle multiple cases.

Oh, I was almost happy until I got tasked to create forms specifically for middle school students and elementary school students from my same school. They will get discount for the ticket purchases by providing their school e-mail. But for this, I only added an extra table column on the database table. The rest of the stuff belongs to the backend world.

# The Admin Panel

We have an ADMIN PANEL. That's kinda rad, I totally gasped in wonder knowing this for the first time.

How does it look like? Well..

![Admin login](/blog/image/excelsior-adminlogin.png)

Interesting, those look like missing symbols being replaced with placeholder icons. I never bothered to fix them, aha.

Okay, I know you don't care about the login page. So I will just show you what it's like inside.

![Admin page](/blog/image/excelsior-admin.png)

![Admin page 2](/blog/image/excelsior-admin2.png)

It's just a collection of user-friendly representations of the database tables we have. _User-friendly_, dare I'd say? These don't even have pagination. That's right, the whole table gets rendered in one go without any pages. But we figured that it's not a big deal, so we left it like that. May get worked on next year.

## The QR Code Scanner

But the coolest part of the admin page is the QR code scanner because it is _very epic_ 🔥 Okay, no, that's because I wrote most of it. Last year, they used an Android app (they were _very serious about this-_) to scan the QR codes, but we figured out that combining everything into one admin panel would be more convenient and be a quality-of-life improvement.

The attendees will receive mails after their purchases have been confirmed. The mails are sent using PHPMailer:

![QR code mail](/blog/image/excelsior-ticket-mail.png)

During the closing ceremony, people would have to exchange their proof of purchase with actual physical tickets. The way they'd do this, is apparently by showing their unique QR code that contains a unique token generated during their ticket purchase. The token can then be used to query the database table and confirm the ticket validity. How? I have no idea—the IT coordinator just told me to put as much information about the ticket entry as I could, so I did just that.


The ticketing division should be able to use the QR code scanner like so:

![QR Code Scanner](/blog/image/excelsior-qrcode.png)

<small>Shh, it's not perfectly centered yeah. Already 2024 and I still can't center a div -_-</small>

This hasn't been put to real test yet, so we'll see how it goes on Saturday. Can't wait, aha.

# Some Oopsies!

Well, I didn't do too bad, actually—considering the fact that I have literally _never_ used Git for collaboration properly. I'm surprised I didn't (..or haven't?) mess up the commit history, aha.

Now, there are some interesting problematic cases I found here which I am going to discuss further in a separate blog post. Those include:

- _Testing_ with _production_
- Me forgetting to stage, commit, and push my code change to the remote server
- Forgetting to index a competition form field properly
- POST request size exceeding PHP's set limit, possibly causing form submissions to fail
- `fetch` requests mysteriously failing
- Silly admin account management
- Database suddenly going offline
- ...

Again, don't forget to watch your RSS reader :3

# My Thoughts about PHP, BTW

- It's good and feels more than just a preprocessor.
- No type checking is hell, though.
- Feels as dirty as BASH, as weirdly object-oriented as Python, as curly bracketed as C, and as web-oriented as JavaScript.



[^1]: "PHP" is an acronym meaning _giver of false hope_ in Indonesian (think romantic relationships).
