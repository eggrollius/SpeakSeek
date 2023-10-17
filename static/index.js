const minCharacters = 10;

document.addEventListener("DOMContentLoaded", function() {
    const textArea = document.getElementById("textArea");
    const submitButton = document.getElementById("submitButton");
    const textAreaContainer = document.getElementById("textAreaContainer"); // Moved outside the input event for efficiency

    textArea.addEventListener("input", function() {
        const textLength = textArea.value.length;
        
        if (textLength >= minCharacters) {
            submitButton.removeAttribute("disabled");
            let warning = textAreaContainer.querySelector("span");
            if(warning) {
                textAreaContainer.removeChild(warning);
            }
        } else {
            submitButton.setAttribute("disabled", "disabled");
            let existingWarning = textAreaContainer.querySelector("span"); // Use another variable to check for an existing warning
            if(!existingWarning) { // Now checking for an existing warning
                let warning = document.createElement("span");
                warning.setAttribute("style", `color: red; visibility: visible;`);
                warning.innerText = `You need to enter at least ${minCharacters} characters`;
                textAreaContainer.appendChild(warning);
            }
        }
    });
    //add event listener for "enter" key
    textArea.addEventListener("keydown", function(event) {
        // Check if "Enter" key is pressed
        if (event.key === "Enter") {
            // Prevent the default action to stop adding a new line in the text area
            event.preventDefault();
            
            // Check if the submit button is enabled
            if (!submitButton.hasAttribute("disabled")) {
                // Trigger form submission
                // Assuming your form has an id="myForm"
                document.getElementById("userInput").submit();
            }
        }
    });

    document.getElementById('presetSelect').addEventListener('change', async function() {
        const selectedLang = this.value;
        const textArea = document.getElementById('textArea');
        
        const quote = await fetchRandomQuote(selectedLang);
        textArea.value = quote;
        textArea.dispatchEvent(new Event('input'));
    });
});

async function fetchRandomQuote(langCode) {
    const url = `https://quotes15.p.rapidapi.com/quotes/random/?language_code=${langCode}`;
    const headers = {
        'X-RapidAPI-Key': 'ae3e3d3bfbmsh2f29f317759b088p18b9a9jsn040d39350b3b',
        'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
    };

    try {
        const response = await fetch(url, {
            headers: headers
        });

        if (response.ok) {
            const data = await response.json();
            return data.content;
        } else {
            console.log(`HTTP error: ${response.status}`);
        }
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}
