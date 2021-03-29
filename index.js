const clearSearchBtns = document.querySelectorAll(".clear-search");
const searchBoxes = document.querySelectorAll(".search-box");
const searchBtns = document.querySelectorAll(".search-btn");
const searchContainers = document.querySelectorAll(".search-container");
const activateSearchBtn = document.querySelector("#activate-search-btn");
const categoryLink = document.querySelector("#category-link");
const menuBtn = document.querySelector("#clickable-menu-btn");
const sidebarWidescreen = document.querySelector("#desktop-view-sidebar");
const mobileViewSidebar = document.querySelector("#mobile-view-sidebar");
const withChildren = document.querySelectorAll(".with-children");
const mobileViewSidebarCloseBtn = document.querySelector("#mobile-view-sidebar-close-btn");
const userBtn = document.querySelector("#user-btn");
const main = document.querySelector("main");

var searchBoxDisplayed = false;
var sidebarDisplayed = false;

function searchBtnToggle(e) {
    if (e.target.value.trim() == "") {
		searchBtns.forEach(searchBtn => {
			searchBtn.disabled = true;
			searchBtn.classList.add("disabled-display");
			searchBtn.classList.remove("cursor");		
		});
    } else {
		searchBtns.forEach(searchBtn => {
			searchBtn.disabled = false;
			searchBtn.classList.remove("disabled-display");    
			searchBtn.classList.add("cursor");  
		});
    }
}

function toggleSearchBox() {
    clearSearchBoxes();
    
    if (searchBoxDisplayed) {
		searchContainers.forEach(searchContainer => {
			searchContainer.classList.add("hidden");
		});
        categoryLink.classList.remove("hidden");
    } else {
		searchContainers.forEach(searchContainer => {
			searchContainer.classList.remove("hidden");
		});
        categoryLink.classList.add("hidden");
    }
    
    searchBoxDisplayed = !searchBoxDisplayed;
}

function clearSearchBoxes() {
	searchBoxes.forEach(searchBox => {
		searchBox.value = "";
	});
}

function hideSidebarSubBox(e) {
    //sidebarSideBox.classList.add("hidden");
    e.target.lastElementChild.lastElementChild.innerHTML = "";
	sidebarDisplayed = false;
}

function displaySidebarSubBox(e) {
    //sidebarSideBox.classList.remove("hidden");
    const sidebarSideBox = document.createElement('div');
    sidebarSideBox.id = "sidebar-side-box";
    
    const thoughtArrowBubbleContainer = document.createElement('div');
    thoughtArrowBubbleContainer.id = "thought-arrow-bubble-container";
    const thoughtArrowBubble = document.createElement('div');
    thoughtArrowBubble.id = "thought-arrow-bubble";
    thoughtArrowBubbleContainer.appendChild(thoughtArrowBubble);
    sidebarSideBox.appendChild(thoughtArrowBubbleContainer);
    
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
        thoughtArrowBubble.style.bottom = (((sidebarSideBoxRect.bottom - sidebarSideBoxRect.top) - 50) * -1) + "px";

	} else {
	    sidebarSideBox.style.top = (rect.top - 40) + "px";	
        thoughtArrowBubble.style.top = "30px";
	}
}

function hideTheRest() {
	main.classList.add("hidden");
}

function showTheRest() {
	main.classList.remove("hidden");
}

clearSearchBtns.forEach(clearSearchBtn => {
	clearSearchBtn.addEventListener('click', clearSearchBoxes);
});

menuBtn.addEventListener('click', () => {
	if (window.innerWidth > 649) {
		sidebarWidescreen.classList.remove("hidden");	
	} else {
		if (mobileViewSidebarCloseBtn.classList.contains("hidden")) {
			mobileViewSidebarCloseBtn.classList.remove("hidden");
		}
		mobileViewSidebar.classList.remove("hidden");
		menuBtn.classList.add("hidden");
		userBtn.classList.add("hidden");
		hideTheRest();
	}
    sidebarDisplayed = true;
});

function hideMobileViewSidebarActions() {
	mobileViewSidebarCloseBtn.classList.add("hidden");
	mobileViewSidebar.classList.add("hidden");
	menuBtn.classList.remove("hidden");
	userBtn.classList.remove("hidden");
	showTheRest();
}

searchBoxes.forEach(searchBox => {
	searchBox.addEventListener('keyup', searchBtnToggle);
});

activateSearchBtn.addEventListener('click', toggleSearchBox);
sidebarWidescreen.addEventListener('mouseleave', () => {   
    setTimeout(() => { sidebarWidescreen.classList.add("hidden"); }, 500);
});

withChildren.forEach(link => {
   link.addEventListener('mouseenter', displaySidebarSubBox); 
   link.addEventListener('mouseleave', hideSidebarSubBox); 
});

mobileViewSidebarCloseBtn.addEventListener('click', () => {
	hideMobileViewSidebarActions();
});

window.addEventListener('resize', () => {
	if (window.innerWidth > 649) {
		hideMobileViewSidebarActions();
	}
});