console.log("Hello World");
//get the search button element by id
const searchButton = document.getElementById("searchButton");
//get the search box element by id
const searchBox = document.getElementById("movieTitle");
//get the message element by id
const message = document.getElementById("message");

//call function when the search button is clicked
searchButton.addEventListener("click", searchMovies);
//activate function when the enter key is pressed
searchBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { //check if the key pressed was "Enter"
        searchMovies(); //function call
    }
});

function searchMovies() {
    const movieTitle = searchBox.value.trim(); //holds the movieTitle from user

    //empty string validation
    if(movieTitle === "") {
        message.textContent = "Please enter a movie title";
        return;
    }
    message.textContent = "";

}