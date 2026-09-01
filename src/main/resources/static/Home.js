//get the logged-in user's ID
const userId = localStorage.getItem("userId");

//elements for searching
const searchButton = document.getElementById("searchButton");
const searchBox = document.getElementById("movieTitle");
const message = document.getElementById("message");

//get the popular movies container
const popularMovies = document.getElementById("popularMovies");

//get the left and right scroll buttons
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

leftButton.style.visibility = "hidden";

//elements for the movie modal
const movieModal = document.getElementById("movieModal");
const closeModal = document.getElementById("closeModal");
const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("modalTitle");
const modalRating = document.getElementById("modalRating");
const modalReleaseDate = document.getElementById("modalReleaseDate");
const modalSummary = document.getElementById("modalSummary");

//element for adding movie to list
const addToListButton = document.getElementById("addToListButton");

//get the list selection container
const listSelection = document.getElementById("listSelection");

//holds the movie that is currently selected
let selectedMovie = null;

//get the user menu elements
const userButton = document.getElementById("userButton");
const userDropdown = document.getElementById("userDropdown");
const myListsButton = document.getElementById("myListsButton");
const createListButton = document.getElementById("createListButton");
const logoutButton = document.getElementById("logoutButton");

//get the create list modal elements
const createListModal = document.getElementById("createListModal");
const closeCreateList = document.getElementById("closeCreateList");
const listName = document.getElementById("listName");
const listSummary = document.getElementById("listSummary");
const saveListButton = document.getElementById("saveListButton");

//open and close the user dropdown
userButton.addEventListener("click", function(event) {
    event.stopPropagation();
    if(userDropdown.style.display === "block") {
        userDropdown.style.display = "none";
    }else{
        userDropdown.style.display = "block";
    }
});

//close the dropdown when clicking anywhere else
document.addEventListener("click", function(event) {
    if(!userDropdown.contains(event.target) &&
        event.target !== userButton) {
        userDropdown.style.display = "none";
    }
});

//open My Lists
myListsButton.addEventListener("click", function() {
    window.location.href = "Lists.html";
});

//open the create list modal
createListButton.addEventListener("click", function() {
    userDropdown.style.display = "none";
    createListModal.style.display = "flex";
});

//close the create list modal
closeCreateList.addEventListener("click", function() {
    createListModal.style.display = "none";
});

//close the modal when clicking outside the box
createListModal.addEventListener("click", function(event) {
    if(event.target === createListModal) {
        createListModal.style.display = "none";
    }
});

//create a new list
saveListButton.addEventListener("click", async function() {
    const name = listName.value.trim();
    const summary = listSummary.value.trim();
    if(name === "") {
        alert("Please enter a list name.");
        return;
    }
    const finalSummary =
        summary === "" ? "Your movie list." : summary;
    try {
        const response = await fetch(
            `http://localhost:8080/lists?name=${encodeURIComponent(name)}&summary=${encodeURIComponent(finalSummary)}&userId=${userId}`,
            {
                method: "POST"
            }
        );
        if(!response.ok) {
            throw new Error("Failed to create list");
        }
        listName.value = "";
        listSummary.value = "";
        createListModal.style.display = "none";
        alert("List created successfully!");
    }catch(error) {
        console.error("Error creating list:", error);
        alert("There was a problem creating your list.");
    }
});

//logout
logoutButton.addEventListener("click", function() {
    window.location.href = "LogIn.html";
});

//call function when the search button is clicked
searchButton.addEventListener("click", searchMovies);

//activate function when Enter is pressed
searchBox.addEventListener("keydown", function(event) {
    if(event.key === "Enter") {
        searchMovies();
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

//load popular movies
async function loadPopularMovies() {
    try {
        const response = await fetch(
            "http://localhost:8080/popular"
        );

        if(!response.ok) {
            throw new Error("Failed to load popular movies");

        }
        const movies = await response.json();
        popularMovies.innerHTML = "";

        for(const movie of movies) {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movieCard");

            //movie poster
            const poster = document.createElement("img");
            poster.src = movie.posterUrl;
            poster.alt = movie.title;
            movieCard.appendChild(poster);

            //movie title
            const title = document.createElement("h3");
            title.textContent = movie.title;
            movieCard.appendChild(title);

            //open movie modal
            movieCard.addEventListener("click", function() {
                selectedMovie = movie;
                modalPoster.src = movie.posterUrl;
                modalPoster.alt = movie.title;
                modalTitle.textContent = movie.title;
                modalRating.textContent =
                    "★ " + movie.rating;
                modalReleaseDate.textContent =
                    "Release Date: " + movie.releaseDate;
                modalSummary.textContent =
                    movie.summary;
                listSelection.innerHTML = "";
                movieModal.style.display = "block";
            });

            popularMovies.appendChild(movieCard);
        }
        updateScrollButtons();
    }catch(error) {
        console.error(
            "Error loading popular movies:",
            error
        );
    }
}

//when the X is pressed close the modal
closeModal.addEventListener("click", function() {
    movieModal.style.display = "none";

});

//when anything outside the modal is clicked close the modal
movieModal.addEventListener("click", function(event) {
    if(event.target === movieModal) {
        movieModal.style.display = "none";
    }
});


//when Add to List is pressed
addToListButton.addEventListener("click", async function() {
    if(selectedMovie === null) {
        alert("Please select a movie first.");
        return;
    }
    try {
        const response = await fetch(
            `http://localhost:8080/lists?userId=${userId}`
    );
if(!response.ok) {
    throw new Error("Failed to load lists");
}
const lists = await response.json();
listSelection.innerHTML = "";
const listTitle = document.createElement("p");
listTitle.textContent = "Choose a list:";
listSelection.appendChild(listTitle);

lists.forEach(list => {
    const listButton = document.createElement("button");
    listButton.textContent = list.name;

    listButton.addEventListener("click", async function() {
        try {
            const response = await fetch(
                `http://localhost:8080/lists/movies?listId=${list.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(selectedMovie)
                }
            );

            if(!response.ok) {
                const errorMessage = await response.text();
                alert(errorMessage);
                return;
            }

            alert("Movie added to " + list.name);

            listSelection.innerHTML = "";

        }catch(error) {
            console.error(
                "Error adding movie to list:",
                error
            );
            alert("There was a problem adding the movie to your list.");
        }
    });

    listSelection.appendChild(listButton);
});

}catch(error) {
    console.error("Error loading lists:", error);
    alert("There was a problem loading your lists.");
}
});

//update scroll buttons
function updateScrollButtons() {
    if(popularMovies.scrollLeft > 0) {
        leftButton.style.visibility = "visible";
    }else{
        leftButton.style.visibility = "hidden";
    }

    if(popularMovies.scrollLeft + popularMovies.clientWidth >= popularMovies.scrollWidth - 1) {
        rightButton.style.visibility = "hidden";
    }else{
        rightButton.style.visibility = "visible";
    }
}

popularMovies.addEventListener(
    "scroll",
    updateScrollButtons
);

//search for movies
function searchMovies() {
    const movieTitle = searchBox.value.trim();
    if(movieTitle === "") {
        message.textContent = "Please enter a movie title";
        return;
    }
    message.textContent = "";
}

//load movies when page opens
loadPopularMovies();