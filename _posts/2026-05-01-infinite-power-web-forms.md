---
title: An Attempt for GOOD Web Form DX & UX (EXCELSIOR 2026)
toc: true
tag:
- website
- programming
- html
- web

excerpt: How to unlock infinite power with HTML web forms.
---

# My Last Round of EXCELSIOR

Ah. Another year, another [EXCELSIOR](/blog/excelsior). So, EXCELSIOR is my school's annual competition event. It'll be my last year contributing to the event as part of the committee, so I figured I want to do a big favor of rewriting [our hackish PHP site](/blog/excelsior/#the-website) with SvelteKit (and other modern web libraries). Last year, the tech team (not me, I was in design) deployed a (somewhat disasterous) AI slop site, so let's settle it once and for all with a human-written future-proof website.


# Web Form
The first task that I chose was rewriting the competition registration web form since it's _the_ one thing that needs to be rock stable after deployed. 2 years ago we had some people complaining about form submission failures and we couldn't figure out why, so I decided to focus on this.

But oh, how web form suuucks. I mean, come on. HTML web forms have been here with us since the 90's. I thought they'd be somewhat mature already? But no, web form can still turn into your nightmare.


# A Basic Form

A basic HTML form? Yeah, we're all familiar with them. They're simply form fields enclosed inside a `<form>` element. We can send the form data for submission by sending a request to the server (POST or GET). The data is then handled by whatever backend software is being run by the server.

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

# 1. True Arrays? Objects? Nonexistent!

Let's now talk about competition registration forms, as that's what I'm trying to build for EXCELSIOR. Suppose I'm making a form for a solo competition. I'd require their contact information, maybe a photo of themselves, letter from their school, and a proof of payment. Works like a charm.

But then, what about _team_ competitions where you need to submit information for more than one person? _You'd think that HTML form handles arrays (like I did)? Oh, no it doesn't.[^1]_ As absurd as it sounds, form fields are limited to primitive types, and that's not even including arrays.

Now, here's the strange part: our legacy website actually managed multi-participant information just fine. How did they do that? Well, you can get a little creative with naming. Our legacy site uses an index-based names for the form fields:

```php
function generate_text_field($form_name, ...) {
?>
<div class="form-row">
	<input name="<?= $form_name ?>">
</div>	
<?php
}

// ...
for($f = 1 ; $f <= $members_min ; $f++){
    generate_text_field("name".$f, "Full name of participant #".$f."", "text", false);
    generate_text_field("notelp".$f, "Phone number", "text", false);
    generate_text_field("email".$f, "Email", "email", false);

// ...

```

So later during form processing, we'd just refer to the user input by the field name + its index. But obviously, this is not clean. A slight change in field naming convention can break everything. You can try to mitigate that by using functions to format the fields—but there's still no guarantee that the functions are _really_ used by both frontend code and backend code.

So, how do we make it safer? Obviously, have something type-safe. Have an array of participant objects or something. It'd be nice if we can represent the form data as a JSON object and have the schema be known by both the frontend and the backend. This way, I can have custom object types, arrays, and all the goodies! We can implement this from scratch ourselves by programatically submitting a JSON instead of a form data somehow, but I personally would rather not to. I opted to use [SvelteKit Superforms](https://superforms.rocks) instead, which is a nice SvelteKit form library that does all those for me.

## JSON Form with Superforms

Now, obviously, when we involve some nonstandard way to submit a form, we're talking about sticking some JavaScript to the client page. But I'm fine with that; most people registering for our competition will probably have JavaScript anyway.

With Superforms, I can simply define a form schema like this:

```typescript
// form-schema.ts
export function getParticipantSchema(enforceInstitution: boolean) {
	return z.object({
		name: z.string()...,
		email: z.email()...,
	})
}

export function getFormSchema(enforceInstitution: boolean, minParticipants: number, maxParticipants: number, addExtraQuestion: boolean) {
	return z.object({
		participants: getParticipantSchema(enforceInstitution)...,
		institutionName: enforceInstitution ? z.string()... : z.string()...,
		compSlug: z.string(),
		extraQuestionAnswer: addExtraQuestion ? z.string()... : z.string()...,
		representative: minParticipants > 1 ? z.string()... : z.string()...,
	})
}
```

Notice the conditional statements—we can have a conditional schema! how cool.

And then, we write some backend code that queries the database for the right competition data: 
```typescript
// +page.server.ts
export const load: PageServerLoad = async ({ params }) => {
	const competitionData = await db.query.competitions.findFirst({
		where: eq(competitions.compSlug, params.slug)
	})

	if (competitionData == undefined) {
		return error(404, {
			message: "Competition not found"
		})
	}

    // ...

	form = await superValidate(preFilled, zod4(getFormSchema(competitionData.enforceInstitution, competitionData.membersMin, competitionData.membersMax, competitionData.extraQuestion != null)), { errors: false });

	return { form, ...};
}
```

And lastly, for the frontend, simply bind our form fields to the form values object, like this:
```svelte
<!--+page.svelte-->
{#each $form.participants as participant, i (i)}
    <Input
        type="email"
        name="email"
        placeholder="nama@email.com"
        bind:value={participant.email}
    />
    ...
{/each}
```

Superforms will then handle turning the form into a JSON which the client sends, along with deserializing the data once they're in the server. Oh, and, did I mention form validation too? For both frontend and backend?! I chose [Zod](https://zod.dev) and Superforms did a nice job integrating it. There are other validators you can use with Superforms too, though.

So. Clean. I simply love it.

# 2. File Handling Puzzle

But wait, how about files? We can't just represent a file as a JSON, can we? While that's true, Superforms gets around this by having the file in the form data itself instead of being serialized further.

Now, this is where things got confusing for me. Superforms doesn't have the documentation for how to have files, in an object, in an array. The only official documentation of file uploads [is located here](https://superforms.rocks/concepts/files) where they use a proxy function (`fileProxy`) that connects user file uploads to the input field's `FileList` via `bind:files`. And here's the tricky part that stumped me: `fileProxy` takes a path to the file object, which in my case would be something like `participants[i].fileObject`. I was unsure if string interpolation would work at all there. I tried anyway since that seems faster than digging the source code, and apparently it works fine.

But, still. How do I manage a bunch of file proxies of different file objects together that are inside an array? And that's when I realize that I've forgotten Svelte's very superpower of componentization. Right, I can just stick the `fileProxy` inside a component so it manages the proxy on its own:

```svelte
<script lang="ts">
    // ...
	const proxy = fileProxy(form, `participants[${index}].testfile`);
</script>

<Field.Field>
	<Input
		type="file"
		name="testfile"
		accept="image/png, image/jpeg, image/webp, image/heif"
		bind:files={$proxy}
	/>
</Field.Field>

```

# End Thoughts
Great! We unlocked the ultimate web form experience for both developers and users. But, still, it's absurd that we need to attach a JSON inside a form data and hack our way out to still get file access just to have a clean competition registration form. I really, really wish that HTML would support JSON form natively! (plus with file transport somehow)


[^1]: You can technically name your fields with a "[]" suffix which is commonly used to denote an array. In your browser inspector you might even see your form data coming up as an array. However, in reality, HTML doesn't do anything for you under the hood so it's all up to the backend. PHP, for example, [can parse the form data as an array](https://stackoverflow.com/questions/3314567/how-to-get-a-form-input-array-into-a-php-array). Here's an example of the raw data that one may get with three input fields called "name[]": `name[]=first&name[]=second&name[]=third`. 
