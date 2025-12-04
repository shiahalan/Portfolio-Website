// MOBILE / RESIZING TOGGLE MENU!!!

// If screen size is too small deteced by media query, toggle to different menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open")
  icon.classList.toggle("open")
}




// QUALITY OF LIFE!!!
// Change all class, id, tag, etc data-value to respective content for convenience
// Restrict scramble to #profile only
const SCRAMBLE_ROOT = document.querySelector('#profile');
let headings = SCRAMBLE_ROOT
  ? SCRAMBLE_ROOT.querySelectorAll("h1, h2, p, a")
  : document.querySelectorAll("h1, h2, p, a");

headings.forEach(heading => {
  heading.setAttribute("data-value", heading.textContent);
});



// ANIMATION SECTION!!!

// Observer to observe what elements client can see, when element can be seen then play animation
// Animation for encryption unscrambling effect

// Note: Add the exclude-animation class to an element to prevent elements inside of it from being deleted. The animation
// deletes the inner tag, so add the exclude-animation class to the outer tag, so the inner tag is animated and the
// outer tag is left alone
const codeSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const observer = new IntersectionObserver(entries => {
  entries.forEach(event => {

    if (event.target.classList.contains("exclude-animation")) {
      return;
    }

    let i = 0;
  
    const repetitions = setInterval(x => {
      splitText = event.target.dataset.value.split("");
      event.target.innerText = splitText.map((character, index) => {
        
      if (index < i) {
        return event.target.dataset.value[index];
      } else {
        return codeSymbols[Math.floor(Math.random() * 26)]
      }
  
    }).join("");
      

      if (i >= event.target.innerText.length) {
        clearInterval(repetitions);
      }
      
      if (event.target.tagName.toLowerCase() == "h1" || event.target.tagName.toLowerCase() == "h2") {
        i += 1/5;
      } else if (event.target.tagName.toLowerCase() == "a") {
        i += 1/5;
      } else if (event.target.classList.contains("long-paragraph")) {
        i += 2;
      } else if (event.target.tagName.toLowerCase() == "p") {
        i += 1/4;
      } else if (event.target.tagName.toLowerCase() == "button") {
        i += 1;
      }
        
    }, 35)
  })
});

// Constantly observe all elements with respective id, classes, etc
const hiddenElements = SCRAMBLE_ROOT
  ? SCRAMBLE_ROOT.querySelectorAll("h1, h2, p, a")
  : document.querySelectorAll("h1, h2, p, a");

hiddenElements.forEach(ele => {
  observer.observe(ele);
})


// Prevent Double Click Highlight
document.addEventListener('dblclick', function(event) {
  event.preventDefault();
});
