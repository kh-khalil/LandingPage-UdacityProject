/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const para = document.querySelectorAll('.landing__container'); //selecting all paragraphs with this class
const sectionIdArray =[]; // pushing the id of each paragraph's parent to the array to use it later
const navBar = document.querySelector('#navbar__list'); // selecting the navigation bar by it's id
const header = document.getElementById("navbar1");
const mybutton = document.getElementById("myBtn");
const h1 = document.getElementById("LP");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

// pushing the id of each paragraph's parent to the array to use it later
for (let i = 0; i < para.length; i++) {
    sectionIdArray.push(para[i].parentNode.id) ;
}

sectionIdArray.map((id, i) => { //Adding diferent buttons of available sections 
    const htmlTextToAdd = `<li><a href=#${id} class="menu__link">section ${i+1}</a></li>>`;
    navBar.insertAdjacentHTML('beforeend', htmlTextToAdd);
})

// Add class 'active' to section when near top of viewport
const navBarElements = navBar.querySelectorAll("li"); //selecting all "li" elements inside navBar
const navBarElementsArray = []; // pushing all li elements inside the array to use it later
for (let i = 0; i < navBarElements.length; i++) {
    navBarElementsArray.push(navBarElements[i]) ;
} 

// This is used to check if the section is in our view port or not 
const isInViewport = el => { 
    const rect = el.getBoundingClientRect();
    return (
        rect.top + (el.clientHeight/2) >= 0 && // I used el(which is the active element) and get it's height/2 to get 1/2 the height of the section
        rect.left >= 0 &&
        rect.bottom  - (el.clientHeight/2) <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
} 
// Creating two functions to change the class name to active of the section which is in view port
const activateSection = el => el.classList.add('your-active-class');
const deactivateSection = el => el.classList.remove('your-active-class');     

// mapping over the id of the available para so that the event listner function is available for each section
// eventlistner fn says when scrolling, check if any section is in viewport or not. if so, change it's class to active and change it in navBar also
sectionIdArray.map( (id, i) => {
    document.addEventListener('scroll', function () {
        let sectionParentElement = document.querySelector(`#${id}`);
        if(isInViewport(sectionParentElement)) {
            activateSection(sectionParentElement);
            navBarElementsArray[i].querySelector("a").classList.add('active');
        } else {
            deactivateSection(sectionParentElement);
            navBarElementsArray[i].querySelector("a").classList.remove('active');
        }
    }, {
        passive: true
    });
})

const scrollStop = function (callback) {
	// Make sure a valid callback was provided
	if (!callback || typeof callback !== 'function') return;
	// Setup scrolling variable
	let isScrolling;
	// Listen for scroll events
	window.addEventListener('scroll', function (event) {
        if (isInViewport(h1)) {
            header.style.top = "100";
        } else {
            // Clear our timeout throughout the scroll
            window.clearTimeout(isScrolling);
            header.style.top = "0";
            // Set a timeout to run after scrolling ends
            isScrolling = setTimeout(function() {

                // Run the callback
                callback();
            }, 300);
        }
	}, false);

};

scrollStop(function () {
    header.style.top = "-100px";
});


// When the user scrolls down 2*h1.height from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > (2*h1.clientHeight) 
    || document.documentElement.scrollTop > (2*h1.clientHeight)) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
document.documentElement.style.scrollBehavior = "smooth";


// Set para as active


