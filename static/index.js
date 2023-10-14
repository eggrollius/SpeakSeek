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
    
});
