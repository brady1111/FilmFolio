//get the create list button
const createListButton = document.getElementById("createListButton");

//get the create list modal
const createListModal = document.getElementById("createListModal");

//get the close button
const closeCreateList = document.getElementById("closeCreateList");

//get the list name input
const listName = document.getElementById("listName");

//get the save button
const saveListButton = document.getElementById("saveListButton");

//get the lists container
const listsContainer = document.getElementById("listsContainer");

const favoritesList = {
    name: "Favorites",
    maxMovies: 5
};

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
    if(name === "") {
        alert("Please enter a list name.");
        return;
    }
    try {
        const response = await fetch(
            `http://localhost:8080/lists?name=${encodeURIComponent(name)}&userId=1`,
            {
                method: "POST"
            }
        );

        if(!response.ok) {
            throw new Error("Failed to create list");
        }

        //clear the input
        listName.value = "";
        //close the modal
        createListModal.style.display = "none";
        //reload the lists
        await loadLists();
    }catch(error) {
        console.error("Error creating list:", error);
        alert("There was a problem creating your list.");
    }
});

//load lists from the backend
async function loadLists() {
    try {
        const response = await fetch(
            "http://localhost:8080/lists?userId=1"
        );
        if(!response.ok) {
            throw new Error("Failed to load lists");
        }
        const lists = await response.json();

        //remove previously loaded regular lists
        const existingCards = listsContainer.querySelectorAll(".databaseList");
        existingCards.forEach(card => card.remove());
        //create a card for each list
        lists.forEach(list => {
            const listCard = document.createElement("div");
            listCard.className = "listCard databaseList";

            listCard.addEventListener("click", function() {
                loadListMovies(list.id, list.name);
            });

            const title = document.createElement("h3");
            title.textContent = list.name;

            const movieCount = document.createElement("p");
            movieCount.textContent = "0 movies";

            const description = document.createElement("p");
            description.className = "listDescription";
            description.textContent = "Your movie list.";

            listCard.appendChild(title);
            listCard.appendChild(movieCount);
            listCard.appendChild(description);
            listsContainer.appendChild(listCard);
        });
    }catch(error) {
        console.error("Error loading lists:", error);
    }
}

async function loadListMovies(listId, listName) {
    try {
        const response = await fetch(
            `http://localhost:8080/lists/movies?listId=${listId}`
        );
        if (!response.ok) {
            throw new Error("Failed to load list movies");
        }
        const movies = await response.json();
        const selectedListContainer =
            document.getElementById("selectedListContainer");

        selectedListContainer.innerHTML = "";

        const title = document.createElement("h2");
        title.textContent = listName;

        selectedListContainer.appendChild(title);

        const movieRow = document.createElement("div");
        movieRow.className = "listMovieRow";

        movies.forEach(movie => {

            const movieCard = document.createElement("div");
            movieCard.className = "movieCard";

            const poster = document.createElement("img");
            poster.src = movie.POSTER_URL;
            poster.alt = movie.TITLE;

            movieCard.appendChild(poster);

            const movieTitle = document.createElement("h3");
            movieTitle.textContent = movie.TITLE;

            const rating = document.createElement("p");
            rating.textContent = `Rating: ${movie.RATING}`;

            movieCard.appendChild(movieTitle);
            movieCard.appendChild(rating);
            movieRow.appendChild(movieCard);
        });

        selectedListContainer.appendChild(movieRow);

    } catch (error) {
        console.error("Error loading list movies:", error);
    }
}

// load lists when the page opens
loadLists();