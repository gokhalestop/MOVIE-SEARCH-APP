let inputbox = document.querySelector(".inputbox");
let form = document.querySelector(".form");
let movieContainer = document.querySelector(".moviecontainer");
let moviepara = document.querySelector(".moviepara");

async function findmovie(movie) {
  // Show the searching message
  movieContainer.innerHTML = `<p class="search-message">Searching your movie...</p>`;

  const api = "9a8bb55c"; // Your API key here
  const url = `http://www.omdbapi.com/?apikey=${api}&t=${movie}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Check if the movie is found
    if (data.Response === "True") {
      showmoviedata(data);
    } else {
      movieContainer.innerHTML = `<p class="error-message">Movie not found. Please try another search.</p>`;
    }
  } catch (error) {
    // Handle any errors during the fetch
    movieContainer.innerHTML = `<p class="error-message">An error occurred. Please try again later.</p>`;
  }
}

const showmoviedata = (data) => {
  // Clear the container before showing new data
  movieContainer.innerHTML = "";

  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

  const movieelement = document.createElement("div");
  movieelement.classList.add('ele');
  movieelement.innerHTML = `<h2>${Title}</h2>
                            <p><strong>Rating:</strong> ${imdbRating}</p>`;

  const moviegenreelement = document.createElement("div");
  moviegenreelement.classList.add('movie_genre');

  Genre.split(",").forEach(element => {
    const button = document.createElement("button");
    button.innerHTML = element.trim();
    moviegenreelement.appendChild(button);
  });

  movieelement.innerHTML += `<p><strong>Released:</strong> ${Released}</p>`;
  movieelement.innerHTML += `<p><strong>Runtime:</strong> ${Runtime}</p>`;
  movieelement.innerHTML += `<p><strong>Actors:</strong> ${Actors}</p>`;
  movieelement.innerHTML += `<p><strong>Plot:</strong> ${Plot}</p>`;

  const movieposter = document.createElement('div');
  movieposter.classList.add('movie-poster');
  movieposter.innerHTML = `<img src="${Poster}" alt="Movie Poster"/>`;
  
  movieContainer.appendChild(movieposter);
  movieContainer.appendChild(movieelement);
  movieContainer.appendChild(moviegenreelement);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const moviename = inputbox.value.trim();

  if (moviename !== "") {
    findmovie(moviename);
  } else {
    movieContainer.innerHTML = `<p class="error-message">Please enter a movie name to search.</p>`;
  }
});
