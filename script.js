
/*************************************************************************************
                               MENU FUNCTIONALITY
*************************************************************************************/


const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const menu = document.querySelector(".navBarContainer");
const allNavLinks = document.querySelectorAll(".navLink");



/*
    Function that will Switch Classes within one element .
    example:First activiation=> show the menu by adding a class that will add 50vw.
            Second Activation=> hide the menu by removing the class that will add 50vw
*/

function switchBetweenStates(el,className) {
    el.classList.toggle(`${className}`);
}

/*
    Function that will Switch Classes between two elements.
    Example:First activation=> hide first btn and show second button
          Second Activation=> show first btn and hide second button(initial state)
*/
function switchBetweentogglers(el1, el2, commonClassName) {
    el1.classList.toggle(`${commonClassName}`);
    el2.classList.toggle(`${commonClassName}`);
    switchBetweenStates(menu, "showMenu");
}

// Adding event listener and using bind to feed the functions with arguments

openMenu.addEventListener("click", switchBetweentogglers.bind(this, openMenu, closeMenu, "hide"));
closeMenu.addEventListener("click", switchBetweentogglers.bind(this, openMenu, closeMenu, "hide"));
allNavLinks.forEach(item => {
    item.addEventListener("click", switchBetweentogglers.bind(this, openMenu, closeMenu, "hide"));
})

/*************************************************************************************
                Assign the menu link to the section it's at
*************************************************************************************/


let exploreSection = document.getElementById("home");
let memoriesSection = document.getElementById("memories");
let packagesSection = document.getElementById("packages");
let allNavItems = document.querySelectorAll(".navLink");

function markSection(sectionName) {
    allNavItems.forEach(item => {
       if(item.getAttribute("data-section") === sectionName.toLowerCase())
        item.classList.add("active");
        else
        item.classList.remove("active");        
    })
}

function AddMark() {
    let navHeight = document.querySelector("nav").offsetHeight;
    document.getElementById("html").style.scrollPaddingTop = `${navHeight - 1}px`;

    let obj = {
    exploreSection: exploreSection.getBoundingClientRect().top  - navHeight,
        memoriesSection: memoriesSection.getBoundingClientRect().top - navHeight,
    packagesSection: packagesSection.getBoundingClientRect().top - navHeight,
    contact: document.body.getBoundingClientRect().top
    }
    markSection("");
    if (obj.memoriesSection > 0 && obj.packagesSection > 0) {
        markSection("explore");
    }else if (obj.memoriesSection <= 0 && obj.packagesSection > 0) {
        markSection("discover");

    } else if (obj.packagesSection <= 0) {
        markSection("packages");
    }
}

AddMark()
window.addEventListener("scroll", AddMark);

/*************************************************************************************
                        NAVIGATION BAR CHANGE COLOR BASED ON SCROLL
*************************************************************************************/
let nav = document.querySelector("nav");

window.addEventListener("scroll", (e) => {
    if (window.scrollY === 0) {
        nav.style.backgroundColor = "transparent";
    } else if(window.scrollY > 0){
        nav.style.background = "#182d61";
    }
})




/*************************************************************************************
                        Packages SECTION- SLIDER RELATED
*************************************************************************************/

const sliderWrapper = document.querySelector(".pCardWrapper");
let sliderWrapperWidth = sliderWrapper.offsetWidth + 1;

const slider = document.querySelector(".slider");
const pCard = document.querySelector(".pCard");

const allPCards = document.querySelectorAll(".pCard");
const amountOfPCards = allPCards.length;


const rightBtn = document.getElementById("right");
const leftBtn = document.getElementById("left");

function fixSizingForSliderChildren() {
    sliderWrapperWidth = sliderWrapper.offsetWidth;
    slider.style.width = `${sliderWrapperWidth * amountOfPCards}px`;

    positioning = (amountOfPCards % 2 === 0) ? ((sliderWrapperWidth * amountOfPCards) / 2) : ((slider.offsetWidth - sliderWrapperWidth) / 2);
    slider.style.transform = `translateX(${-positioning}px)`;
}

fixSizingForSliderChildren();

window.addEventListener("resize", () => {
    fixSizingForSliderChildren();
})


//The slider placement will be the main variable to organize the slides
const sliderPlacement = organizeSliderPlacement(amountOfPCards);
function organizeSliderPlacement(amount) {
    /*
        since the slider will be positioned at the center and all the slides will 
        be linear, the ordering will start from the middle and go on until half the
        slides are presented.

        After that the slides will have to be added from the right to another array.

        Ps. this could be done with one array and the reverse method, but this would
        be easier to understand and less prone to errors.
    */
    let halfArrayOne = [];
    let halfArrayTwo = [];
    let center = amount/2;
    for(let x = 1; x <= amount; x++){
        if(x <= center){
            halfArrayOne.push(x)
        }else if(x > center){
            halfArrayTwo.push(x);
        }
    }
    return halfArrayTwo.concat(halfArrayOne);    
}



function adjustSlider(buttonClicked) {
    if (buttonClicked === "right") {
        sliderPlacement.unshift(sliderPlacement.pop());
    } else if (buttonClicked == "left") {
        sliderPlacement.push(sliderPlacement.shift());
    }

    console.log(sliderPlacement)
    allPCards.forEach((slide, index) => {
        slide.style.order = sliderPlacement[index];
    })
}

adjustSlider();


// Cooldown added to avoid spamming buttons
let cooldown = false;

rightBtn.addEventListener("click", () => {
    if (cooldown === true) {
        return;
    }
    cooldown = true;
    slider.style.transition = "0.5s";
    slider.style.transform = `translate(-${positioning * 2}px)`;
    setTimeout(function () {
        slider.style.transition = "none";
        adjustSlider("right");
        slider.style.transform = `translate(-${positioning}px)`;
        cooldown = false;
    }, 600);
});

leftBtn.addEventListener("click", () => {
    if (cooldown === true) {
        return;
    }
    cooldown = true;
    slider.style.transition = "0.5s";
    slider.style.transform = `translate(${positioning * 0}px)`;
    setTimeout(function () {
        slider.style.transition = "none";
        adjustSlider("left");
        slider.style.transform = `translate(-${positioning}px)`;
        cooldown = false;
    }, 600);
});


