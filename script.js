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

// Function to run the decryption animation
function runDecryption() {
  const elements = SCRAMBLE_ROOT
    ? SCRAMBLE_ROOT.querySelectorAll("h1, h2, p, a")
    : document.querySelectorAll("h1, h2, p, a");

  elements.forEach(element => {
    if (element.classList.contains("exclude-animation")) {
      return;
    }

    let i = 0;
  
    const repetitions = setInterval(x => {
      splitText = element.dataset.value.split("");
      element.innerText = splitText.map((character, index) => {
        
      if (index < i) {
        return element.dataset.value[index];
      } else {
        return codeSymbols[Math.floor(Math.random() * 26)]
      }
  
    }).join("");
      

      if (i >= element.innerText.length) {
        clearInterval(repetitions);
      }
      
      if (element.tagName.toLowerCase() == "h1" || element.tagName.toLowerCase() == "h2") {
        i += 1/18;
      } else if (element.tagName.toLowerCase() == "a") {
        i += 1/18;
      } else if (element.classList.contains("long-paragraph")) {
        i += 0.6;
      } else if (element.tagName.toLowerCase() == "p") {
        i += 1/13;
      } else if (element.tagName.toLowerCase() == "button") {
        i += 0.4;
      }
        
    }, 35)
  });
}

// Run on page load
runDecryption();

// Add click handlers to "AS" logo links
document.querySelectorAll('.logo').forEach(logo => {
  logo.parentElement.addEventListener('click', (e) => {
    // Small delay to allow scroll to complete
    setTimeout(() => {
      runDecryption();
    }, 300);
  });
});


// Prevent Double Click Highlight
document.addEventListener('dblclick', function(event) {
  event.preventDefault();
});


// TREASURE MAP SINE WAVE CONNECTOR!!!
function drawSineWavePaths() {
  const svg = document.getElementById('experience-svg');
  if (!svg) return;

  const experienceItems = document.querySelectorAll('.experience-item');
  if (experienceItems.length < 2) return;

  // Get the container to calculate SVG dimensions
  const container = svg.parentElement;
  const containerRect = container.getBoundingClientRect();
  
  svg.setAttribute('width', containerRect.width);
  svg.setAttribute('height', containerRect.height);
  svg.setAttribute('viewBox', `0 0 ${containerRect.width} ${containerRect.height}`);
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.pointerEvents = 'none';
  svg.style.zIndex = '1';

  // Clear previous paths
  svg.innerHTML = '';

  // Draw sine wave from each experience content to the next
  for (let i = 0; i < experienceItems.length - 1; i++) {
    const currentContent = experienceItems[i].querySelector('.experience-content');
    const nextContent = experienceItems[i + 1].querySelector('.experience-content');

    if (!currentContent || !nextContent) continue;

    // Get content box positions relative to the SVG container
    const currentRect = currentContent.getBoundingClientRect();
    const nextRect = nextContent.getBoundingClientRect();

    // Connect from center of current box to center of next box
    const x1 = currentRect.left - containerRect.left + currentRect.width / 2;
    const y1 = currentRect.top - containerRect.top + currentRect.height / 2;
    const x2 = nextRect.left - containerRect.left + nextRect.width / 2;
    const y2 = nextRect.top - containerRect.top + nextRect.height / 2;

    // Generate treasure map sine wave path
    const path = generateSineWavePath(x1, y1, x2, y2, 25, 3);
    
    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathElement.setAttribute('d', path);
    pathElement.setAttribute('stroke', '#000000');
    pathElement.setAttribute('stroke-width', '6');
    pathElement.setAttribute('fill', 'none');
    pathElement.setAttribute('stroke-linecap', 'square');
    pathElement.setAttribute('stroke-linejoin', 'round');
    pathElement.setAttribute('stroke-dasharray', '30,35');
    pathElement.setAttribute('opacity', '0.85');
    pathElement.setAttribute('class', 'sine-wave-line');
    pathElement.setAttribute('filter', 'url(#treasureMapFilter)');

    svg.appendChild(pathElement);
  }

  // Add gradient and filter definitions
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  
  const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  gradient.setAttribute('id', 'sineWaveGradient');
  gradient.setAttribute('x1', '0%');
  gradient.setAttribute('y1', '0%');
  gradient.setAttribute('x2', '0%');
  gradient.setAttribute('y2', '100%');

  const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop1.setAttribute('offset', '0%');
  stop1.setAttribute('stop-color', '#4285f4');
  stop1.setAttribute('stop-opacity', '1');

  const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop2.setAttribute('offset', '100%');
  stop2.setAttribute('stop-color', '#34a853');
  stop2.setAttribute('stop-opacity', '1');

  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);

  // Add a subtle shadow/glow filter for treasure map effect
  const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  filter.setAttribute('id', 'treasureMapFilter');
  const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
  feGaussianBlur.setAttribute('in', 'SourceGraphic');
  feGaussianBlur.setAttribute('stdDeviation', '0.5');
  filter.appendChild(feGaussianBlur);
  defs.appendChild(filter);

  svg.appendChild(defs);
}

// Generate sine wave path between two points - treasure map style
function generateSineWavePath(x1, y1, x2, y2, amplitude, frequency) {
  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const steps = Math.max(150, Math.floor(distance / 3));
  
  let path = `M ${x1} ${y1}`;
  
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    
    // Interpolate between the two points
    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t;
    
    // Perpendicular direction for sine wave offset
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    
    // Normalized perpendicular
    const perpX = -dy / len;
    const perpY = dx / len;
    
    // Multiple sine waves layered for more organic look
    const sineValue = Math.sin(t * Math.PI * frequency) * amplitude + 
                      Math.sin(t * Math.PI * frequency * 0.5) * (amplitude * 0.3);
    
    const offsetX = x + perpX * sineValue;
    const offsetY = y + perpY * sineValue;
    
    path += ` L ${offsetX} ${offsetY}`;
  }
  
  return path;
}

// Add decorative dots along the path
function addPathDots(svg, pathData, spacing) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathData);
  
  let currentDistance = 0;
  const totalLength = path.getTotalLength();
  
  while (currentDistance < totalLength) {
    const point = path.getPointAtLength(currentDistance);
    
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', point.x);
    dot.setAttribute('cy', point.y);
    dot.setAttribute('r', '3');
    dot.setAttribute('fill', 'url(#sineWaveGradient)');
    dot.setAttribute('opacity', '0.6');
    
    svg.appendChild(dot);
    currentDistance += spacing;
  }
}

// Draw paths when page loads and on window resize
window.addEventListener('load', drawSineWavePaths);
window.addEventListener('resize', drawSineWavePaths);

// Redraw when decryption animation completes (after ~2 seconds)
setTimeout(drawSineWavePaths, 2500);
