---
title: Excelsior's Oopsies!
toc: true
tag:
- personal
- webdev
- school
---

Ladies and gentlemen, welcome back to our second blog post about [Excelsior](/blog/excelsior). Even though this year's Excelsior is over, we will still be discussing about some errors and other woes of IT division's work throughout this event. As any work being done by humans, there will _always_ be silly and stupid mistakes. And oh boy, I learned a LOT from the work I've done.

Alright, get ready for some mistakes and funny stuff (not sorted or anything):

# Production-Testing

The first thing I tackled after entering the division was the fact that you can't test the site (completely) locally with your own database server running. Yeah, we had to rely on the server's production database. I wrote a quick 'n dirty shell script that just fetches all the SQL schema from the tables and writes them to a specified database server. The script also provides a credentials configuration switcher so you can quickly host the site using the remote database or your own database.

And voila, my first commit!

```git
commit df1b265542510a0687a75242df8e585afbaf25e9
Author: Daringcuteseal <daringcuteseal@gmail.com>
Date:   Thu Aug 1 23:34:13 2024 +0700

    * centralized database credentials for the info & registration pages
    * added testing tools so local databases could be used instead of the production server's
```

Wow, not so atomic. Yeah, besides that whole production-testing, I also cleaned up the database credentials that were scattered all over the place.

A while later, I noticed that you can access the shell script by simply typing the path to it as part of the URL. Whoops, I then blacklisted it by editing the `.htaccess` file at the root of the site.


# The POST Length Limit

A few days after I'm in, competition registrations start to pour in—and we noticed something strange: _the participants' uploaded images do not exist on our server_. We still don't know exactly what the cause of the issue was. What I do know is that initially, it's probably just wacky `name` (on the HTML form fields) mismatch with the backend or other weird processing errors. We eventually fixed that and none of the images disappeared anymore.

However, upon tracking down why the images went kaput, I found out that PHP actually has a [limit on the size of POST payload data](https://php.net/post-max-size) it handles. It is set to 8 megabytes by default—which is far too tiny for our use case, so we increased that to some bigger amount and added a warning shown to people who attempted to upload gigantic files. Unfortunately, we did not previously handle that POST limit error properly nor did it cause significant website issues, so it went undiscovered for a while.


# Forgotten Pushes
One night, I was doing some competition form edits as requested by the archery competition organizer (they had _a looot of requests_). Somehow, I forgot to commit some files which contained important fixes that syncs the backend with the frontend field names—rendering the ticket page broken for **TWO HOURS**! My easily distracted self might have forgotten that I was still on a bug fix duty. That was my most horrible mistake in this project ://

Remember to always check your shell prompt for unstaged files! Or if you don't have a prompt with git status, _well you're kinda insane for that. Get one_.


# Forgetting to Index a Field
It was our "career day", and I was editing Excelsior's codebase during my IT workshop because the thing they were teaching was, uh, AI \*cough cough\*. So I'd rather do real work. My team lead—who was also doing some work was reading the error logs of our competition form page and he pointed out some array access failure. I quickly inspected the codebase, then noticed that a new change we had recently made did not include the proper index as one of the fields' `name` despite how the code was operating on an array.

My day was about to turn grey. I did a git blame on that file, only to realize that _I was the one who screwed it up, damn it_. 

Lesson learned, watch out when you were copying lines of code. Because yeah, I think I copied it from the non-array variant.


# Failing Fetch Requests
Few days before the event actually starts, a bunch of people started to complain about the competition registration form failing to process the sent data. The form processing page (our `/form/processform.php`) straight up fails to load on their side. On the server, loading the page is supposed to insert a new registrant entry to our database table and redirect the user to either a page that displays error information or a page that just says "thank you for the purchase".

The worst part? _It works on our side!_ I tested it out myself multiple times and I just can't reproduce the error. Because we thought that it may have only happened on few coincides, we decided to then make the client send out their form data to the server first, then open an error page or a successful page after receiving the response back.

I wrote the patch for that, but because I was _coding without LSP nor syntax highlighting writing good ol' plain JavaScript_, I screwed up the fix and ended up breaking the page for a while.

The reason for that? I tried to access a variable I declared that had went out of scope TvT

I did something similar to this:

```javascript
// Some code, bla bla
try {
    let post_result = await fetch('/form/processform.php', {
        method: 'POST',
        body: form_data
    });
}
catch (e) {
    // Error processing, bla bla
}

// Things get funny
if (post_result != null && post_result.status == 200)
{
    // Redirection and stuff
}
```

Notice how I tried to use `post_result` outside the scope where it's declared with the `if` statement. Hell, missed TypeScript so much then :/

As a consequence, the user is never redirected to the error/successful page and we had people spamming our database. Truly hilarious, we had Discord webhooks and my laptop won't stop playing that Discord notification noise. We had to redirect people to the "under maintenance" page for a while.

But even after I had fixed that issue, the problem persists. See, the change allows the user to see what went wrong with the form submission. All that we got from them was (differs from browser to browser):

> Failed to process form! Error message: Failed to fetch

FETCH FAILED?? EXCUSE ME? FOR THAT SPECIIFIC PAGE?

Unfortunately, we never completely got rid of that error, so we had to make a Google™ Form for participants who had troubles registering through our site.


## Database Going Offline

It was just another night. I was doing more Excelsior work, until I realized that the admin panel stopped working. I thought that I had messed something up—which is fine, because everything was still done locally. However, it turns out that the competition form page was blank as well. After a bit of investigation, we found that _our database server is dooown_. Because we had no root access whatsoever, we could only pray it would unfuck itself ASAP.

And yeah, it did after a while. Thankfully. Ahahaha.


# Kaboom, Data is Public

I was trying to do some fixes on the competition form page when I found a random page under `/form` that literally prints out the whole registrant database table, minus the images (the links were invalid). WHAT. People won't know about the page because it is not linked anywhere on our public pages, but still, _that's hella dangerous._ Deleted immediately.


# Free Admin Account

Now, this one I did not get to witness myself. Oh, actually, I think that I did see some traces of it from Excelsior's IT e-mail inbox. But anyways, I really gotta include it here because it _will_ make you go _WTF??_

Legend says that last year, anyone can get an admin account and access the admin panel just by giving out your e-mail, then activating it through the mail they sent. THAT'S RIGHT, FREE ADMIN ACCOUNT. The site was public and can be accessed by anyone. I mean, sure, we didn't share the URL to anybody else but that is undeniably still a vulnerability.


# Thoughts

It was such a pleasure to be able to contribute to this project ✨😌 This legacy PHP maintainer is in awe. There is nothing like looking at (a lot of!) people depending on all the funny sets of instructions you orchestrated with your own fingers. Mesmerizing, huh? Making this world a better place just by letting your fingers dance on top of your computer. What a time to be in.

On the last post of Excelsior (last one _this year_), I will be talking about our fabulous closing ceremony!
