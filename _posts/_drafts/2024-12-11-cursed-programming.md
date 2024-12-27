---
title: Crooked But Fearless Programming (Nu Shell)
tag:
- programming

---

I am a shell scripter. In fact, I got into programming because I wanted to rice my Linux desktop. Writing shell scripts is too big of a useful skill not to have.

My first shell, like other people, was [BASH](https://www.gnu.org/software/bash/bash.html). And so I grew with `program 2> /dev/null`, `[[ "$x" -lt "$y" ]]`, `echo "$(<filename)"`, `program | tee out`, and other weird shell syntaxes. They're fine if you're just using them interactively, but programming with those? Sounds hellish. Yet I somehow liked it, it was the first language that I truly fell in love with.

The POSIX `sh` shell syntax is made to be readable and easy to write for day-to-day tasks. For example, if you want to process some input string, you can just call the command directly and any arguments following it: `programname file1 file2`. Much better than `programname(file1, file2)`. Wanna then process the output again? Pipe it to another program.

The problem comes when you try to do some more complicated tasks, or even code with the language. This is also made a lot harder as neither `sh` nor BASH come with many useful built-in commands. Luckily, you can rely on core utilities for that, like `cat`, `sed`, `tee`, `tr`, `uniq`, etc. UNIX is made so that components work on their own independently, yet still confine to some standard that allows them to work together: _everything, and by this I mean EVERYTHING, is string!_

As we know, there is no distinction between `variable=2` and `variable="2"`. There is also no distinction between `[ "abc" == "def" ]` and `[ abc == def ]`. Works fine for most automation tasks, but really, we all know that type-strict languages are 10 times better than their counterpart dynamic languages. Imagine the amount of mistakes you can make with this! You won't even get super meaningful error messages if you called your command with the wrong arguments.

Speaking of argument-processing, to take arguments in a function you just use the special variable `$1` (1st argument), `$2` (2nd argument), and so on. `$@` expands to the whole arguments and quotes them, while `$*` expands to the whole arguments without quotation marks.

```bash
saysomething() {
    echo "$@"
}

```

And you call it like this:

```
$> saysomething "hi" "there" hehe 123
hi there hehe 123
```

WEIIIIRDDD. But I did not know programming, so this was my very first taste of programming.

But of course we know it gets worse, how do you get, say, a list of all files of a directory?

I'd do it like this:

```bash
files="$(ls --quoting-style shell)"
```

Yup what?
