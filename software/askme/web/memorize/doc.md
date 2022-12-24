# AskMe Web (Memorize)
Memorize stuff like words from other languages, terms, etc. quickly.

## Features
- Nicely embeddable to other webpages
- Light... although my code is still messy but it's overall light because it doesn't have a lot of visual effects.
- Input and dropdown mode.

## Query Strings
### file=url
Use `file=<path to file>` to load a JSON file. Only supports files from the internet. Example: https://daringcuteseal.xyz/software/askme/web/memorize?file=try.json

### dropdown=1|0
`dropdown=1` will enable dropdown [mode](#Modes).

### theme=dark|light
`dark` forces a dark theme, any other values beside dark will force a light theme. If not set, a light theme is used by default.

## Modes
### Input
Input mode allows user to input their answers manually.

![input mode](img/input.png)

### Dropdown
Dropdown mode allows user to choose an answer from a dropdown.

![dropdown mode](img/dropdown.png)


## Writing Files
Generally, AskMe Web memorize file should look like this:

```json
{
	"title": "AskMe Memorize",
	"description": "AskMe memorize demo question.",
	"list":
	[
		["Key one", "value one"],
		["Key two", "value two"],
		["Key three", "value three"],
		["Key four", "value four"],
		["Key five", "value five"]
	]

}
```

### Variables
Variables available are:
- title: your question title (string)
- list: a 2-dimensional array with the first element containing the key and the second element containing the value

And some optional variables are:
- description: a subtitle to show below the title
