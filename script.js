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


// Particle Node Animation Background

const canvas = document.getElementById("canvas-one");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse = {
  x: null,
  y: null,
  radius: (canvas.height/100) * (canvas.width/100)
}

window.addEventListener('mousemove', event => {
  mouse.x = event.x;
  mouse.y = event.y;
});


// Particle create
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

    // Draw particle
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = '#2b3440';
      ctx.fill();
    }

    // Check particle position, mouse position, move particle, draw particle
    update() {
      // Check if in canvas
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }

      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }
    


    // Collision detection from mouse
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x > this.size) {
          if (this.directionX < 2) {
              this.directionX += 2;
          }
      } else if (mouse.x > this.x && this.x < canvas.width - this.size) {
          if (this.directionX > -2) {
              this.directionX -= 2;
          }
      }
  
      if (mouse.y < this.y && this.y > this.size) {
          if (this.directionY < 2) {
              this.directionY += 2;
          }
      } else if (mouse.y > this.y && this.y < canvas.height - this.size) {
          if (this.directionY > -2) {
              this.directionY -= 2;
          }
      }
    }
  
  

    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
  }
}

function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 30000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = (Math.random() * 5) + 7;
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
    let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
    let directionX = (Math.random() * 5) - 2.5; 
    let directionY = (Math.random() * 5) - 2.5;
    let color = '#2b3440';

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

// Check if should draw line between particles
function connect() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
      
      if (distance < (canvas.width/7) * (canvas.height/7)) {
        opacityValue = 1 - (distance/55000);
        ctx.strokeStyle = 'rgba(43,52,64,' + opacityValue + ')';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}


let lastFrameTime = 0;
let frameDelay = 30;

function animate(currentTime) {

  if (currentTime - lastFrameTime < frameDelay) {
      requestAnimationFrame(animate);
      return;
  }

  lastFrameTime = currentTime;

  requestAnimationFrame(animate);

  ctx.clearRect(0,0,innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }

  connect();
}

// Resize event
window.addEventListener('resize', x => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = ((canvas.height/80) * (canvas.height/80));
  init();
});

// mouse out event
window.addEventListener('mouseout', xy=> {
  mouse.x = undefined;
  mouse.y = undefined;

});


window.addEventListener('click', xy=> {
  let size = (Math.random() * 5) + 7;
  let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
  let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
  let directionX = (Math.random() * 5) - 2.5; 
  let directionY = (Math.random() * 5) - 2.5;
  let color = '#2b3440';
  particlesArray.push(new Particle(mouse.x, mouse.y, directionX, directionY, size, color))

  if (particlesArray.length > 200) {
    particlesArray.shift();
  }

});

init();
animate();

