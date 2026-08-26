//elements for searching
const searchButton = document.getElementById("searchButton");
const searchBox = document.getElementById("movieTitle");
const message = document.getElementById("message");

//get the popular movies container
const popularMovies = document.getElementById("popularMovies");

//get the left and right scroll buttons
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
//hide the leftButton until needed
leftButton.style.visibility = "hidden";

//elements for the movie modal (pop-up)
const movieModal = document.getElementById("movieModal");
const closeModal = document.getElementById("closeModal");
const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("modalTitle");
const modalRating = document.getElementById("modalRating");
const modalReleaseDate = document.getElementById("modalReleaseDate");
const modalSummary = document.getElementById("modalSummary");

//element for adding movie to watchlist
const addToListButton = document.getElementById("addToListButton");

//call function when the search button is clicked
searchButton.addEventListener("click", searchMovies);
//activate function when the enter key is pressed
searchBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { //check if the key pressed was "Enter"
        searchMovies(); //function call
    }
});

//implement the scroll buttons
leftButton.addEventListener("click", function() {
    popularMovies.scrollBy({
        left: -400,
        behavior: "smooth"
    });
});
rightButton.addEventListener("click", function() {
    popularMovies.scrollBy({
        left: 400,
        behavior: "smooth"
    });
});

async function loadPopularMovies() { //will be able to wait on backend request
    try{
        //get the popular movies from http://localhost:8080/popular
        const response = await fetch("http://localhost:8080/popular");
        //wait for the response before continuing
        const movies = await response.json();

        //loop through the results
        for (const movie of movies) {
            const movieCard = document.createElement("div");

            movieCard.classList.add("movieCard");

            const poster = document.createElement("img");
            //load each poster
            poster.src = movie.posterUrl;
            poster.alt = movie.title;
            movieCard.appendChild(poster);

            //when a movieCard is clicked, open a modal that displays the movie info
            movieCard.addEventListener("click", function() {
                modalPoster.src = movie.posterUrl;
                modalTitle.textContent = movie.title;
                modalRating.textContent = "★ " + movie.rating;
                modalReleaseDate.textContent = "Release Date: " + movie.releaseDate;
                modalSummary.textContent = movie.summary;
                movieModal.style.display = "block";
            });

            //when the x is pressed close the modal
            closeModal.addEventListener("click", function() {
                movieModal.style.display = "none";
            });

            //when anything outside of the modal is clicked close the modal
            movieModal.addEventListener("click", function(event) {

                if (event.target === movieModal) {
                    movieModal.style.display = "none";
                }

            });

            //when the "add to list" button is pressed add the movie to the user's choice of list
            addToListButton.addEventListener("click", function() {
                console.log("Add to Watchlist clicked");
            });

            popularMovies.appendChild(movieCard);

            const title = document.createElement("h3");
            title.textContent = movie.title;
            movieCard.appendChild(title);
            popularMovies.appendChild(movieCard);

            updateScrollButtons();
        }
    }catch (error) {
        console.error("Error loading popular movies:", error);
    }
}

//function to update the buttons as needed
function updateScrollButtons() {

    if (popularMovies.scrollLeft > 0) {
        leftButton.style.visibility = "visible";
    } else {
        leftButton.style.visibility = "hidden";
    }

    if (popularMovies.scrollLeft + popularMovies.clientWidth >= popularMovies.scrollWidth - 1) {
        rightButton.style.visibility = "hidden";
    } else {
        rightButton.style.visibility = "visible";
    }
}
popularMovies.addEventListener("scroll", updateScrollButtons);

//function to search for movies
function searchMovies() {
    const movieTitle = searchBox.value.trim(); //holds the movieTitle from user

    //empty string validation
    if(movieTitle === "") {
        message.textContent = "Please enter a movie title";
        return;
    }
    message.textContent = "";

}

loadPopularMovies();
