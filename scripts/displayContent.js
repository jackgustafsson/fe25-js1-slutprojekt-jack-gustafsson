import _ from "https://cdn.jsdelivr.net/npm/underscore@1.13.7/underscore-esm-min.js";
import { getMovie } from "./api.js";
import { showMessage } from "./functions.js";

/**
 * displayContent.js är presentationslagret i applikationen där den översätter rå API-data till användarvänliga HTML-element. 
 * Här skapas DOM-strukturer, innehåll för filmer och personer visas och interaktivitet läggs till.
 */

export function displayTenMovies(movies, container) {
  console.log(movies);

  _.each(_.first(movies, 10), movie => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="Image on a movie">
        <p><strong>Title:</strong> ${movie.title}</p>
        <br>
        <p><strong>Release date:</strong> ${movie.release_date}</p>
        <br>
        `;

    container.append(div);
  });
}

export function displayMovies(movies, container) {
  console.log(movies);

  _.each(movies, movie => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="Image on a movie">
        <p><strong>Title:</strong> ${movie.title}</p>
        <br>
        <p><strong>Release date:</strong> ${movie.release_date}</p>
        <br>
        <p><strong>Description:</strong> ${movie.overview}</p>
        <br>
        `;

    const btn = document.createElement("button");
    const genreContainer = document.createElement("div");
    const genreTitle = document.createElement("p");
    const ul = document.createElement("ul");

    btn.classList.add("moreInfoButton");
    genreContainer.classList.add("genre-container");
    ul.classList.add("ulContainer");

    btn.textContent = "Show more";
    genreTitle.innerHTML = "<strong>Genres:</strong>";

    //Används för att hålla koll på vilka genrer som redan hämtats så att samma API-anrop inte görs flera gånger i onödan
    let dataLoaded = false; 

    btn.addEventListener("click", () => {
      if (!dataLoaded) {
        getMovie(movie.id).then(movieData => {
          console.log(movieData);

          if(!movieData.genres || movieData.genres.length === 0){
              showMessage(ul, "No genres found");
              dataLoaded = true; 
              return;
          }
            
          _.each(movieData.genres, genre => {
            const li = document.createElement("li");
            li.textContent = genre.name;
            ul.appendChild(li);
          });

          dataLoaded = true;
        })
        .catch(error => {
            console.error("Movie genres failed:", error);
            showMessage(ul, "Something went wrong while retrieving genres");
            dataLoaded = true;
        })
      }

      genreContainer.classList.toggle("show");
      btn.textContent = genreContainer.classList.contains("show") ? "Show less": "Show more";
    });

    genreContainer.append(genreTitle, ul);
    div.append(genreContainer, btn);
    container.append(div);
  });
}

export function displayPeople(people, container) {
  console.log(people);

  _.each(people, person => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w300/${person.profile_path}" alt="Image on a person">
        <p><strong>Name:</strong> ${person.name}</p>
        <br>
        <p><strong>Known for department:</strong> ${person.known_for_department}</p>
        <br>
        `;

    const knownForTitle = document.createElement("p");
    knownForTitle.innerHTML = "<strong>Known for:</strong>";
    div.appendChild(knownForTitle);

    const ul = document.createElement("ul");
    ul.classList.add("ulContainer");

    if(!person.known_for || person.known_for.length === 0) showMessage(ul, "No media found");
    
    _.each(person.known_for, item => {
      const li = document.createElement("li");
      const mediaType = item.media_type.charAt(0).toUpperCase() + item.media_type.slice(1);
      const title = item.title || item.name || "Unknown";
      li.textContent = `${mediaType}: ${title}`;
      ul.appendChild(li);
    });

    div.appendChild(ul);
    container.append(div);
  });
}
