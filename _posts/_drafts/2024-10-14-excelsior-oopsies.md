---
title: Excelsior's Oopsies!
toc: true
tag:
- personal
- webdev
- school
---

Ladies and gentlemen, welcome back to our second blog post about [Excelsior](/blog/excelsior). This time, we will be discussing about some errors and other woes of IT division's work throughout this event. As any work being done by humans, there will _always_ be silly and stupid mistakes. And oh boy, I learned a LOT from the work I've done.

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

A while later, I noticed that you can access the shell script by simply typing the path to it as part of the URL. Whoops, I then blacklisted it.


## The POST Length Limit

A few days after I'm in, competition registrations start to pour in—and we noticed something strange: _the participants' uploaded images do not exist on our server_. I legitimately still don't know what caused that, but for the initial ones, it's probably just wacky id on the HTML form field or weird processing errors.

Upon tracking down why the images disappeared, I found out that PHP actually has a [limit on the size of POST payload data](https://php.net/post-max-size) it handles. It is set to 8 megabytes by default—which is far too tiny for our use case, so we increased that to some bigger amount.

Unfortunately, we did not handle that POST limit error properly nor did it cause significant website issue, so it went undiscovered for a while.


## Untracked Files
d02bbc7

## Failing Fetch Requests

### Out of Scope


## Forgetting Indexing

## The Admin Accounts

## Database Going Offline




