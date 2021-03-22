const clearSearch = document.querySelector("#clear-search");
const searchBox = document.querySelector("#search-box");
const searchBtn = document.querySelector("#search-btn");
const searchContainer = document.querySelector("#search-container");
const activateSearchBtn = document.querySelector("#activate-search-btn");
const categoryLink = document.querySelector("#category-link");
var searchBoxDisplayed = false;

function searchBtnToggle(e) {
    if (e.target.value.trim() == "") {
        searchBtn.disabled = true;
        searchBtn.classList.add("disabled-display");
        searchBtn.classList.remove("cursor");
    } else {
        searchBtn.disabled = false;
        searchBtn.classList.remove("disabled-display");    
        searchBtn.classList.add("cursor");    
    }
}

function toggleSearchBox() {
    clearSearchBox();
    
    if (searchBoxDisplayed) {
        searchContainer.classList.add("hidden");
        categoryLink.classList.remove("hidden");
    } else {
        searchContainer.classList.remove("hidden");
        categoryLink.classList.add("hidden");
    }
    
    searchBoxDisplayed = !searchBoxDisplayed;
}

function clearSearchBox() {
    searchBox.value = "";
}

clearSearch.addEventListener('click', clearSearchBox);

searchBox.addEventListener('keyup', searchBtnToggle);
activateSearchBtn.addEventListener('click', toggleSearchBox);