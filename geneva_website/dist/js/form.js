// Form submission event listener
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Preventing form submission
    
    // Resetting any previous error messages and error borders
    resetErrors();

    let isValid = true; //setting default value for validity

    //getting trimmed values of name and message, and the value of current date and time.
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    const time = document.getElementById("currentDate").value;

    //reducing name and message values for no spaces for validation 
    const nameReduced = name.replace(/\s+/g, "");
    const messageReduced = message.replace(/\s+/g, "");

    //validating name and message inputs
    if (nameReduced.length < 2) {
        document.getElementById("nameError").innerText = "Required to enter at least 2 non-space characters!";
        document.getElementById("nameError").style.paddingLeft = "10px";
        document.getElementById("name").style.border = "2px solid red";
        isValid = false;
    }

    if (nameReduced.length > 50) {
        document.getElementById("nameError").innerText = "Name cannot exceed 50 characters!";
        document.getElementById("nameError").style.paddingLeft = "10px";
        document.getElementById("name").style.border = "2px solid red";
        isValid = false;
    }

    if (messageReduced.length < 10) {
        document.getElementById("messageError").innerText = "Required to enter at least 10 non-space characters!";
        document.getElementById("messageError").style.paddingLeft = "10px";
        document.getElementById("message").style.border = "2px solid red";
        isValid = false;
    }

    if (messageReduced.length > 200) {
        document.getElementById("messageError").innerText = "Message cannot exceed 200 characters!";
        document.getElementById("messageError").style.paddingLeft = "10px";
        document.getElementById("message").style.border = "2px solid red";
        isValid = false;
    }

    //condition for valid inputs
    if (isValid) {
        alert("Form submitted successfully!"); //message that form submission is successful

        var fdata = new FormData ();
        var request = new XMLHttpRequest ();
        var jresp;

        //appending new data to fdata object
        fdata.append("Current_Date", time);
        fdata.append("Name", name);
        fdata.append("Message", message); 


        request.open ("POST", "/submit", false); //Synchronous POST request to send data input
        request.send (fdata);

        jresp = JSON.parse(request.responseText);
        console.log (jresp);   //recording new data in console
        reviews(); //updating reviews upon a new valid submission
    }
});

//function for reviews displaying
function reviews() {
    var request = new XMLHttpRequest();
    request.open("GET", "/submit", false); // Synchronous GET request to get all reviews
    request.send(); 
    
    var reviews = JSON.parse(request.responseText); // Parsing response
    const reviewsContent = document.getElementById("reviewsContent");
    reviewsContent.innerHTML = ""; // Clearing existing reviews

    let reviewsHtml = "";
    const maxVisibleReviews = 6; // Max number of reviews to be displayed initially
    const showMoreButtonId = "showMoreButton"; 

    if (reviews.length !== 0 && reviews.length <= maxVisibleReviews) 
    {
        // Looping through all reviews
        for (let i = 0; i < reviews.length; i++) 
        {
            reviewsHtml += `
            <div class="reviewBox">
                <div class="reviewSection" id="reviewName">${reviews[i].Name}</div>
                <div class="reviewSection" id="reviewMessage"><i class="fa-solid fa-message"></i> ${reviews[i].Message}</div>
                <div class="reviewSection" id="reviewTime"><i class="fa-solid fa-clock"></i> ${reviews[i].Current_Date}</div>
            </div>`;
        }
        reviewsContent.innerHTML = reviewsHtml;
    }

    else if (reviews.length !== 0)
    {
        // Looping through the first 6 reviews initially
        for (let i = 0; i < maxVisibleReviews; i++) 
        {
            reviewsHtml += `
            <div class="reviewBox">
                <div class="reviewSection" id="reviewName">${reviews[i].Name}</div>
                <div class="reviewSection" id="reviewMessage"><i class="fa-solid fa-message"></i> ${reviews[i].Message}</div>
                <div class="reviewSection" id="reviewTime"><i class="fa-solid fa-clock"></i> ${reviews[i].Current_Date}</div>
            </div>`;
        }
        reviewsContent.innerHTML = reviewsHtml;

        // Adding a "Show More" button for more than 6 reviews
        if (reviews.length > maxVisibleReviews) 
        {
            const showMoreButton = document.createElement("button");
            showMoreButton.id = showMoreButtonId;
            showMoreButton.textContent = "Show More";
            reviewsContent.appendChild(showMoreButton);

            let showAll = false;

            // Adding event listener for the button
            showMoreButton.addEventListener("click", function () {
                if (!showAll) 
                {
                    reviewsHtml = ""; //clearing previous HTML content

                    // Looping through all reviews
                    for (let i = 0; i < reviews.length; i++) 
                    {
                        reviewsHtml += `
                        <div class="reviewBox">
                            <div class="reviewSection" id="reviewName">${reviews[i].Name}</div>
                            <div class="reviewSection" id="reviewMessage"><i class="fa-solid fa-message"></i> ${reviews[i].Message}</div>
                            <div class="reviewSection" id="reviewTime"><i class="fa-solid fa-clock"></i> ${reviews[i].Current_Date}</div>
                        </div>`;
                    }
                    reviewsContent.innerHTML = reviewsHtml;
                    reviewsContent.appendChild(showMoreButton); // Re-appending button
                    showMoreButton.textContent = "Show Less"; //changing content to show less
                } else {
                    // Looping through only the first 6 reviews
                    reviewsHtml = "";
                    for (let i = 0; i < maxVisibleReviews; i++) {
                        reviewsHtml += `
                        <div class="reviewBox">
                            <div class="reviewSection" id="reviewName">${reviews[i].Name}</div>
                            <div class="reviewSection" id="reviewMessage"><i class="fa-solid fa-message"></i> ${reviews[i].Message}</div>
                            <div class="reviewSection" id="reviewTime"><i class="fa-solid fa-clock"></i> ${reviews[i].Current_Date}</div>
                        </div>`;
                    }
                    reviewsContent.innerHTML = reviewsHtml;
                    reviewsContent.appendChild(showMoreButton); // Re-appending button
                    showMoreButton.textContent = "Show More"; //changing content back to show more
                }
                showAll = !showAll; //changing status of showAll
            });
        }
        
    } else {
        // No reviews available
        reviewsHtml = `<p id="emptyReview">Be the first to put a review!</p>`;
        reviewsContent.innerHTML = reviewsHtml;
    }
}

// Resetting errors and styles upon refresh 
function resetErrors() {
    const errorMessages = document.querySelectorAll("div[id$='Error']"); //setting errorMessages to any id ending with 'Error'
    for(let i=0; i<errorMessages.length; i++){
        errorMessages[i].textContent = ""; //clearing any text content on refresh
    }

    const formFields = document.querySelectorAll("input, select, textarea");
    for(let i=0; i<formFields.length; i++){
        formFields[i].style.border = ""; //clearing any styling on refresh
    }
}

//Making reviews load upon loading website
window.onload = function(){
    reviews();
};
