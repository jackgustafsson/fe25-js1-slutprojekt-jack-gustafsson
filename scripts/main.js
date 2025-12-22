import _ from "https://cdn.jsdelivr.net/npm/underscore@1.13.7/underscore-esm-min.js";
import {getTopRatedMovies, getPopularMovies, getMoviesBySearch, getPeopleBySearch} from "./api.js";
import {displayTenMovies, displayMovies, displayPeople} from "./displayContent.js";
import {showMessage, createElements, toggleMovieContent} from "./functions.js";

/**
 * main.js är huvudlogiken för webbapplikationen som låter användaren att upptäcka, söka och utforska filmer och person via ett externt API.
 * Koden ansvarar för bland annat sökfunktionalitet, visning av filmer och personer, sortering efter popularitet samt fel- och offline hantering.
 * Detta med hjälp av importerade funktioner från olika moduler
 */

const main = document.querySelector("main");
const form = document.querySelector("form");
const contentContainer = document.querySelector(".contentContainer");

form.addEventListener("submit", event => {
  event.preventDefault();
  const searchValue = document.getElementById("searchField").value.trim();
  if (!searchValue) return;

  const { moviesContainer, peopleContainer } = createElements(main);

  getMoviesBySearch(searchValue)
    .then(results => {
      if (!results.length) {
        showMessage(moviesContainer, "No movies found for your search.");
        return;
      }
      const sorted = _.sortBy(results, movie => movie.popularity || 0).reverse();
      displayMovies(sorted, moviesContainer);
    })
    .catch(error => {
      console.error("Movie search failed:", error);
      showMessage(moviesContainer, "Something went wrong while retrieving movies.");
    });

  getPeopleBySearch(searchValue)
    .then(results => {
      if (!results.length) {
        showMessage(peopleContainer, "No people found for your search.");
        return;
      }
      const sorted = _.sortBy(results, person => person.popularity || 0).reverse();
      displayPeople(sorted, peopleContainer);
    })
    .catch(error => {
      console.error("People search failed:", error);
      showMessage(peopleContainer, "Something went wrong while retrieving people.");
    });
});

toggleMovieContent();
const topRatedContainer = document.getElementById("top-rated");
const popularMoviesContainer = document.getElementById("popular-movies");

getTopRatedMovies()
  .then(movies => {
    if (!movies || movies.length === 0) {
      showMessage(topRatedContainer, "No top rated movies found.");
      return;
    }
    displayTenMovies(movies, topRatedContainer);
  })
  .catch(error => {
    console.error("Top rated movies failed:", error);
    showMessage(topRatedContainer, "Something went wrong while retrieving top rated movies.");
  });

getPopularMovies()
  .then(movies => {
    if (!movies || movies.length === 0) {
      showMessage(popularMoviesContainer, "No popular movies found.");
      return;
    }
    displayTenMovies(movies, popularMoviesContainer);
  })
  .catch(error => {
    console.error("Popular movies failed:", error);
    showMessage(popularMoviesContainer, "Something went wrong while retrieving popular movies.");
  });

//Visar felmeddelandet när användaren stänger av nätverket på datorn
if (!navigator.onLine) showMessage(contentContainer, "You are offline. Please check your internet connection.");

//Visar felmeddelande när användaren ställer in nätverket på offline via devtools
window.addEventListener("offline", () => {
  showMessage(contentContainer, "You are offline. Please check your internet connection.");
});

//Slås den på igen laddas sidan om
window.addEventListener("online", () => location.reload());