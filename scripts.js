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
  element.setAttribute("data-preview", id);
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
// html.list.button.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;

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

/**s a default "All Authors" option
 * and additional author options based on the provided authors obj
 * Creates an HTML document fragment containing author options.
 *
 * This function generates an HTML document fragment that includeect.
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

// show book event where you close it
html.list.close.addEventListener("click", () => {
  html.list.overlay.removeAttribute("open");
});

// matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE

// matches.slice(page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE) // books.slice(0, 36)

// data-list-button.click() {
// when you click the button it appends new book buttons to the bottem of the page
// changes page variable to plus 1
// should update button with total amount of books left
//   html.list.items.appendChild(createPreviewsFragment(matches, `${page} x ${BOOKS_PER_PAGE}`, `${page + 1} x ${BOOKS_PER_PAGE}`))
// actions.list.updateRemainingButton()
//     page = page + 1
// }
// when you click the button it appends new book buttons to the bottem of the page
// changes page variable to plus 1
// should update button with total amount of books left
html.list.button.addEventListener("click", () => {
  page = page + 1;
  html.list.items.appendChild(createPreviewsFragment(matches, page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE));
  // updateRemainingButton();
});

// data-search-form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//         }

//         if titleMatch && authorMatch && genreMatch => result.push(book)
//     }

//     if display.length < 1
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')

//     data-list-items.innerHTML = ''
//     // const fragment = document.createDocumentFragment()
//     // const extractedBooks = source.slice(range[0], range[1])

//     // for ({ author, image, title, id }; extractedBooks; i++) {
//     //     const { author: authorId, id, image, title } = props

//     //     element = document.createElement('button')
//     //     element.classList = 'preview'
//     //     element.setAttribute('data-preview', id)

//     //     element.innerHTML = /* html */ `
//     //         <img
//     //             class="preview__image"
//     //             src="${image}"
//     //         />

//     //         <div class="preview__info">
//     //             <h3 class="preview__title">${title}</h3>
//     //             <div class="preview__author">${authors[authorId]}</div>
//     //         </div>
//     //     `

//     //     fragment.appendChild(element)
//     // }

//     // data-list-items.appendChild(fragments)
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     data-list-button.disabled = initial > 0

//     data-list-button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false
// }

// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay).open === false
// }

// data-list-items.click() {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if active break;
//         const previewId = node?.dataset?.preview

//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         }
//     }

//     if !active return
//     data-list-active.open === true
//     data-list-blur + data-list-image === active.image
//     data-list-title === active.title

//     data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     data-list-description === active.description

// }

// Open search menu
html.search.button.addEventListener("click", event => {
  html.search.overlay.setAttribute("open", "");
  html.search.title.focus();
});
// Close search menu
html.search.cancel.addEventListener("click", event => {
  html.search.overlay.removeAttribute("open");
  html.search.form.reset();
});

// Open settings menu
html.settings.button.addEventListener("click", event => {
  html.settings.overlay.setAttribute("open", "");
});
// Close settings menu
html.settings.cancel.addEventListener("click", event => {
  html.settings.overlay.removeAttribute("open");
});
