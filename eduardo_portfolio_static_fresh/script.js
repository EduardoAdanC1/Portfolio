// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

// Check for saved dark mode preference or default to system preference
const savedDarkMode = localStorage.getItem('darkMode');
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedDarkMode === 'true' || (!savedDarkMode && prefersDarkMode)) {
  htmlElement.classList.add('dark-mode');
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
  htmlElement.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', htmlElement.classList.contains('dark-mode'));
});

// Projects (cards) and their associated galleries
const projects = [
  { key: 'blox', title: 'Blox Fruits', cat: 'Packaging, Branding, Retail Display', thumb: 'assets/images/blox_hero.jpg' },
  { key: 'dress', title: 'Dress to Impress', cat: 'Packaging, Branding, Retail Display', thumb: 'assets/images/dress.jpg' },
  { key: 'clean', title: 'Clean Girl', cat: 'Packaging, Branding', thumb: 'assets/images/clean.jpg' },
  { key: 'rainbow', title: 'Rainbow Friends', cat: 'Packaging, Retail Display', thumb: 'assets/images/rainbow.jpg' },
  { key: 'pet', title: 'Pet Simulator', cat: 'Packaging, Branding, Retail Display', thumb: 'assets/images/pet.jpg' },
  { key: 'fnaf', title: 'Five Nights at Freddys', cat: 'Branding, Retail Display', thumb: 'assets/images/fnaf.jpg' },
  { key: 'bendy', title: 'Bendy', cat: 'Packaging, Licensing', thumb: 'assets/images/bendy.jpg' },
  { key: 'neopets', title: 'Neopets', cat: 'Packaging, Display', thumb: 'assets/images/Neopets.jpg' },
  { key: 'fisch', title: 'Fisch', cat: 'Packaging, Digital Assets', thumb: 'assets/images/fisch.jpg' },
];

const galleries = {
  blox: [
    {
      src: 'assets/images/blox_action.jpg',
      title: 'Series 3 – Action Figure Packaging (Tiger)',
      desc: 'Directed a Jr. Designer on front/back panel layouts and defined hero shot needs. Curated/approved KeyShot renders using painted ZBrush models from product design. Managed approvals and handoff to the factory via Basecamp.'
    },
    {
      src: 'assets/images/blox_minis.jpg',
      title: 'Series 3 – Minifigures',
      desc: 'Designed gravity feeder + foil bag. Placed character icons thoughtfully and developed a complex DLC system callout with a clear cross-sell grid for collectibility.'
    },
    {
      src: 'assets/images/blox_bundle.jpg',
      title: 'Series 3 – Collector Head Bundle',
      desc: 'Led shrink-wrap graphic strategy and vendor collaboration to ensure form-fitting alignment. Created the poster artwork and illustration system to extend the brand on-pack.'
    }
  ],
  // Placeholder single-slide galleries for other cards; replace with real slides later
  dress: [ { src: 'assets/images/dress.jpg', title: 'Dress to Impress', desc: 'Case study coming soon.' } ],
  clean: [ { src: 'assets/images/clean.jpg', title: 'Clean Girl', desc: 'Case study coming soon.' } ],
  rainbow: [ { src: 'assets/images/rainbow.jpg', title: 'Rainbow Friends', desc: 'Case study coming soon.' } ],
  pet: [ { src: 'assets/images/pet.jpg', title: 'Pet Simulator', desc: 'Case study coming soon.' } ],
  fnaf: [ { src: 'assets/images/fnaf.jpg', title: 'Five Nights at Freddys', desc: 'Case study coming soon.' } ],
  bendy: [ { src: 'assets/images/bendy.jpg', title: 'Bendy', desc: 'Case study coming soon.' } ],
  neopets: [ { src: 'assets/images/Neopets.jpg', title: 'Neopets', desc: 'Case study coming soon.' } ],
  fisch: [ { src: 'assets/images/fisch.jpg', title: 'Fisch', desc: 'Case study coming soon.' } ]
};

// Subtle parallax for large step numbers
function updateStepParallax(){
  const els = document.querySelectorAll('.parallax-section .step h1');
  const viewportCenter = window.innerHeight / 2;
  els.forEach(el => {
    const rect = el.parentElement.getBoundingClientRect();
    const stepCenter = rect.top + rect.height / 2;
    const diff = stepCenter - viewportCenter; // positive if below center
    const shift = Math.max(-30, Math.min(30, diff * 0.05)); // clamp movement
    el.style.setProperty('--parallaxY', `${shift}px`);
  });
}
window.addEventListener('scroll', updateStepParallax, { passive: true });
window.addEventListener('resize', updateStepParallax);
document.addEventListener('DOMContentLoaded', updateStepParallax);

// Build cards
const grid = document.getElementById('projectGrid');
projects.forEach(p => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-header">
      <div class="title">${p.title}</div>
    </div>
    <img src="${p.thumb}" alt="${p.title}">
    <div class="card-divider"></div>
    <div class="meta">
      <div class="cat">${p.cat}</div>
    </div>
  `;
  card.addEventListener('click', () => openGallery(p.key));
  grid.appendChild(card);
});

  // Fade-in cards when they enter the viewport
  (() => {
    const cards = document.querySelectorAll('#projectGrid .card');
    if (!cards.length) return;
    const ioCards = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.2 });
    cards.forEach(c => ioCards.observe(c));
  })();

// Modal / carousel
let modal = document.getElementById('modal');
let modalImg = document.getElementById('modalImg');
const dotsWrap = document.getElementById('dots');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
let closeBtn = document.getElementById('closeBtn');
// Spinner removed

let currentSet = [];
let currentIndex = 0;
let currentKey = null;

function openGallery(key){
  // Lazily ensure modal elements exist (in case script loaded before section or DOM changed)
  if (!modal || !modalImg || !closeBtn) {
    modal = document.getElementById('modal');
    modalImg = document.getElementById('modalImg');
    closeBtn = document.getElementById('closeBtn');
  }
  if (!modal || !modalImg) return; // safety guard
  currentKey = key;
  currentSet = galleries[key] || [];
  currentIndex = 0;
  buildDots();
  if(currentSet.length > 0){
    showSlide(0);
  }
  // Ensure modal becomes visible regardless of CSS specificity issues
  modal.classList.add('open');
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}

function buildDots(){
  dotsWrap.innerHTML = '';
  currentSet.forEach((_,i)=>{
    const d = document.createElement('button');
    d.className = 'dot';
    d.setAttribute('aria-label', 'Go to slide ' + (i+1));
    d.addEventListener('click', ()=>showSlide(i));
    dotsWrap.appendChild(d);
  });
}

function showSlide(i){
  currentIndex = (i+currentSet.length)%currentSet.length;
  const slide = currentSet[currentIndex];
  // Set the fallback image immediately to avoid alt text showing
  modalImg.classList.remove('loaded');
  // Spinner removed
  // Preload image in a separate object to ensure reliable load events
  const baseUrl = new URL(slide.src, window.location.href).href;
  const loader = new Image();
  loader.decoding = 'async';
  loader.loading = 'eager';
  loader.onload = () => {
    console.debug('[gallery] Loaded slide', { index: currentIndex, src: baseUrl });
    modalImg.src = baseUrl;
    modalImg.classList.add('loaded');
    
  };
  loader.onerror = () => {
    console.warn('[gallery] Failed to load slide, retrying with cache-bust', { index: currentIndex, src: baseUrl });
    // Retry with cache-bust
    const bustUrl = baseUrl + (baseUrl.includes('?') ? '&' : '?') + 'v=' + Date.now();
    const retry = new Image();
    retry.onload = () => {
      console.debug('[gallery] Loaded after cache-bust', { index: currentIndex, src: bustUrl });
      modalImg.src = bustUrl;
      modalImg.classList.add('loaded');
      
    };
    retry.onerror = () => {
      console.error('[gallery] Image failed after retry, using project thumbnail fallback', { index: currentIndex, src: baseUrl });
      // Fallback to project thumbnail if available
      const proj = (currentKey && Array.isArray(projects)) ? projects.find(p=>p.key===currentKey) : null;
      if (proj && proj.thumb) {
        const thumbUrl = new URL(proj.thumb, window.location.href).href;
        const thumb = new Image();
        thumb.onload = () => {
          console.debug('[gallery] Fallback thumbnail loaded', { key: currentKey, thumb: thumbUrl });
          modalImg.src = thumbUrl;
          modalImg.classList.add('loaded');
          
        };
        thumb.onerror = () => {
          console.error('[gallery] Thumbnail fallback failed, using transparent pixel');
          // Final fallback: transparent pixel
          modalImg.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
          
        };
        thumb.src = thumbUrl;
      } else {
        console.error('[gallery] No thumbnail available; using transparent pixel');
        modalImg.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
        
      }
    };
    retry.src = bustUrl;
  };
  loader.src = baseUrl;
  // Conditional WebP: test if .webp exists, then enhance via picture
  // Removed WebP source negotiation to simplify and avoid source race conditions
  modalTitle.textContent = slide.title || '';
  modalDesc.textContent = slide.desc || '';
  [...dotsWrap.children].forEach((el,idx)=>{
    el.classList.toggle('active', idx === currentIndex);
  });
}

// Close modal on outside click / ESC
modal.addEventListener('click', (e)=>{
  if(e.target === modal){
    modal.classList.remove('open');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
  }
});
// Close via button
closeBtn.addEventListener('click', ()=>{
  modal.classList.remove('open');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
});
// Prevent clicks inside the panel from bubbling to the backdrop
document.querySelector('#modal .panel')?.addEventListener('click', (e)=>{
  e.stopPropagation();
});
window.addEventListener('keydown', (e)=>{
  if(!modal.classList.contains('open')) return;
  if(e.key === 'Escape'){
    modal.classList.remove('open');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  } else if(e.key === 'ArrowLeft'){
    showSlide(currentIndex - 1);
  } else if(e.key === 'ArrowRight'){
    showSlide(currentIndex + 1);
  } else if(e.key === 'Enter'){
    // toggle zoom via keyboard
    isZoomed = !isZoomed;
    modalImg.classList.toggle('zoomed', isZoomed);
    zoomBtn.style.opacity = isZoomed ? '0.7' : '1';
  }
});

// Zoom functionality
const zoomBtn = document.getElementById('zoomBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let isZoomed = false;

zoomBtn.addEventListener('click', ()=>{
  isZoomed = !isZoomed;
  modalImg.classList.toggle('zoomed', isZoomed);
  zoomBtn.style.opacity = isZoomed ? '0.7' : '1';
});

prevBtn.addEventListener('click', ()=>{
  showSlide(currentIndex - 1);
});

nextBtn.addEventListener('click', ()=>{
  showSlide(currentIndex + 1);
});

// Close button click
if(closeBtn){
  closeBtn.addEventListener('click', ()=>{
    modal.classList.remove('open');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  });
}

// Ensure zoom resets when changing slides by wrapping original showSlide behavior
const _showSlide = showSlide;
showSlide = function(i){
  // Reset zoom UI state
  isZoomed = false;
  if (modalImg) modalImg.classList.remove('zoomed');
  if (zoomBtn) zoomBtn.style.opacity = '1';
  // Delegate to robust loader defined earlier
  _showSlide(i);
  // Preload neighbors to improve UX
  preloadAround(currentIndex);
};

function preloadAround(idx){
  if(!currentSet || currentSet.length === 0) return;
  const prev = (idx - 1 + currentSet.length) % currentSet.length;
  const next = (idx + 1) % currentSet.length;
  [prev, next].forEach(i=>{
    const img = new Image();
    img.src = currentSet[i].src;
  });
}

// Swipe gestures for carousel
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

function handleGesture(){
  const dx = touchEndX - touchStartX;
  const dy = Math.abs(touchEndY - touchStartY);
  if(Math.abs(dx) > 40 && dy < 50){
    if(dx < 0){
      showSlide(currentIndex + 1);
    } else {
      showSlide(currentIndex - 1);
    }
  }
}

modal.addEventListener('touchstart', (e)=>{
  if(!modal.classList.contains('open')) return;
  const t = e.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
});
modal.addEventListener('touchmove', (e)=>{
  const t = e.touches[0];
  touchEndX = t.clientX;
  touchEndY = t.clientY;
});
modal.addEventListener('touchend', ()=>{
  handleGesture();
});

// Dot nav behavior
const dotNav = document.querySelector('.dot-nav');
if(dotNav){
  dotNav.addEventListener('click', (e)=>{
    if(e.target.tagName.toLowerCase() === 'button'){
      const targetSel = e.target.getAttribute('data-target');
      const el = document.querySelector(targetSel);
      if(el){
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  const sections = ['#home','#concept-to-production','#samples','#resume','#contact'].map(s=>document.querySelector(s)).filter(Boolean);
  const buttons = dotNav.querySelectorAll('button');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = '#' + entry.target.id;
        buttons.forEach(btn=>{
          btn.classList.toggle('active', btn.getAttribute('data-target') === id);
        });
      }
    });
  },{ root: null, threshold: 0.6 });
  sections.forEach(sec=>observer.observe(sec));
}

// Trigger hero underline animation after load
window.addEventListener('load', ()=>{
  const hero = document.querySelector('.hero');
  if(hero) hero.classList.add('loaded');
  // Ensure underline element has positioning context for ::after
  const underline = hero?.querySelector('.underline');
  if(underline){
    underline.style.position = 'relative';
    underline.style.display = 'inline';
  }
});

// Re-trigger hero underline animation whenever hero section becomes visible
(() => {
  const hero = document.querySelector('#home.hero');
  if(!hero) return;
  const underline = hero.querySelector('.underline');
  const restart = () => {
    // Remove loaded to reset animations
    hero.classList.remove('loaded');
    if(underline){
      // Reset base underline background-size to 0 to ensure re-animation
      underline.style.backgroundSize = '0% .11em';
    }
    // Force reflow to restart CSS animations reliably
    void hero.offsetWidth;
    // Re-add loaded to trigger animations
    hero.classList.add('loaded');
  };
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        restart();
      }
    });
  },{ threshold: 0.6 });
  io.observe(hero);
})();

// Fade-in workflow section (concept-to-production) when it enters viewport
(() => {
  const workflow = document.querySelector('#concept-to-production.parallax-section');
  if(!workflow) return;
  const ioWorkflow = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        workflow.classList.add('visible');
      } else {
        workflow.classList.remove('visible');
      }
    });
  },{ threshold: 0.25 });
  ioWorkflow.observe(workflow);
})();

// Fade-in resume section using IntersectionObserver (works with snap-container)
(() => {
  const resumeSection = document.querySelector('.resume-section');
  if (!resumeSection) return;
  const ioResume = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        resumeSection.classList.add('visible');
      } else {
        resumeSection.classList.remove('visible');
      }
    });
  }, { threshold: 0.2 });
  ioResume.observe(resumeSection);
})();
