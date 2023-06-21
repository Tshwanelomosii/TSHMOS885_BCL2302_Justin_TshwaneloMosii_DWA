
/**
 *
 * The main list of books page.
 * @module BookList
 */

import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

let page = 1; // Current page number
let matches = books; // List of books that match the search filters

/**
 * Creates a button element for a book jsDoc comments .
 * @param {Object} book - The book object.
 * @param {string} book.author - The author of the book.
 * @param {string} book.id - The ID of the book.
 * @param {string} book.image - The URL of the book's image.
 * @param {string} book.title - The title of the book.
 * @returns {HTMLButtonElement} The created button element.
 */// scripts.js
import { BOOKS_PER_PAGE, authors, books, genres } from "./data.js";
// Initialize page and matches
let page = 1;
let matches = books;
const starting = document.createDocumentFragment();
// Function to create a book preview element
function createBookPreview(book) {
  const element = document.createElement("book-preview");
  element.setAttribute("data-book", JSON.stringify(book));
  return element;
}
// create initial book preview elements
for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
  const element = createBookPreview(book);
  starting.appendChild(element);
}
document.querySelector("[data-list-items]").appendChild(starting);
// Function to create option elements for filters
function createOptionElements(container, defaultValue, options) {
  const fragment = document.createDocumentFragment();
  const firstElement = document.createElement("option");
  firstElement.value = defaultValue;
  firstElement.innerText = `All ${container}`;
  fragment.appendChild(firstElement);
  for (const [id, name] of Object.entries(options)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    fragment.appendChild(element);
  }
  document.querySelector(`[data-search-${container}]`).appendChild(fragment);
}
// Create option elements for genres and authors
createOptionElements("genres", "any", genres);
createOptionElements("authors", "any", authors);
const app = {
  // Initialize the app
  init() {
    document
      .querySelectorAll("[data-search-cancel]")
      .forEach((cancelButton) => {
        // Event listener for search cancel button
        cancelButton.addEventListener("click", () => {
          document.querySelector("[data-search-overlay]").open = false;
        });
      });
    document
      .querySelectorAll("[data-settings-cancel]")
      .forEach((cancelButton) => {
        // Event listener for data settings button
        cancelButton.addEventListener("click", () => {
          document.querySelector("[data-settings-overlay]").open = false;
        });
      });
    document
      .querySelector("[data-header-search]")
      .addEventListener("click", () => {
        // Event listener for header search button
        document.querySelector("[data-search-overlay]").open = true;
        document.querySelector("[data-search-title]").focus();
      });
    document
      .querySelector("[data-header-settings]")
      .addEventListener("click", () => {
        // Event listener for header settings button
        document.querySelector("[data-settings-overlay]").open = true;
      });
    document
      .querySelector("[data-list-close]")
      .addEventListener("click", () => {
        // Event listener for list close button
        document.querySelector("[data-list-active]").open = false;
      });
  },
};
// Initialize the app
app.init();
document
  .querySelector("[data-settings-form]")
  .addEventListener("submit", (event) => {
    // Event listener for settings form submission
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);
    const themes = {
      day: {
        dark: "10, 10, 20",
        light: "255, 255, 255",
      },
      night: {
        dark: "255, 255, 255",
        light: "10, 10, 20",
      },
    };
   // Apply selected theme
    if (theme === "night") {
      document.documentElement.style.setProperty(
        "--color-dark",
        themes.night.dark
      );
      document.documentElement.style.setProperty(
        "--color-light",
        themes.night.light
      );
    } else {
      document.documentElement.style.setProperty(
        "--color-dark",
        themes.day.dark
      );
      document.documentElement.style.setProperty(
        "--color-light",
        themes.day.light
      );
    }
    document.querySelector("[data-settings-overlay]").open = false;
  });
document.querySelector("[data-search-form]").addEventListener("submit", (event) => {
   // Event listener for search form submission
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];
   // Apply filters to the books
  for (const book of books) {
    let genreMatch = filters.genre === "any";
    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }
    if (
      (filters.title.trim() === "" ||
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === "any" || book.author === filters.author) &&
      genreMatch
    ) {
      result.push(book);
    }
  }
  page = 1;
  matches = result;
   // Show appropriate message based on search result
  if (result.length < 1) {
    document.querySelector("[data-list-message]").classList.add("list__message_show");
  } else {
    document.querySelector("[data-list-message]").classList.remove("list__message_show");
  }
  document.querySelector("[data-list-items]").innerHTML = "";
  const newItems = document.createDocumentFragment();
   // Update book preview elements based on search result
  for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
    const element = createBookPreview({ author, id, image, title });
    newItems.appendChild(element);
  }
  document.querySelector("[data-list-items]").appendChild(newItems);
  // Update "Show more" button and remaining count
  document.querySelector("[data-list-button]").disabled =
    matches.length - page * BOOKS_PER_PAGE < 1;
  document.querySelector("[data-list-button]").innerHTML = `
    <span>Show more</span>
    <span class="list__remaining">
      (${matches.length - page * BOOKS_PER_PAGE > 0
        ? matches.length - page * BOOKS_PER_PAGE
        : 0})
    </span>
  `;
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelector("[data-search-overlay]").open = false;
});
document.querySelector("[data-list-button]").addEventListener("click", () => {
 // Event listener fo "Show more" button
  const fragment = document.createDocumentFragment();
  for (const { author, id, image, title } of matches.slice(
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE
  )) {
    const element = createBookPreview({ author, id, image, title });
    fragment.appendChild(element);
  }
  document.querySelector("[data-list-items]").appendChild(fragment);
  page += 1;
   // Update "Show more" button and remaining count
  document.querySelector("[data-list-button]").disabled =
    matches.length - page * BOOKS_PER_PAGE < 1;
  document.querySelector("[data-list-button]").innerHTML = `
    <span>Show more</span>
    <span class="list__remaining">
      (${matches.length - page * BOOKS_PER_PAGE > 0
        ? matches.length - page * BOOKS_PER_PAGE
        : 0})
    </span>
  `;
});
document.querySelector("[data-list-items]").addEventListener("click", (event) => {
  // Event listener for clicking on book preview elements
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;
  for (const node of pathArray) {
    if (active) break;
    if (node?.dataset?.book) {
      const bookData = JSON.parse(node.dataset.book);
      active = bookData;
    }
  }
  if (active) {
    // Display the selected book's details
    document.querySelector("[data-list-active]").open = true;
    document.querySelector("[data-list-blur]").src = active.image;
    document.querySelector("[data-list-image]").src = active.image;
    document.querySelector("[data-list-title]").innerText = active.title;
    document.querySelector("[data-list-subtitle]").innerText = active.author;
    document.querySelector("[data-list-description]").innerText = active.description;
  }
});


// function createButtonElement(book) {
//   const { author,id, image, title, description } = book
//   const element = document.createElement('div');
//   element.classList.add('book-preview');
//   element.setAttribute('book-preview',id)
  
//   const imageElement = document.createElement('img');
//   imageElement.classList.add('book-preview__image');
//   imageElement.src = image;
//   element.appendChild(imageElement);
  
//   const infoElement = document.createElement('div');
//   infoElement.classList.add('book-preview__info');
  
//   const titleElement = document.createElement('h3');
//   titleElement.classList.add('book-preview__title');
//   titleElement.textContent = title;
//   infoElement.appendChild(titleElement);
  
//   const authorElement = document.createElement('div');
//   authorElement.classList.add('book-preview__author');
//   authorElement.textContent = authors[author];
//   infoElement.appendChild(authorElement);
  
//   const descriptionElement = document.createElement('div');
//   descriptionElement.classList.add('book-preview__description');
//   descriptionElement.textContent = description;
//   infoElement.appendChild(descriptionElement);
//   element.appendChild(infoElement);
//   return element;
// }
 
function createButtonElement(book) {
  const { author, id, image, title } = book;
  const previewElement = document.createElement('button');
  previewElement.classList.add('preview');
  previewElement.setAttribute('data-preview', id);

  const imageElement = document.createElement('img');
  imageElement.classList.add('previewimage');
  imageElement.src = image;
  previewElement.appendChild(imageElement);

  const infoElement = document.createElement('div');
  infoElement.classList.add('previewinfo');

  const titleElement = document.createElement('h3');
  titleElement.classList.add('previewtitle');
  titleElement.textContent = title;
  infoElement.appendChild(titleElement);

  const authorElement = document.createElement('div');
  authorElement.classList.add('previewauthor');
  authorElement.textContent = author;
  infoElement.appendChild(authorElement);

  previewElement.appendChild(infoElement);

  return previewElement;
}

console.log(createButtonElement);



  //Initializes the starting list of book items.
 
const initializeList = () => {
  const starting = document.createDocumentFragment();
  matches.slice(0, BOOKS_PER_PAGE).forEach((book) => {
    const element = createButtonElement(book);
    starting.appendChild(element);
  });

  document.querySelector('[data-list-items]').appendChild(starting);
};

/**
 * Creates an option element for a select dropdown.
 * @param {string} value - The value of the option.
 * @param {string} text - The text of the option.
 * @returns {HTMLOptionElement} The created option element.
 */
const createOptionElement = (value, text) => {
  const element = document.createElement('option');
  element.value = value;
  element.innerText = text;
  return element;
};

/**
 * Creates the options for the genre or author select dropdown.
 * @param {Object} data - The data object containing genres or authors.
 * @param {string} container - The name of the container (genres or authors).
 */
function initializePage() {
  const createOptions = (data, container) => {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createOptionElement('any', `All ${container}`));
    Object.entries(data).forEach(([id, name]) => {
      fragment.appendChild(createOptionElement(id, name));
    });
    document.querySelector(`[data-search-${container}]`).appendChild(fragment);
  };

  createOptions(genres, 'genres');
  createOptions(authors, 'authors');

  const settingsTheme = document.querySelector('[data-settings-theme]');
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  settingsTheme.value = prefersDarkMode ? 'night' : 'day';
  document.documentElement.style.setProperty('--color-dark', prefersDarkMode ? '255, 255, 255' : '10, 10, 20');
  document.documentElement.style.setProperty('--color-light', prefersDarkMode ? '10, 10, 20' : '255, 255, 255');

  const updateListButton = () => {
    const remaining = Math.max(matches.length - page * BOOKS_PER_PAGE, 0);
    const listButton = document.querySelector('[data-list-button]');
    listButton.innerHTML = `
      <span>Show more</span>
      <span class="list__remaining"> (${remaining})</span>
    `;
  };

  // Call the necessary functions to initialize the page
  createOptions(genres, 'genres');
  createOptions(authors, 'authors');
  updateListButton();
}

// Call the encapsulated function to initialize the page
initializePage();


// Event handler for the search cancel button click.
 const handleSearchCancel = () => {
  document.querySelector('[data-search-overlay]').open = false;
};

 //Event handler for the settings cancel button click.
 const handleSettingsCancel = () => {
  document.querySelector('[data-settings-overlay]').open = false;
};


// Event handler for the header search button click.
const handleHeaderSearchClick = () => {
  document.querySelector('[data-search-overlay]').open = true;
  document.querySelector('[data-search-title]').focus();
};

 //Event handler for the header settings button click.
const handleHeaderSettingsClick = () => {
  document.querySelector('[data-settings-overlay]').open = true;
};

//Event handler for the close list button click.
 const handleCloseListClick = () => {
  document.querySelector('[data-list-active]').open = false;
};

/**
 * Event handler for the settings form submit.
 * @param {Event} event - The form submit event.
 */
const handleSettingsFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  if (theme === 'night') {
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
  }

  document.querySelector('[data-settings-overlay]').open = false;
};

/**
 * Event handler for the search form submit.
 * @param {Event} event - The form submit event.
 */
const handleSearchFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  for (const book of books) {
    let genreMatch = filters.genre === 'any';

    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }

    if (
      (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === 'any' || book.author === filters.author) &&
      genreMatch
    ) {
      result.push(book);
    }
  }

  page = 1;
  matches = result;

  const listMessage = document.querySelector('[data-list-message]');
  listMessage.classList.toggle('list__message_show', result.length < 1);

  document.querySelector('[data-list-items]').innerHTML = '';
  const newItems = document.createDocumentFragment();

  result.slice(0, BOOKS_PER_PAGE).forEach((book) => {
    const element = createButtonElement(book);
    newItems.appendChild(element);
  });

  document.querySelector('[data-list-items]').appendChild(newItems);
  document.querySelector('[data-list-button]').disabled = (matches.length - page * BOOKS_PER_PAGE) < 1;

  updateListButton();

  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelector('[data-search-overlay]').open = false;
};

 //Event handler for the "Show more" button click.
 const handleListButtonClick = () => {
  const fragment = document.createDocumentFragment();

  matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE).forEach((book) => {
    const element = createButtonElement(book);
    fragment.appendChild(element);
  });

  document.querySelector('[data-list-items]').appendChild(fragment);
  page += 1;
  updateListButton();
};

/**
 * Event handler for the list items click.
 * @param {Event} event - The click event.
 */
const handleListItemsClick = (event) => {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) {
      active = books.find((book) => book.id === node.dataset.preview);
    }
  }

  if (active) {
    const listActive = document.querySelector('[data-list-active]');
    listActive.open = true;
    document.querySelector('[data-list-blur]').src = active.image;
    document.querySelector('[data-list-image]').src = active.image;
    document.querySelector('[data-list-title]').innerText = active.title;
    document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
    document.querySelector('[data-list-description]').innerText = active.description;
  }
};

document.querySelector('[data-search-cancel]').addEventListener('click', handleSearchCancel);
document.querySelector('[data-settings-cancel]').addEventListener('click', handleSettingsCancel);
document.querySelector('[data-header-search]').addEventListener('click', handleHeaderSearchClick);
document.querySelector('[data-header-settings]').addEventListener('click', handleHeaderSettingsClick);
document.querySelector('[data-list-close]').addEventListener('click', handleCloseListClick);
document.querySelector('[data-settings-form]').addEventListener('submit', handleSettingsFormSubmit);
document.querySelector('[data-search-form]').addEventListener('submit', handleSearchFormSubmit);
document.querySelector('[data-list-button]').addEventListener('click', handleListButtonClick);
document.querySelector('[data-list-items]').addEventListener('click', handleListItemsClick);

initializeList();
updateListButton();