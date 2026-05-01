---
title: An Attempt for GOOD Web Form DX & UX (EXCELSIOR 2026)
tag:
- website
- programming
- html
- web

excerpt: Web form suuucks. Just the feel of web development already sucks, but I thought that we've solved our web-building problems by having modern web frameworks and modern protocols. Turns out, I was horribly wrong.
---

Web form suuucks. Just the feel of web development already sucks, but I thought that we've solved our web-building problems by having modern web frameworks and modern protocols. Turns out, I was horribly wrong.

And, honestly, having web frameworks and needing like 10 different abstraction layers just to have a functional modern website with a good DX is a proof that there is something so fundamentally wrong with how websites work nowadays. Oh, wait, no.. this is a proof that there is something so fundamentally wrong _with the fact that websites even do what they do nowadays_: we're shoving full-blown applications in our poor HTML renderers even though web technologies weren't really built for them.

But.. today, I'm ranting about something that should've been something thought about all those years ago, during the early development of web technologies: web form.

# A Basic Form

A basic HTML form? Yeah, we're all familiar with them. They're basically form fields that are enclosed inside a `<form>` element. We can send the form data for submission by sending a request to the server (POST or GET). The data is then handled by whatever backend software is being run by the server.

```html
<form action="" method="get" class="form-example">
  <div class="form-example">
    <label for="name">Enter your name: </label>
    <input type="text" name="name" id="name" required />
  </div>
  <div class="form-example">
    <label for="email">Enter your email: </label>
    <input type="email" name="email" id="email" required />
  </div>
  <div class="form-example">
    <input type="submit" value="Subscribe!" />
  </div>
</form>

```

Above is an example of [a web form from MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form).

There's nothing wrong with it. Or, at least, that's the case for most simple forms.

# Competition Registration Forms

Let's now talk about competition registration forms, as that's what I'm trying to build for [EXCELSIOR](/blog/excelsior/) (my school's annual competition event). Suppose I'm making a form for a solo competition. I'll require their contact information, maybe a photo of themselves, letter from their school, and a proof of payment. Works like a charm.

But then, what about _team_ competitions where you need to submit information for more than one person? _You'd think that HTML form handles arrays (like I did)? Oh, no it doesn't._

As absurd as it sounds, form fields are limited to primitive types, and that's not even including arrays.

Now, here's the strange part: our legacy website actually managed multi-participant information just fine. How did they do that? Well, as it turns out, you can get a little creative with your backend. When you have multiple fields of the same name, HTML posts the field values multiple times, and you can have your backend parse the data as an array. Our legacy site used PHP which handled arrays just fine.

