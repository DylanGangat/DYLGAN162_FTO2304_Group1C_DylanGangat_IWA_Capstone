import { BOOKS_PER_PAGE, authors, genres, books, html } from "./data.js";
// Uses the length ofthe books object through the code
const matches = books;
let page = 1;

// if (!books && !Array.isArray(books)) throw new Error("Source required");
// if (!range && range.length < 2) throw new Error("Range must be an array with two numbers");

const css = {
  day: {
    dark: "10, 10, 20",
    light: "255, 255, 255",
  },

  night: {
    dark: "255, 255, 255",
    light: "10, 10, 20",
  },
};

/**
 * Creates a book preview as a button element with the provided book information.
 * @param {Object} book - The book object containing details of the book.
 * @param {string} book.author - The ID of the book's author.
 * @param {string} book.id - The unique ID of the book.
 * @param {string} book.image - The URL of the book's cover image.
 * @param {string} book.title - The title of the book.
 * @returns {HTMLButtonElement} The generated button element representing the book preview.
 */
const createPreview = book => {
  const { author: authorId, id, image, title } = book;
  const element = document.createElement("button");
  element.className = "preview";
  element.dataset.preview = id;
  element.innerHTML = /* html */ `
              <img
                  class="preview__image"
                  src="${image}"
              />

              <div class="preview__info">
                  <h3 class="preview__title">${title}</h3>
                  <div class="preview__author">${authors[authorId]}</div>
              </div>
          `;
  return element;
};

/**
 * Updates the "Show more" button with the correct text and state based on the current page and book data.
 * The function calculates the number of remaining books based on the current page and books per page,
 * and then updates the button's text content and disabled state accordingly.
 *
 */

const updateRemainingButton = () => {
  const remainingBooksCount = matches.length - page * BOOKS_PER_PAGE;
  const remainingBooksDisplay = remainingBooksCount > 0 ? remainingBooksCount : 0;
  // Set the text content of the button to display the total number of books and "Show more".
  html.list.button.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
  // Disable the button if there are no remaining books to show.
  html.list.button.disabled = !(remainingBooksCount > 0);
  html.list.button.innerHTML = /* html */ `
  <span>Show more</span>
  <span class="list__remaining"> (${remainingBooksDisplay})</span>
`;
};

// const fragment = document.createDocumentFragment();
// const extractedBooks = books.slice(0, 36);
// //  Loops through the extractedBooks Array and creates a list of book previews and appends them to the HTML document.
// for (const book of extractedBooks) {
//   const preview = createPreview(book);
//   fragment.appendChild(preview);
// }

// html.list.items.appendChild(fragment);

/**
 * Creates a document fragment containing previews of books from the given matches array.
 *
 * @param {Array} matches - The array containing book data.
 * @param {number} [startIndex=0] - The index to start extracting books from the matches array.
 * @param {number} [endIndex=36] - The index to end extracting books from the matches array.
 * @returns {DocumentFragment} The document fragment containing book previews.
 */
const createPreviewsFragment = (matches, startIndex = 0, endIndex = 36) => {
  const fragment = document.createDocumentFragment();

  const extractedBooks = matches.slice(startIndex, endIndex);

  //  Loops through the extractedBooks Array and creates a list of book previews and appends them to the HTML document.
  for (const book of extractedBooks) {
    const preview = createPreview(book);
    fragment.appendChild(preview);
  }
  updateRemainingButton();

  return fragment;
};

html.list.items.appendChild(createPreviewsFragment(matches));

/**
 * Creates an HTML document fragment containing genre options.
 *
 * This function generates an HTML document fragment that includes a default "All Genres" option
 * and additional genre options based on the provided genres object.
 *
 * @returns {DocumentFragment} The HTML document fragment with genre options.
 */

const createGenreOptionsHtml = () => {
  const fragment = document.createDocumentFragment();
  /**
   * Default "All Genres" option.
   * @type {HTMLOptionElement}
   */
  const allGenresOption = document.createElement("option");
  allGenresOption.value = "any";
  allGenresOption.innerText = "All Genres";
  fragment.appendChild(allGenresOption);

  for (const [id, name] of Object.entries(genres)) {
    /**
     * Genre option element.
     * @type {HTMLOptionElement}
     */
    const genreOption = document.createElement("option");
    genreOption.value = id;
    genreOption.innerText = name;
    fragment.appendChild(genreOption);
  }

  return fragment;
};

html.search.genres.appendChild(createGenreOptionsHtml());

/**
 * Creates a document fragment containing HTML options for a list of authors.
 *
 * * This function generates an HTML document fragment that includes a default "All Authors" option
 * and additional author options based on the provided authors object.
 *
 * @returns {DocumentFragment} The HTML document fragment with author options.
 */

const createAuthorOptionsHtml = () => {
  const fragment = document.createDocumentFragment();
  /**
   * Default "All Authors" option.
   * @type {HTMLOptionElement}
   */
  const allAuthorsOption = document.createElement("option");
  allAuthorsOption.value = "any";
  allAuthorsOption.innerText = "All Authors";
  fragment.appendChild(allAuthorsOption);

  for (const [id, name] of Object.entries(authors)) {
    /**
     * Author option element.
     * @type {HTMLOptionElement}
     */
    const authorOption = document.createElement("option");
    authorOption.value = id;
    authorOption.innerText = name;
    fragment.appendChild(authorOption);
  }
  return fragment;
};

html.search.authors.appendChild(createAuthorOptionsHtml());

// /* ========================================== DARK + LIGHT MODE THEME START ========================================= */
// // Dark + Light Theme mode
// // Putting it all together, the code checks if the user's device or browser environment supports dark mode. If the user prefers dark mode, the expression will evaluate to true. If the user doesn't prefer dark mode or their device/browser doesn't support the window.matchMedia method, the expression will evaluate to false.
// data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'

// document.documentElement.style.setProperty('--color-dark', css[v].dark);
// document.documentElement.style.setProperty('--color-light', css[v].light);

// /* ========================================== MORE BUTTON WITH DYNAMIC BOOKS NUMBER ========================================== */

// /* ==========================================  EVENT LISTENERS ========================================== */

// Dark theme settings where you sumbit data
// data-settings-form.submit() { actions.settings.submit }
html.settings.form.addEventListener("submit", event => {
  event.preventDefault();
  const { value } = html.settings.theme;
  //   html.other["theme"] = value;
});

// close book preview overlay
html.list.close.addEventListener("click", () => {
  html.list.overlay.open = false;
});

/**
 * Event listener for the "click" event on the list button.
 * Increases the current page number, appends new book previews to the list, and updates the "Show more" button.
 *
 * @listens click
 */
html.list.button.addEventListener("click", () => {
  page = page + 1;
  html.list.items.appendChild(createPreviewsFragment(matches, page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE));
});

/**
 * Filter for submitting the form data and showing the book previews in the html
 */
// html.search.form.addEventListener("click", event => {
//   event.preventDefault();
//   const formData = new FormData(event.target);
//   const filters = Object.fromEntries(formData);
//   console.log("filters: ", formData, filters);
//   const result = [];

//   // for (book; booksList; i++) {
//   //     titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//   //     authorMatch = filters.author = 'any' || book.author === filters.author

//   //     {
//   //         genreMatch = filters.genre = 'any'
//   //         for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//   //     }

//   //     if titleMatch && authorMatch && genreMatch => result.push(book)
//   // }

//   // if display.length < 1
//   // data-list-message.class.add('list__message_show')
//   // else data-list-message.class.remove('list__message_show')

//   // data-list-items.innerHTML = ''

//   // const fragment = document.createDocumentFragment()
//   // const extractedBooks = source.slice(range[0], range[1])

//   // for ({ author, image, title, id }; extractedBooks; i++) {
//   //     const { author: authorId, id, image, title } = props

//   //     element = document.createElement('button')
//   //     element.classList = 'preview'
//   //     element.setAttribute('data-preview', id)

//   //     element.innerHTML = /* html */ `
//   //         <img
//   //             class="preview__image"
//   //             src="${image}"
//   //         />

//   //         <div class="preview__info">
//   //             <h3 class="preview__title">${title}</h3>
//   //             <div class="preview__author">${authors[authorId]}</div>
//   //         </div>
//   //     `

//   //     fragment.appendChild(element)
//   // }

//   // data-list-items.appendChild(fragments)
//   // initial === matches.length - [page * BOOKS_PER_PAGE]
//   // remaining === hasRemaining ? initial : 0
//   // data-list-button.disabled = initial > 0

//   // data-list-button.innerHTML = /* html */ `
//   //     <span>Show more</span>
//   //     <span class="list__remaining"> (${remaining})</span>
//   // `

//   // window.scrollTo({ top: 0, behavior: 'smooth' });
//   // data-search-overlay.open = false
// });

/**
 * Theme mode
 */
// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay).open === false
// }

/**
 * Event listener function to handle click events on list items and displays book preview overlay.
 *
 * @param {Event} event - The click event object.
 */
html.list.items.addEventListener("click", event => {
  // Array of all the elements nodes the event.target will bubble up from.
  const pathArray = Array.from(event.path || event.composedPath());
  /**
   * Stores the active book object.
   * @type {Object|null}
   */
  let active;

  /**
   * Loop through the DOM elements in the path to find the book with matching ID.
   */
  for (const node of pathArray) {
    if (active) break;

    /**
     * Extract the previewId from the element's dataset.
     * @type {string|undefined}
     */
    const previewId = node?.dataset?.preview;

    /**
     * If no previewId is found, skip to the next element in the pathArray.
     */
    if (!previewId) continue;
    /**
     * Search for the book with matching id in the "books" array and asssign active = book.
     */
    for (const singleBook of books) {
      if (singleBook.id === previewId) {
        active = singleBook;
        break;
      }
    }
  }

  if (!active) return;

  const { image, title, author, published, description } = active;

  html.list.blur.src = image;
  html.list.image.src = image;
  html.list.title.innerText = title;
  html.list.subtitle.innerText = `${authors[author]} (${new Date(published).getFullYear()})`;
  html.list.description.innerText = description;

  html.list.overlay.open = true;
});

// Function to handle the search button click event and open the search overlay
const handleSearchButtonClick = event => {
  html.search.overlay.open = true;
  html.search.title.focus();
};

// Function to handle the search cancel button click event and close the search overlay
const handleSearchCancelClick = event => {
  html.search.overlay.open = false;
  html.search.form.reset();
};

// Function to handle the settings button click event and open the settings overlay
const handleSettingsButtonClick = event => {
  html.settings.overlay.open = true;
};

// Function to handle the settings cancel button click event and close the settings overlay
const handleSettingsCancelClick = event => {
  html.settings.overlay.open = false;
};

// Open search menu
html.search.button.addEventListener("click", handleSearchButtonClick);
// Close search menu
html.search.cancel.addEventListener("click", handleSearchCancelClick);
// Open settings menu
html.settings.button.addEventListener("click", handleSettingsButtonClick);
// Close settings menu
html.settings.cancel.addEventListener("click", handleSettingsCancelClick);
