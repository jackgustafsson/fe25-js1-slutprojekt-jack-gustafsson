import _ from "https://cdn.jsdelivr.net/npm/underscore@1.13.7/underscore-esm-min.js";

/**
 * functions.js innehåller återanvändbara hjälpfunktioner som förenklar användarupplevelsen.
 * Koden ansvarar bland annat för att rensa och bygga om DOM:en, styra navigering och visning samt visa meddelanden.
 */

export function showMessage(container, message) {
  container.innerHTML = "";
  const pEl = document.createElement("p");
  pEl.classList.add("pElement")
  container.appendChild(pEl);
  pEl.textContent = message;
}

export function toggleMovieContent() {
  const elementsContainer = document.querySelectorAll(".elementsContainer");

  _.each(elementsContainer, element => {
    const btn = element.querySelector(".toggle-btn");
    const content = element.querySelector(".movie-content");

    const originalText = btn.textContent;

    btn.addEventListener("click", () => {
      const isVisible = content.classList.toggle("show");
      if (isVisible) btn.textContent = originalText.replace(/^Show/, "Hide");
      else btn.textContent = originalText;
    });
  });
}

export function createElements(main) {
  main.innerHTML = "";

  const elements = {
    buttonContainer: document.createElement("div"),
    movieHeader: document.createElement("h1"),
    moviesContainer: document.createElement("div"),
    peopleHeader: document.createElement("h1"),
    peopleContainer: document.createElement("div"),
  };

  elements.buttonContainer.classList.add("buttonContainer");
  elements.movieHeader.classList.add("movieHeader");
  elements.moviesContainer.classList.add("movies-grid");
  elements.peopleHeader.classList.add("peopleHeader");
  elements.peopleContainer.classList.add("people-grid");

  elements.movieHeader.textContent = "Movies";
  elements.peopleHeader.textContent = "People";

  createBackButton(elements.buttonContainer);
  jumpToPeopleSection(elements.buttonContainer);

  _.each(elements, element => main.appendChild(element));

  return elements;
}

function createBackButton(parent) {
  const button = document.createElement("button");
  button.textContent = "Back";
  button.classList.add("backButton");
  parent.appendChild(button);

  button.addEventListener("click", () => location.reload());
}

function jumpToPeopleSection(parent) {
  const button = document.createElement("button");
  button.textContent = "Go down to people";
  button.classList.add("jumpToPeopleSection");

  button.addEventListener("click", () => {
    const peopleSection = document.querySelector(".peopleHeader");
    peopleSection.scrollIntoView();
  });

  parent.appendChild(button);
}
