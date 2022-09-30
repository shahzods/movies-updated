const elMovieList = document.querySelector(".movie__list");
const elResult = document.querySelector(".movie__result-num");
const elSelect = document.querySelector(".select");
const elForm = document.querySelector(".form");
const elBookmarkList = document.querySelector(".bookmark-list");

const bookmarks = [];

elResult.textContent = films.length;

elSelect.innerHTML = null;

elBookmarkList.addEventListener("click", function (evt) {
  if (evt.target.matches(".deleteBookmarkBtn")) {
    const bookmarkDeleteBtnId = evt.target.dataset.deleteBookmarkBtnId;
    const foundBookmarkDeleteIndex = bookmarks.findIndex(
      (bookmark) => bookmark.id === bookmarkDeleteBtnId
    );

    bookmarks.splice(foundBookmarkDeleteIndex, 1);

    elBookmarkList.innerHTML = null;

    renderBookmarks(bookmarks, elBookmarkList);
  }
});

const renderBookmarks = function (arr, htmlElement) {
  arr.forEach((bookmark) => {
    const newItem = document.createElement("li");
    const newRemoveBookmarkBtn = document.createElement("button");

    newItem.textContent = bookmark.title;
    newRemoveBookmarkBtn.textContent = "Delete";

    newRemoveBookmarkBtn.classList.add("deleteBookmarkBtn");
    newRemoveBookmarkBtn.dataset.deleteBookmarkBtnId = bookmark.id;

    htmlElement.appendChild(newItem);
    newItem.appendChild(newRemoveBookmarkBtn);
  });
};

elMovieList.addEventListener("click", function (evt) {
  if (evt.target.matches(".bookmark-btn")) {
    const bookmarkBtnId = evt.target.dataset.bookmarkBtnId;
    const foundBookmark = films.find((film) => film.id === bookmarkBtnId);

    if (!bookmarks.includes(foundBookmark)) {
      bookmarks.push(foundBookmark);

      elBookmarkList.innerHTML = null;

      renderBookmarks(bookmarks, elBookmarkList);
    }
  }
});

const renderGenres = function (arr) {
  const uniqueGenres = [];

  arr.forEach((film) => {
    film.genres.forEach((genre) => {
      if (!uniqueGenres.includes(genre)) {
        uniqueGenres.push(genre);
      }
    });
  });

  uniqueGenres.forEach((genre) => {
    const genreOption = document.createElement("option");

    genreOption.textContent = genre;
    genreOption.value = genre;

    elSelect.appendChild(genreOption);
  });
};

const renderMovies = function (filmsArr, htmlElement) {
  filmsArr.forEach((movie) => {
    //CREATE ELEMENT
    const newLi = document.createElement("li");
    const newImg = document.createElement("img");
    const newDiv = document.createElement("div");
    const newTitle = document.createElement("h5");
    const newLanguage = document.createElement("p");
    const newYear = document.createElement("p");
    const genresList = document.createElement("ul");
    const bookmarkBtn = document.createElement("button");

    //SET ATTTIBUTE
    newLi.setAttribute("class", "card mb-3");
    newLi.style.width = "18rem";
    newImg.classList.add("card-img-top");
    newImg.setAttribute("src", movie.poster);
    newDiv.classList.add("card-body");
    newTitle.classList.add("card-title");
    newLanguage.classList.add("card-text");
    newYear.classList.add("card-text");
    bookmarkBtn.setAttribute("class", "bookmark-btn btn btn-primary mt-2");

    // TEXT CONTENT:
    newTitle.textContent = movie.title;
    newYear.textContent = movie.year;
    bookmarkBtn.textContent = "Bookmark";

    movie.genres.forEach((genre) => {
      const genresItem = document.createElement("li");

      genresItem.textContent = genre;

      genresList.appendChild(genresItem);
    });

    //DATASET
    bookmarkBtn.dataset.bookmarkBtnId = movie.id;

    //APPEND
    htmlElement.appendChild(newLi);
    newLi.appendChild(newImg);
    newLi.appendChild(newDiv);
    newDiv.appendChild(newTitle);
    // newDiv.appendChild(newLanguage);
    newDiv.appendChild(newYear);
    newDiv.appendChild(genresList);
    newDiv.appendChild(bookmarkBtn);
  });
};

renderMovies(films, elMovieList);
renderGenres(films);

elForm.addEventListener("submit", function (evtjon) {
  evtjon.preventDefault();

  elMovieList.innerHTML = null;

  const selectValue = elSelect.value;

  const selectedMovies = [];

  films.forEach((film) => {
    if (film.genres.includes(selectValue)) {
      selectedMovies.push(film);
    }
  });

  renderMovies(selectedMovies, elMovieList);
});
