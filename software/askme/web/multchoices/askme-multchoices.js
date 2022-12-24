// Get query strings
const params = new Proxy(new URLSearchParams(window.location.search),{
	  get: (searchParams, prop) => searchParams.get(prop),
});

// Set theme
if(params.theme == "dark")
{
	document.body.style = "background-color: #181A1B; color: white";
}
else
{
	document.body.style = "background-color: white;";
}

// Disable all buttons
function interfaceOff()
{
	checkBtn.disabled = true;
	clearBtn.disabled = true;
}

// Handle file loading
async function loadFile(url)
{
	try {
		const response = await fetch(url);

		if(!response.ok)
		{
			alert("ERROR: Failed to load file, make sure you typed the correct file address.");
			interfaceOff();

		}
		else
		{
			const data = await response.text();
			return data;
		}
	} catch(err) {
		console.log(err);
	}
}

async function parseFile()
{

	fileContent = await loadFile(filepath);

	if(!checkBtn.disabled)
	{
		try {
			file = JSON.parse(fileContent);
		}
		catch(err)
		{
			alert("ERROR: Failed to parse JSON data, make sure your file is a valid JSON file!");
			interfaceOff();
		}
	}
	
	// Set title
	if(!file.title)
	{
		document.title = "AskMe Multiple Choices";
		headerEl.textContent = "AskMe Multiple Choices";
	}
	else
	{
		document.title = file.title;
		headerEl.textContent = file.title;
	}

	// Set description
	if(!file.description)
	{
		descEl.textContent = "An AskMe multiple choices question.";
	}
	else
	{
		descEl.textContent = file.description;
	}

	initInput();


}


// File handling
if(!params.file)
{

	alert("ERROR: No file specified! Specify a file by inputting a file as the query string.");
	interfaceOff();
}
else
{
	filepath = params.file;
}

function appendListTextbox(index)
{
	// <li>
	listChildEl = document.createElement("li");

		// <p>Question label</p>
		questionText = document.createElement("p");
		questionText.className = "question_label";
		questionText.textContent = file.list[index].label;
		listChildEl.appendChild(questionText);

		// <div class="choices"></div>
		choicesDiv = document.createElement("div");
		choicesDiv.className = "choices";
		listChildEl.appendChild(choicesDiv);

		for(let i = 0; i < file.list[index].choice.length; i++)
		{
			// <div></div>
			choiceDivEl = document.createElement("div");
			choicesDiv.appendChild(choiceDivEl);
			
				// <input type= id= name= value=></input>
				inputEl = document.createElement("input");
				inputEl.type = "radio";
				inputEl.id = "q" + index + "_c" + (i+1);
				inputEl.name = "q" + index;
				inputEl.className = "input"
				choiceDivEl.appendChild(inputEl);

				// <label for= >Choice label</label>
				labelEl = document.createElement("label");
				labelEl.htmlFor = "q" + index + "_c" + (i+1);
				labelEl.textContent = file.list[index].choice[i];
				labelEl.className = "label" + " label_q" + index;
				choiceDivEl.appendChild(labelEl);
		}
		
	listEl.appendChild(listChildEl);
}

function initInput()
{
	for(let i = 0; i < file.list.length; i++)
	{
		appendListTextbox(i);
	}

}

// clear list
function resetColor()
{
	for(let i = 0; i < elsToReset.length; i++)
	{
		elsToReset[i].style.color = null;
	}

}
function clear()
{
	checkBtn.disabled = false;

	resetColor();

	for(let i = 0; i < inputEls.length; i++)
	{
		inputEls[i].checked = false;
	}
}

// check answer
function check()
{
	if(checkBtn.textContent == "Check")
	{
		// loop through each question
		for(let i = 0; i < file.list.length; i++)
		{
			choiceEls = document.getElementsByName("q" + i);
			labelEls = document.getElementsByClassName("label_q" + i);
			questionLabelEls = document.getElementsByClassName("question_label");
			hasChoice = false;
			isCorrect = false;

			// loop through each choice on question
			for(let j = 0; j < file.list[i].choice.length; j++)
			{
				if(choiceEls[j].checked)
				{
					hasChoice = true;
					if(file.list[i].correct - 1  == j)
					{
						labelEls[j].style.color = "#48AF5F";
						elsToReset.push(labelEls[j]);

						questionLabelEls[i].style.color = "#48AF5F";
						elsToReset.push(questionLabelEls[j]);

						isCorrect = true;

					}
					else
					{
						labelEls[j].style.color = "red";
						elsToReset.push(labelEls[j]);
					}
				}

			}

			if(!hasChoice)
			{
				
				questionLabelEls[i].style.color = "red";
				
			}

			if(isCorrect)
			{
				questionLabelEls[i].style.color = "#48AF5F";
			}
			else
			{
				questionLabelEls[i].style.color = "red";
			}

			elsToReset.push(questionLabelEls[i]);
			labelEls[file.list[i].correct - 1].style.color = "#48AF5F";
			elsToReset.push(labelEls[file.list[i].correct - 1]);

		}
		checkBtn.textContent = "Edit";

	}	
	else
	{
		resetColor();
		checkBtn.textContent = "Check";
		
	}
		
		

}

parseFile();


listEl = document.getElementById("list");
headerEl = document.getElementById("header");
descEl = document.getElementById("desc");
inputEls = document.getElementsByClassName("input");
elsToReset = new Array;

document.getElementById("clearBtn").addEventListener('click', clear);
document.getElementById("checkBtn").addEventListener('click', check);
