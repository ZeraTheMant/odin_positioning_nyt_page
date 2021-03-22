const clearSearch = document.querySelector("#clear-search");
const searchBox = document.querySelector("#search-box");
const searchBtn = document.querySelector("#search-btn");
const searchContainer = document.querySelector("#search-container");
const activateSearchBtn = document.querySelector("#activate-search-btn");
const categoryLink = document.querySelector("#category-link");
const menuBtn = document.querySelector("#clickable-menu-btn");
const sidebarWidescreen = document.querySelector("aside");
//const sidebarSideBox = document.querySelector("#testes");
const withChildren = document.querySelectorAll(".with-children");

var searchBoxDisplayed = false;
var sidebarDisplayedWidescreen = false;
var x = false;

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

function hideSidebarSubBox(e) {
    //sidebarSideBox.classList.add("hidden");
    sidebarSideBoxDisplayed = false;
    e.target.lastElementChild.lastElementChild.innerHTML = "";
}

function displaySidebarSubBox(e) {
    //sidebarSideBox.classList.remove("hidden");
    const a = document.createElement('div');
    a.id = "testes";
    sidebarSideBoxDisplayed = true;
    
    const rect = e.target.getBoundingClientRect();
    a.style.top = (rect.top - 40) + "px";
    e.target.lastElementChild.lastElementChild.appendChild(a)
}

clearSearch.addEventListener('click', clearSearchBox);
menuBtn.addEventListener('click', () => {
    sidebarWidescreen.classList.remove("hidden");
    sidebarDisplayedWidescreen = true;
});

searchBox.addEventListener('keyup', searchBtnToggle);
activateSearchBtn.addEventListener('click', toggleSearchBox);
sidebarWidescreen.addEventListener('mouseleave', () => {   
    setTimeout(() => { sidebarWidescreen.classList.add("hidden"); }, 500);
});

withChildren.forEach(link => {
   link.addEventListener('mouseenter', displaySidebarSubBox); 
   link.addEventListener('mouseleave', hideSidebarSubBox); 
});