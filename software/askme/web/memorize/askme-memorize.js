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
		document.title = "AskMe Memorize";
		headerEl.textContent = "AskMe Memorize";
	}
	else
	{
		document.title = file.title;
		headerEl.textContent = file.title;
	}

	// Set description
	if(!file.description)
	{
		descEl.textContent = "AskMe memorizer"
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

function dropdownMenu()
{

	dropdownEl = document.createElement("select");

	for(let i = 0; i < dropdownOrder.length; i++)
	{
		optionEl = document.createElement("option");
		optionEl.textContent = dropdownOrder[i][1];
		optionEl.value = dropdownOrder[i][1];
		dropdownEl.appendChild(optionEl);
	}
	return dropdownEl;
}

function appendListTextbox(key)
{
	listChildEl = document.createElement("li");
	listChildEl.textContent = key;

	inputEl = document.createElement("input");
	inputEl.className = "input";

	listEl.appendChild(listChildEl);
	listEl.appendChild(inputEl);
}

function initInput()
{
	if(params.dropdown == 1)
	{
		// Shuffle dropdown order
		dropdownOrder = file.list.slice();
		for(let i = dropdownOrder.length - 2; i > 0; i--)
		{
			const j = Math.floor(Math.random() * (i + 1));
			var temp = dropdownOrder[i]
			dropdownOrder[i] = dropdownOrder[j]
			dropdownOrder[j] = temp;
		}

		for(let i = 0; i < file.list.length; i++)
		{
			listChildEl = document.createElement("li");
			listChildEl.textContent = file.list[i][0];

			selectEl = document.createElement("select");

			inputEl = dropdownMenu();
			inputEl.className = "input";
			inputEl.value = "";
			selectEl.appendChild(inputEl);

			listEl.appendChild(listChildEl);
			listEl.appendChild(inputEl);
		}

	}
	else
	{
		for(let i = 0; i < file.list.length; i++)
		{
			appendListTextbox(file.list[i][0]);
		}

	}
}

// clear list
function clear()
{
	checkBtn.textContent = "Check";
	for(let i = 0; i < inputEls.length; i++)
	{
		inputEls[i].value = null;
		inputEls[i].disabled = false;
		inputEls[i].style.backgroundColor = null;
		inputEls[i].style.color = null;
	}
}

// check answer
function check()
{
	if(checkBtn.textContent == "Check")
	{
		for(let i = 0; i < file.list.length; i++)
		{

			inputEls[i].disabled = true;
			if(file.list[i][1].toLowerCase() != inputEls[i].value.toLowerCase())
			{
				inputEls[i].style.backgroundColor = "#D61A1B";
				inputEls[i].style.color = "white";
			}
			else
			{
				inputEls[i].style.backgroundColor = null;
			}
		}

		checkBtn.textContent = "Edit";
	}
	else
	{
		checkBtn.textContent = "Check";
		for(let i = 0; i < inputEls.length; i++)
		{
			inputEls[i].disabled = false;
			inputEls[i].style.backgroundColor = null;
			inputEls[i].style.color = null;
		}
	}

}

parseFile();


listEl = document.getElementById("list");
headerEl = document.getElementById("header");
descEl = document.getElementById("desc");
inputEls = document.getElementsByClassName("input");

document.getElementById("clearBtn").addEventListener('click', clear);
document.getElementById("checkBtn").addEventListener('click', check);
