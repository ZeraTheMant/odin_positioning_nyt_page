const clearSearch = document.querySelector("#clear-search");
const searchBox = document.querySelector("#search-box");
const searchBtn = document.querySelector("#search-btn");
const searchContainer = document.querySelector("#search-container");
const activateSearchBtn = document.querySelector("#activate-search-btn");
const categoryLink = document.querySelector("#category-link");
const menuBtn = document.querySelector("#clickable-menu-btn");
const sidebarWidescreen = document.querySelector("aside");
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
    e.target.lastElementChild.lastElementChild.innerHTML = "";
}

function displaySidebarSubBox(e) {
    //sidebarSideBox.classList.remove("hidden");
    const sidebarSideBox = document.createElement('div');
    sidebarSideBox.id = "sidebar-side-box";
    
    const x = document.createElement('div');
    x.id = "abc";
    const y = document.createElement('div');
    y.id = "def";
    x.appendChild(y);
    sidebarSideBox.appendChild(x);
    
    const sideBoxHeader = document.createElement('h5');
    sideBoxHeader.textContent = e.target.textContent.trim();
    sidebarSideBox.appendChild(sideBoxHeader);
    
    const rect = e.target.getBoundingClientRect();
	
    //e.target.lastElementChild.lastElementChild.appendChild(sidebarSideBox);
	
	const category = e.target.firstElementChild.textContent;
	const category_links_arr = SUB_BOX_CONTENTS[category];
    
	
	category_links_arr.forEach(cat_link => {
		const new_cat_link = document.createElement('a');
		new_cat_link.textContent = cat_link;
		sidebarSideBox.appendChild(new_cat_link);
	});
    
    e.target.lastElementChild.lastElementChild.appendChild(sidebarSideBox);
    
	if (rect.top >= (screen.height * 0.6)) {
        sidebarSideBox.style.bottom = ((window.innerHeight - rect.bottom) - 30) + "px";	
  
        const sidebarSideBoxRect = sidebarSideBox.getBoundingClientRect();  
        y.style.bottom = (((sidebarSideBoxRect.bottom - sidebarSideBoxRect.top) - 50) * -1) + "px";

	} else {
	    sidebarSideBox.style.top = (rect.top - 40) + "px";	
        y.style.top = "30px";
	}
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