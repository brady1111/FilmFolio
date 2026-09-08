//get the create list button
const createListButton = document.getElementById("createListButton");

//get the create list modal
const createListModal = document.getElementById("createListModal");

//get the close button
const closeCreateList = document.getElementById("closeCreateList");

//get the list name input
const listName = document.getElementById("listName");

//get the list summary input
const listSummary = document.getElementById("listSummary");

//get the save button
const saveListButton = document.getElementById("saveListButton");

//get the lists container
const listsContainer = document.getElementById("listsContainer");

//get the logged in user's ID
const userId = localStorage.getItem("userId");

//get the movie modal elements
const movieModal = document.getElementById("movieModal");
const closeMovieModal = document.getElementById("closeMovieModal");
const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("modalTitle");
const modalRating = document.getElementById("modalRating");
const modalReleaseDate = document.getElementById("modalReleaseDate");
const modalSummary = document.getElementById("modalSummary");
const removeFromListButton =
    document.getElementById("removeFromListButton");

//holds the movie that is currently selected
let selectedMovie = null;

//holds the list that is currently selected
let selectedListId = null;
let selectedListName = null;

//get elements for favorite movies list
const favoritesList = {name: "Favorites", maxMovies: 5};
const favoritesListCard = document.getElementById("favoritesList");
const favoritesCount = document.getElementById("favoritesCount");
let selectedIsFavorite = false;
//open Favorites when clicked
favoritesListCard.addEventListener("click", function() {
    loadFavorites();
});

//get the edit list modal elements
const editListModal = document.getElementById("editListModal");
const closeEditList = document.getElementById("closeEditList");
const editListName = document.getElementById("editListName");
const editListSummary = document.getElementById("editListSummary");
const saveEditListButton = document.getElementById("saveEditListButton");

//open the create list modal
createListButton.addEventListener("click", function() {
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
    const summary =
        listSummary.value.trim() === ""
            ? "Your movie list."
            : listSummary.value.trim();

    if(name === "") {
        alert("Please enter a list name.");
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:8080/lists?name=${encodeURIComponent(name)}&summary=${encodeURIComponent(summary)}&userId=${userId}`,
            {
                method: "POST"
            }
        );

        if(!response.ok) {
            throw new Error("Failed to create list");
        }

        //clear the inputs
        listName.value = "";
        listSummary.value = "";

        //close the modal
        createListModal.style.display = "none";

        //reload the lists
        await loadLists();

    }catch(error) {

        console.error("Error creating list:", error);

        alert("There was a problem creating your list.");

    }

});

//open the edit list modal
function openEditListModal(listId, listName, listSummary) {

    editListName.value = listName;

    editListSummary.value =
        listSummary || "Your movie list.";

    editListModal.style.display = "flex";

    editListModal.dataset.listId = listId;

}

//close the edit list modal
closeEditList.addEventListener("click", function() {

    editListModal.style.display = "none";

});

//close the modal when clicking outside the box
editListModal.addEventListener("click", function(event) {

    if(event.target === editListModal) {

        editListModal.style.display = "none";

    }

});

//save the edited list
saveEditListButton.addEventListener("click", async function() {

    const listId = editListModal.dataset.listId;

    const name = editListName.value.trim();

    const summary =
        editListSummary.value.trim() === ""
            ? "Your movie list."
            : editListSummary.value.trim();

    if(name === "") {

        alert("Please enter a list name.");

        return;

    }

    try {

        const response = await fetch(
            `http://localhost:8080/lists?listId=${listId}&name=${encodeURIComponent(name)}&summary=${encodeURIComponent(summary)}`,
            {
                method: "PUT"
            }
        );

        if(!response.ok) {

            throw new Error("Failed to update list");

        }

        editListModal.style.display = "none";

        await loadLists();

        await loadListMovies(
            Number(listId),
            name,
            summary
        );

    }catch(error) {

        console.error(
            "Error updating list:",
            error
        );

        alert(
            "There was a problem updating your list."
        );

    }

});

// function to delete a movie list
async function deleteList(listId, listName) {
    const confirmed = confirm("Are you sure you want to delete " + listName + "?");

    if(!confirmed) {
        return;
    }
    try {
        const response = await fetch(
            `http://localhost:8080/lists?listId=${listId}`,
            {
                method: "DELETE"
            }
        );

        if(!response.ok) {
            throw new Error("Failed to delete list");
        }

        alert(listName + " was deleted.");

        document.getElementById("selectedListContainer").innerHTML = "";

        await loadLists();

    }catch(error) {
        console.error("Error deleting list:", error);
        alert("There was a problem deleting your list.");
    }
}

//load the user's favorite movies
async function loadFavorites() {

    try {

        const response = await fetch(
            `http://localhost:8080/lists/favorites/movies?userId=${userId}`
        );

        if(!response.ok) {

            throw new Error("Failed to load Favorites");

        }

        const movies = await response.json();
        favoritesCount.textContent = movies.length + " / 5 movies";

        const selectedListContainer =
            document.getElementById("selectedListContainer");

        selectedListContainer.innerHTML = "";

        const listHeader =
            document.createElement("div");

        listHeader.className = "selectedListHeader";

        const title =
            document.createElement("h2");

        title.textContent = "Favorites";

        listHeader.appendChild(title);

        selectedListContainer.appendChild(listHeader);

        const movieRow =
            document.createElement("div");

        movieRow.className = "listMovieRow";

        movies.forEach(movie => {

            const movieCard =
                document.createElement("div");

            movieCard.className = "movieCard";

            const poster =
                document.createElement("img");

            poster.src = movie.POSTER_URL;

            poster.alt = movie.TITLE;

            movieCard.appendChild(poster);

            const movieTitle =
                document.createElement("h3");

            movieTitle.textContent = movie.TITLE;

            movieCard.appendChild(movieTitle);

            const rating = document.createElement("p");
            rating.textContent = `Rating: ${movie.RATING}`;

            movieCard.appendChild(rating);

            movieCard.addEventListener("click", function() {
                selectedMovie = movie;
                selectedListId = null;
                selectedListName = "Favorites";
                selectedIsFavorite = true;
                removeFromListButton.textContent = "Remove from Favorites";
                modalPoster.src = movie.POSTER_URL;
                modalPoster.alt = movie.TITLE;
                modalTitle.textContent = movie.TITLE;
                modalRating.textContent = "★ " + movie.RATING;
                modalReleaseDate.textContent = "Release Date: " + movie.RELEASE_DATE;
                modalSummary.textContent = movie.SUMMARY;
                movieModal.style.display = "flex";
            });
            movieRow.appendChild(movieCard);
        });

        selectedListContainer.appendChild(movieRow);

    }catch(error) {
        console.error("Error loading Favorites:", error);
    }
}

//load lists from the backend
async function loadLists() {

    try {

        const response = await fetch(
            `http://localhost:8080/lists?userId=${userId}`
        );

        if(!response.ok) {

            throw new Error("Failed to load lists");

        }

        const lists = await response.json();
        const regularLists = lists.filter(list => list.name !== "Favorites");

        //remove previously loaded regular lists
        const existingCards =
            listsContainer.querySelectorAll(".databaseList");

        existingCards.forEach(card => card.remove());

        //create a card for each list
        for(const list of regularLists) {

            const listCard = document.createElement("div");

            listCard.className = "listCard databaseList";

            listCard.addEventListener("click", function() {

                loadListMovies(
                    list.id,
                    list.name,
                    list.summary
                );

            });

            const title = document.createElement("h3");

            title.textContent = list.name;

            const movieCount = document.createElement("p");

            const movieResponse = await fetch(
                `http://localhost:8080/lists/movies?listId=${list.id}`
            );

            const movies = await movieResponse.json();

            movieCount.textContent =
                movies.length +
                (movies.length === 1 ? " movie" : " movies");

            const description = document.createElement("p");

            description.className = "listDescription";

            description.textContent =
                list.summary || "Your movie list.";

            listCard.appendChild(title);

            listCard.appendChild(movieCount);

            listCard.appendChild(description);

            listsContainer.appendChild(listCard);

        }

    }catch(error) {

        console.error("Error loading lists:", error);

    }

}

//load movies from a list
async function loadListMovies(listId, listName, listSummary) {

    try {

        const response = await fetch(
            `http://localhost:8080/lists/movies?listId=${listId}`
        );

        if(!response.ok) {
            throw new Error("Failed to load list movies");
        }

        const movies = await response.json();

        const selectedListContainer = document.getElementById("selectedListContainer");
        selectedListContainer.innerHTML = "";

        const listHeader = document.createElement("div");
        listHeader.className = "selectedListHeader";

        const title = document.createElement("h2");
        title.textContent = listName;

        const listButtons = document.createElement("div");
        listButtons.className = "listButtons";

        const editListButton = document.createElement("button");
        editListButton.textContent = "Edit List";
        editListButton.addEventListener("click", function() {
            openEditListModal(listId, listName, listSummary);
        });

        const deleteListButton = document.createElement("button");
        deleteListButton.textContent = "Delete List";
        deleteListButton.addEventListener("click", function() {
            deleteList(listId, listName);
        });

        listButtons.appendChild(editListButton);
        listButtons.appendChild(deleteListButton);

        listHeader.appendChild(title);

        listHeader.appendChild(listButtons);

        selectedListContainer.appendChild(listHeader);

        const movieRow = document.createElement("div");

        movieRow.className = "listMovieRow";

        movies.forEach(movie => {

            const movieCard = document.createElement("div");

            movieCard.className = "movieCard";

            //movie poster
            const poster = document.createElement("img");

            poster.src = movie.POSTER_URL;

            poster.alt = movie.TITLE;

            movieCard.appendChild(poster);

            //movie title
            const movieTitle = document.createElement("h3");

            movieTitle.textContent = movie.TITLE;

            movieCard.appendChild(movieTitle);

            //movie rating
            const rating = document.createElement("p");

            rating.textContent =
                `Rating: ${movie.RATING}`;

            movieCard.appendChild(rating);

            //open movie modal
            movieCard.addEventListener("click", function() {

                selectedMovie = movie;

                selectedListId = listId;

                selectedListName = listName;

                selectedIsFavorite = false;

                removeFromListButton.textContent = "Remove from List";

                modalPoster.src = movie.POSTER_URL;

                modalPoster.alt = movie.TITLE;

                modalTitle.textContent = movie.TITLE;

                modalRating.textContent =
                    "★ " + movie.RATING;

                modalReleaseDate.textContent =
                    "Release Date: " + movie.RELEASE_DATE;

                modalSummary.textContent =
                    movie.SUMMARY;

                movieModal.style.display = "flex";

            });

            movieRow.appendChild(movieCard);

        });

        selectedListContainer.appendChild(movieRow);

    }catch(error) {

        console.error(
            "Error loading list movies:",
            error
        );

    }

}

//close the movie modal
closeMovieModal.addEventListener("click", function() {

    movieModal.style.display = "none";

});

//close the movie modal when clicking outside
movieModal.addEventListener("click", function(event) {

    if(event.target === movieModal) {

        movieModal.style.display = "none";

    }

});

//remove movie from the selected list or Favorites
removeFromListButton.addEventListener("click", async function() {

    if(selectedMovie === null) {

        return;

    }

    try {

        let response;

        if(selectedIsFavorite) {

            response = await fetch(
                `http://localhost:8080/lists/favorites/movies?userId=${userId}&movieId=${selectedMovie.ID}`,
                {
                    method: "DELETE"
                }
            );

        }else{

            if(selectedListId === null) {

                return;

            }

            response = await fetch(
                `http://localhost:8080/lists/movies?listId=${selectedListId}&movieId=${selectedMovie.ID}`,
                {
                    method: "DELETE"
                }
            );

        }

        if(!response.ok) {

            const errorMessage = await response.text();

            alert(errorMessage);

            return;

        }

        alert(
            selectedIsFavorite
                ? "Movie removed from Favorites."
                : "Movie removed from " + selectedListName
        );

        movieModal.style.display = "none";

        if(selectedIsFavorite) {

            await loadFavorites();

        }else{

            await loadListMovies(
                selectedListId,
                selectedListName
            );

            await loadLists();

        }

        selectedMovie = null;

        selectedListId = null;

        selectedListName = null;

        selectedIsFavorite = false;

    }catch(error) {
        console.error("Error removing movie from list:", error);
        alert("There was a problem removing the movie from your list.");
    }
});
//load lists when the page opens
loadLists();