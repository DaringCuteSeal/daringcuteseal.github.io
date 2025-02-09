---
title: The C++ An Hour and Half Mistake
excerpt: Type casting gone wrong, during a competition!
tag:
- programming
- C
- C++
- competition
---

Yesterday evening, I was in a programming competition. It was problem solving-styled though, while software engineering is usually more of my cup of tea. But anyway, we were a team of three and we were trying to solve 8 questions.

I quickly scrolled through each of the questions. I saw a decimal-to-binary base conversion question which I thought would be easy, so I gave it a shot. Well, it was only theoretically easy.

It was my end's fault: I did not understand the second task of the question before starting to write the code. The second task was actually to count the longest repeating 1's or 0's for each of the test cases. They didn't explicitly say "the longest", though, so it baffled me for a while. I dismissed that part and proceeded to write the base conversion first.

I tried doing the calculation inside my recursive function, but it was a bit confusing, so I decided to opt for a string-generating function instead. Let's say that I ended up having a function similar to this:

```cpp
string convert_number(int number) {
	int n = number;
	string s;
	int num_pow = floor(log2(number));
	for (int i = num_pow; i >= 0; i--) {
        int pw = pow(2, i);
		int digit = n / pw;
		s.push_back(char(digit));
		n -= digit * pw;
	}
	return s;
};
```

Now, there's a part I had to look up online: how to turn a single digit of number into an ASCII character. I quickly skimmed a guide and read about `static_cast<char>(x)` and `char(x)` which I thought was plausible.

And so I did that, only to get even more baffled because the string I was returning was _literally empty_. Or at least, I thought it was empty.

_Don't laugh at me._ Yeah, that conversion literally translates the integer into the corresponding ASCII character based on the code. So the 0's and 1's turn into `NUL`s and `SOH`s, respectively. But I was really in panic mode, so I didn't notice that until like 30 minutes before the _whole_ competition ends (we had 2 and a half hour). I should've added an offset to the resulting character (i.e `'0' + x`) to get the proper ASCII character.

_Lesson learned: read an article with my eyes wide open even when I'm under pressure. Saves so much time and headache._


# My Misfortune Doesn't End..
After that one question, I looked for another good question. I grabbed a seemingly mind-boggling but short one. It's usually better for me since I get easily overwhelmed with long questions.

This is roughly the question (with the story stripped away):

> Given an `N` x `N` map matrix containing either 1 or 0 for each of the cells—where 1 represents land and 0 represents sea, determine the amount of islands that exist and the area of the largest island. Vertically and horizontally continuous 1's are counted as one island.
>
> Example:
>
> N = 5
>
> 1 0 0 0 1
>
> 0 1 1 1 0
>
> 0 1 1 0 0
>
> 1 0 0 0 0
>
> 0 0 0 0 0
>
> Answer: 4 islands and the largest area is 5.

Now for this one, I felt enlightened as if I ascended to some miraculous place and was told the answer by The Divine themself. Jokes aside, this is actually dead simple, so okay. Just travel the map while taking note of which cells have been visited and the size of an island when we found a land. But let me tell you, recursion is one of my weakest areas of programming, yet my hypothetical recursive algorithm from my imagination actually worked after just one try of implementation..

..plus one or two tries of debugging. Which took around 15 minutes. And, guess what, the code was complete 13 minutes _after_ the competition had ended.

```cpp
int check_tile(int w, int h, vector<vector<int>> &map, vector<vector<bool>> &travelled_list, int x, int y) {
    // beyond the edges
	if (x > w - 1 || x < 0 || y > h - 1 || y < 0) {
		return 0;
	}

    // travelled already
	if (travelled_list[x][y] == true) {
		return 0;
	}

    // no island
	if (map[x][y] == 0) {
		travelled_list[x][y] = true;
		return 0;
	} else {
        // there's an island
		travelled_list[x][y] = true;

        // size of a particular island is the size of the tile itself (1) plus the size of the island nearby.
		return 1 +
        check_tile(w, h, map, travelled_list, x - 1, y) +
        check_tile(w, h, map, travelled_list, x + 1, y) +
        check_tile(w, h, map, travelled_list, x, y - 1) +
        check_tile(w, h, map, travelled_list, x, y + 1);
	}

}

void solve(vector<vector<int>> map) {
    ...
	for (int i = 0; i < h; i++) {
		for (int j = 0; j < w; j++) {
			int area = check_tile(w, h, map, travelled_list, i, j);
			if (area > 0) {
				islands += 1;
				largest = std::max(largest, area);
			}
		}
	}
	cout << largest << " " << islands << "\n";
}
```

..goodbye I am so not getting into the finals. Answering only two questions out of eight and only submitting one? That's stupid!

**So in conclusion: humans can get pretty stupid under pressure. But also brilliant sometimes. You're very lucky when the latter happens to you. The first one is rare. Experiencing both at the same time is even more rare but still sucks.**


# Wait, You're With Your Team, Though?
Admittedly, they're not _that_ good at programming. They barely helped with anything meaningful yesterday. I still appreciate their efforts, though. It was still fun anyways :P However, I did not really enjoy the teamwork (there's nearly none anyways for yesterday[^1] in particular). Why are good or even decent programmers so rare yet so common?


[^1]: The competition was held in two days. During the first one they helped me, but I'm discussing the second day here.
