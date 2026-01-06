// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

// Check for saved dark mode preference or default to system preference
const savedDarkMode = localStorage.getItem('darkMode');
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedDarkMode === 'true' || (!savedDarkMode && prefersDarkMode)) {
  htmlElement.classList.add('dark-mode');
}

// Footer text fallback (handles any cached/old markup)
(() => {
  // If a full structured footer is present, do not rewrite it.
  if (document.querySelector('.site-footer')) return;
  const desired = `© ${new Date().getFullYear()} Eduardo Chavez`;
  const nodes = document.querySelectorAll('footer .footer-inner');
  nodes.forEach((node) => {
    const t = (node.textContent || '').trim();
    if (!t) return;
    if (t === desired) return;
    if (/^©\s*\d{4}\s*Eduardo\s*Chavez/i.test(t) || /all\s*rights\s*reserved/i.test(t)) {
      node.textContent = desired;
    }
  });
})();

// Toggle dark mode
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', htmlElement.classList.contains('dark-mode'));
  });
}

// Mobile nav (hamburger)
(() => {
  const nav = document.querySelector('.header .nav');
  const toggle = document.getElementById('menuToggle');
  const links = nav?.querySelector?.('.nav-links');
  if (!nav || !toggle || !links) return;

  const isTouchLike =
    window.matchMedia?.('(hover: none)').matches ||
    window.matchMedia?.('(pointer: coarse)').matches;
  let starTimer = 0;
  const flashStar = () => {
    if (!isTouchLike) return;
    toggle.classList.add('is-star');
    if (starTimer) window.clearTimeout(starTimer);
    starTimer = window.setTimeout(() => {
      toggle.classList.remove('is-star');
      starTimer = 0;
    }, 2000);
  };

  const setExpanded = (expanded) => {
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    toggle.setAttribute('aria-label', expanded ? 'Close menu' : 'Open menu');
  };

  const closeMenu = () => {
    if (!nav.classList.contains('is-open')) return;
    nav.classList.remove('is-open');
    setExpanded(false);
  };

  const openMenu = () => {
    if (nav.classList.contains('is-open')) return;
    nav.classList.add('is-open');
    setExpanded(true);
  };

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const willOpen = !nav.classList.contains('is-open');
    if (willOpen) openMenu();
    else closeMenu();

    flashStar();

    // Prevent lingering focus styles (mobile browsers can keep focus/hover “stuck”)
    toggle.blur();
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('is-open')) return;
    if (nav.contains(e.target)) return;
    closeMenu();
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Close after choosing a link
  links.addEventListener('click', (e) => {
    const a = e.target?.closest?.('a');
    if (!a) return;
    closeMenu();
  });

  // If the viewport grows to desktop, ensure menu is closed
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  }, { passive: true });
})();

// Projects (cards) and their associated galleries
const projects = [
  { key: 'neopets', title: 'Neopets', cat: 'Branding + Packaging Design', thumb: 'assets/images/Neopets.jpg' },
  { key: 'dress', title: 'Dress to Impress', cat: 'Branding + Packaging Design', thumb: 'assets/images/dress.jpg' },
  { key: 'clean', title: 'Clean Girl', cat: 'Branding + Packaging Design', thumb: 'assets/images/clean.jpg' },
  { key: 'rainbow', title: 'Rainbow Friends', cat: 'Branding + Packaging Design', thumb: 'assets/images/rainbow.jpg' },
  { key: 'fnaf', title: 'Five Nights at Freddys', cat: 'Branding + Packaging Design', thumb: 'assets/images/fnaf.jpg' },
  { key: 'pet', title: 'Pet Simulator', cat: 'Branding + Packaging Design', thumb: 'assets/images/pet.jpg' },
  { key: 'fisch', title: 'Fisch', cat: 'Branding + Packaging Design', thumb: 'assets/images/fisch.jpg' },
  { key: 'blox', title: 'Blox Fruits', cat: 'Branding + Packaging Design', thumb: 'assets/images/blox_hero.jpg' },
  { key: 'proj1', title: 'Poppy Playtime', cat: 'Branding + Packaging Design', thumb: 'assets/images/Poppy Banner.jpg' },
  { key: 'proj2', title: 'Invincible', cat: 'Branding + Packaging Design', thumb: 'assets/images/invincible.jpg' },
  { key: 'proj3', title: 'One Piece', cat: 'Branding + Packaging Design', thumb: 'assets/images/OnePiece.jpg' },
  { key: 'bendy', title: 'More Projects!', cat: 'Design', thumb: 'assets/images/whitelogo.png' },
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
  // Dress to Impress — full carousel
  dress: [
    {
      src: 'assets/images/dti_mm1.jpg',
      title: 'Series 1 Mystery Models',
      desc: 'For Dress to Impress Mystery Models, I developed the star capsule packaging from the ground up, designing the structure, dielines, and all printable components using Illustrator and KeyShot. I established a new visual direction for the brand, which launched successfully at Target and Walmart. I also created the tray dielines, DLC card, collector insert, and overall packaging system, directing and executing the complete look and feel across retail.'
    },
    {
      src: 'assets/images/dti_mm2.jpg',
      title: 'Series 2 Mystery Models',
      desc: 'I elevated and evolved the entire packaging system, introducing a refreshed palette of pink tones and a more premium visual direction. I refined the star capsule design, updated all icons and graphic elements, and pushed the overall look to feel more modern, collectible, and on-brand for our audience. This series builds on the foundation I created in Series 1 while enhancing the shelf presence and visual storytelling across every packaging component.'
    },
    {
      src: 'assets/images/dti_fashiondoll.jpg',
      title: 'Series 1 Fashion Doll Line',
      desc: 'For the Dress to Impress Fashion Dolls, I developed a full packaging system that ensured every SKU stayed visually consistent—from character artwork and window placement to branding, icons, and call-outs. I also created all supporting components, including the DLC elements, collector cards, and back-of-box layouts. This entire line was executed under a tight timeline, requiring fast, precise decision-making to keep the collection cohesive and retail-ready.'
    },
    {
      src: 'assets/images/dti_lanadeluxe.jpg',
      title: 'Series 1 Fashion Doll Playset',
      desc: 'For the Dress to Impress Deluxe Lana Salon, I developed the full packaging and packout system—designing the structure, layout, and all visual components to clearly showcase the 20+ accessories and salon play features. I also created the custom Red Reveal mechanic, building both the artwork and the functional hidden-message interaction from the ground up. Every element, from branding to internal placement, was thoughtfully crafted to make this deluxe set feel immersive, collectible, and true to the DTI world.'
    }
  ],
  clean: [ {
    src: 'assets/images/cg_sphere.jpg',
    title: 'Series 1 Spheres Charm Bundle',
    desc: 'I led the full packaging development and art direction for the sphere capsule and CDU display. I guided junior designers throughout the process—directing character placement, refining the Clean Girl face positioning, and ensuring all messaging was clear, on-brand, and instantly readable. I worked closely with the licensor and our brand assurance team through multiple feedback rounds, aligning every detail with their expectations. I also managed all factory communication, overseeing a new production workflow for a product type our team had never executed before, ensuring the final result launched smoothly and met retail standards.'
  } ],
  rainbow: [ {
    src: 'assets/images/rainbow_construction.jpg',
    title: 'Series 4 Construction Set',
    desc: 'For the Rainbow Friends Construction Set – Series 2, I developed the full packaging system, hero render, and instruction manual. Using KeyShot and Photoshop, I refined the hero shot to highlight the build’s features at the optimal angle. This project also introduced my new PhatStacks construction-line branding, which I integrated seamlessly into the overall design. The flat packaging layout and instruction manual required meticulous review and step-by-step clarity, ensuring consumers could easily follow the build. Despite its complexity, the entire project was delivered efficiently and ahead of schedule.'
  }, {
    src: 'assets/images/rainbow_bus.jpg',
    title: 'Series 3 - Minifigures Bus Packaging',
    desc: 'For the Rainbow Friends School Bus 8-Pack, I developed a fully custom bus-shaped packaging structure that translated an iconic in-game asset into a playful retail format. The dieline required multiple iterations to balance structure, visibility, and manufacturability, resulting in a uniquely engaging windowed display. I also designed the assortment strategy—four visible figures and four hidden in mystery bags—to enhance collectibility and surprise. This SKU became a strong performer at both Walmart and Target and remains one of the most rewarding builds of the line.'
  }, {
    src: 'assets/images/rainbow_castle.jpg',
    title: 'Series 3 - Minifigure Castle Pack',
    desc: 'For the Rainbow Friends Blue’s Castle 8-Pack, I designed a fully themed package inspired by the in-game castle, vectorizing every architectural element to make it print-ready and production-safe. This SKU introduced the updated Series 3 packaging refresh and needed to surpass the previous bus-shaped pack with something more interactive. I developed a custom structure featuring a drop-down front panel secured with Velcro, creating a premium reveal moment and a stronger story-driven presentation. The result was a collectible, immersive pack that brought the castle environment to life on shelf.'
  } ],
  pet: [ {
    src: 'assets/images/petsim_luckyblock.jpg',
    title: 'Pet Simulator Series 2 Lucky Block',
    desc: 'For the Pet Simulator Lucky Block Playset, I created the complete packaging system—including the structural design, all illustrations, graphic components, and hero-shot renders. I also designed the exterior sticker artwork and specified the materials and finishes to ensure the product felt authentic to the in-game “Lucky Block.” Every visual and packaging element was directed and executed by me, resulting in a cohesive, playful presentation that reflected the brand’s vibrant style.'
  }, {
    src: 'assets/images/petsim_4pack.jpg',
    title: 'Pet Sim 4-Pack',
    desc: 'For the Pet Simulator 4-Pack, I created the complete packaging system—from structure and dielines to all graphic elements, iconography, and character placement. I designed every visual component, including the back-of-pack “How To” instructions, ensuring clarity and a playful, game-accurate look. All design decisions, layout choices, and branding details were directed and executed by me to deliver a cohesive, shelf-ready package.'
  }, {
    src: 'assets/images/petsim_plush.jpg',
    title: 'Pet Simulator Series 2 Collectible Plush',
    desc: 'For the Pet Simulator Mystery Treasure Plush Series 2, I designed the full packaging system, including the CDU and individual mystery boxes. I created all illustrations and graphic elements, and produced the 3D renders of the pets on the CDU using assets provided by the product design team. Every design decision—from layout to color blocking to branding—was executed by me to deliver a cohesive, collectible-forward presentation at retail.'
  } ],
  fnaf: [ 
    { 
      src: 'assets/images/fnaf_construction.jpg', 
      title: 'Five Nights at Freddys Security Breach Construction Set', 
      desc: "For the Five Nights at Freddy’s – Security Breach Construction Set, I developed the complete packaging look and visual direction, ensuring the PhatStacks branding, titles, and graphic system remained consistent across the full construction line. I created all product renders in KeyShot, building a vibrant hero shot that showcased the playset’s scale and details. Every packaging element—layout, branding, iconography, and print-ready files—was designed and executed by me to deliver a cohesive, collectible-driven presence on shelf." 
    },
    {
      src: 'assets/images/fnaf_construction2.jpg',
      title: "Five Nights at Freddy's Security Breach Single Figure Construction Set",
      desc: "For the Five Nights at Freddy’s Charging Station Series, I designed both the packaging box and CDU, developing a cohesive visual system aligned with the Security Breach aesthetic and PhatStacks branding. I collaborated with the product team to produce 3D KeyShot renders for pack, created all instruction manuals, and partnered with the factory to engineer a custom dieline meeting structural and production needs. Every component, from layout to graphics to mechanical accuracy, was directed and executed by me for retail launch."
    },
    {
      src: 'assets/images/fnaf_headbundle1.jpg',
      title: "Five Night's at Freddys Freddy Head Bundle",
      desc: "For the Five Nights at Freddy’s Head Bundle, I developed all packaging components, including the shrink-wrap design, product stickers, and the full back panel layout. I also created the collectible cards and poster using provided character art, ensuring everything felt cohesive and true to the franchise. Every graphic element—from branding to layout to on-product labeling—was designed and executed by me to deliver a premium unboxing experience."
    }
  ],
  bendy: [
    { src: 'assets/images/steal_1.jpg', title: '', desc: '' },
    { src: 'assets/images/steal_2.jpg', title: '', desc: '' },
    { src: 'assets/images/steal_3.jpg', title: '', desc: '' }
  ],
  proj1: [
    {
      src: 'assets/images/poppy_mf.jpg',
      title: 'Poppy Playtime Nightmare Critters Minifigures',
      desc: 'For Poppy Playtime: Nightmare Critters Minifigures, I designed the complete packaging system from the ground up, establishing the visual look across the CDU, box panels, and foil bags. Using character art provided by the product design team, I built a bold, cohesive graphic language that emphasized contrast, collectibility, and shelf impact. The final direction was reviewed and approved by the licensor, ensuring the presentation stayed true to the IP while introducing a distinct retail presence.'
    },
    {
      src: 'assets/images/poppy_10pk.jpg',
      title: 'Poppy Playtime Nightare Critters 10-Pack',
      desc: 'For the Poppy Playtime: Nightmare Critters 10-Pack, I designed the full packaging layout and visual system, creating a bold, character-forward presentation that clearly showcased the assortment while maintaining strong shelf presence. Using product designer–supplied character art, I developed the composition, callouts, and back-of-box collector guide to balance clarity and collectibility. The final packaging direction was reviewed and approved by the licensor, ensuring brand accuracy while introducing a distinct premium look for a larger pack format.'
    },
    {
      src: 'assets/images/poppy_1pk.jpg',
      title: 'Poppy Playtime Nightmare Critters 1-Pack',
      desc: 'For the Poppy Playtime: Nightmare Critters Single Pack, I adapted the established visual system into a streamlined, cost-efficient packaging solution designed specifically for value retailers such as Five Below. Using licensor-approved product designer art, I created the full packaging layout, front-and-back graphics, and collector callouts while optimizing materials, structure, and print coverage to meet tighter cost targets. The result maintained strong shelf impact and brand recognition while remaining scalable for high-volume, lower-price channels.'
    }
  ],
  proj2: [
    {
      src: 'assets/images/invincible_mf.jpg',
      title: 'Invincible Minifigures',
      desc: 'For the Invincible Minifigures (Series 1), I developed the complete packaging look and visual system, translating the Amazon Original style guide into a bold, collectible-focused retail presentation. I collaborated closely with product designers to obtain CAD files and produced all final product renders in KeyShot, ensuring accurate scale, materials, and lighting. The final packaging balanced strong character presence with clear assortment communication for both the CDU and foil bag formats.'
    }
  ],
  proj3: [
    {
      src: 'assets/images/op_boat.jpg',
      title: 'One Piece 10 Figure Boat Bundle',
      desc: 'For the One Piece 10 Figure Boat Bundle (Going Merry Microfigure Playset), I created the packaging system from concept to production—building the style guide, defining call-outs/snipes, and delivering print-ready mechanicals for the full box and components.'
    },
    {
      src: 'assets/images/op_plush.jpg',
      title: 'One Piece Collectible Plush',
      desc: 'For the One Piece Plush Display Set, I designed the full packaging system for the SKU, including the CDU-style tray and all retail-facing graphics. I also directed and captured all plush photography, ensuring consistent lighting, color accuracy, and character expression across marketing and packaging assets. The result was a cohesive shelf presentation that highlighted the characters clearly while maintaining strong brand alignment with the One Piece Netflix series.'
    },
    {
      src: 'assets/images/op_4pack.jpg',
      title: 'One Piece 4-Pack',
      desc: 'For the One Piece Treasure Chest Minifigure Pack, I designed a completely new packaging layout distinct from other SKUs in the line to give the product its own premium presence on shelf. I developed a darker, treasure-inspired visual direction that elevated the figures and made them stand out through contrast and material cues. This fresh approach was reviewed and approved directly by the licensor, allowing the pack to feel both unique and authentic to the One Piece universe.'
    }
  ],
  neopets: [
    {
      src: 'assets/images/neopets_series1.jpg',
      title: 'Neopets Mystery Plush Series 1',
      desc: 'I developed the complete packaging look that helped reintroduce the beloved brand to consumers at Walmart and Target. I created all box graphics, DLC code artwork, and poly-bag designs, ensuring everything felt true to classic Neopets while appealing to a modern audience. I also engineered a custom dieline for the carry-style box, building a cohesive, collectible-forward presentation across the entire SKU.'
    },
    {
      src: 'assets/images/neopets_series2mf.jpg',
      title: 'Neopets Minifigures Series 2',
      desc: 'For Neopets Minifigures Series 2, I led all packaging direction—from concept through final mechanicals. I coordinated directly with the licensor to source character assets, then configured the full visual composition for both the CDU and blind bags. I designed all graphics, layout systems, and the custom dieline, ensuring the line felt vibrant, collectible, and authentically Neopets across every touchpoint.'
    },
    {
      src: 'assets/images/neopets_series2cp.jpg',
      title: 'neopets_series2cp',
      desc: 'For Neopets Mystery Plush Series 2, I refreshed the packaging direction with a brighter, boutique-inspired look that expanded the visual world of the line. I designed all graphics and layout compositions, integrating licensor-provided assets into a cohesive storybook scene across the box and carry panel. I also built the full dieline myself, ensuring the structure supported both display and unboxing while maintaining the playful charm of the Neopets brand.'
    }
  ],
  fisch: [
    {
      src: 'assets/images/fisch_mf1.jpg',
      title: 'Fisch Micro Figures Series 1',
      desc: 'For the Fisch Microfigures line, I designed the full packaging system, illustrations, and visual branding, shaping the entire product experience from concept to shelf. Working alongside another product designer, I helped develop the core play pattern—introducing a unique capsule that dissolves in water to reveal the toy inside. I created all graphic elements, character icons, and the CDU presentation, ensuring the line felt fresh, cohesive, and retail-ready.'
    },
    {
      src: 'assets/images/fisch_bundle.jpg',
      title: 'Fisch Captains Golden Bundle',
      desc: 'For the Fisch Captain’s Golden Bundle, I developed the full shrink-wrap packaging system, designing all graphics and layout while ensuring the wrap conformed cleanly to the complex fish-shaped structure. Working closely with our packaging engineer, I refined the material specifications and seam placements to prevent warping or distortion. I also created the supporting artwork and presentation pieces, resulting in a cohesive, premium bundle that showcased the product’s special-edition feel.'
    }
  ]
};

// Subtle parallax for large step numbers
function updateStepParallax(){
  const els = document.querySelectorAll('.parallax-section .step h1');
  // Disable dynamic parallax on small screens for smoother scrolling
  if (window.innerWidth <= 768) {
    els.forEach(el => el.style.setProperty('--parallaxY', '0px'));
    return;
  }
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
    <img src="${p.thumb}" alt="${p.title}" ${p.key === 'bendy' ? 'class="contain"' : ''}>
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
    // also re-grab callout if needed
    if(!document.getElementById('modalCallout')){
      // no-op; markup should exist in index.html
    }
  }
  if (!modal || !modalImg) return; // safety guard
  currentKey = key;
  currentSet = galleries[key] || [];
  currentIndex = 0;
  // Disable fade pulse animation for all projects
  modalImg.classList.remove('fade-pulse');
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
  // Ensure no fade pulse animation is applied
  modalImg.classList.remove('fade-pulse');
  // No callout overlay

  // Ensure image is visible
  if (modalImg) modalImg.style.display = 'block';
  // Set the fallback image immediately to avoid alt text showing
  modalImg.classList.remove('loaded');
  // Spinner removed
  // Preload image in a separate object to ensure reliable load events
  const baseUrl = new URL(slide.src, window.location.href).href;
  // Set src immediately so users see the image without waiting for onload
  modalImg.src = baseUrl;
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

// Custom cursor that replaces the native cursor over images (desktop / fine pointers only)
(() => {
  const supportsFinePointer =
    window.matchMedia?.('(pointer: fine)').matches &&
    window.matchMedia?.('(hover: hover)').matches;
  if (!supportsFinePointer) return;

  const cursorEl = document.getElementById('customCursor');
  if (!cursorEl) return;

  const root = document.documentElement;
  let enabled = false;
  const enable = () => {
    if (enabled) return;
    enabled = true;
    root.classList.add('cursor-enabled');
  };

  const imageSelector = '#projectGrid .card img, #modalImg';

  let x = 0;
  let y = 0;
  let raf = 0;
  let visible = false;

  const render = () => {
    raf = 0;
    cursorEl.style.left = x + 'px';
    cursorEl.style.top = y + 'px';
  };

  const setPos = (e) => {
    x = e.clientX;
    y = e.clientY;
    if (!raf) raf = window.requestAnimationFrame(render);
  };

  const setVisible = (on) => {
    visible = on;
    cursorEl.classList.toggle('is-visible', on);
  };

  const setImageHover = (on) => {
    cursorEl.classList.toggle('is-image', on);
  };

  // Track mouse position
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    enable();
    setPos(e);
    if (!visible) setVisible(true);
  }, { passive: true });
  window.addEventListener('mousemove', (e) => {
    enable();
    setPos(e);
    if (!visible) setVisible(true);
  }, { passive: true });

  // Only change cursor style when hovering supported images
  document.addEventListener('pointerover', (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const img = e.target?.closest?.(imageSelector);
    if (!img) return;
    enable();
    setPos(e);
    setImageHover(true);
  });

  document.addEventListener('pointerout', (e) => {
    const fromImg = e.target?.closest?.(imageSelector);
    if (!fromImg) return;
    const to = e.relatedTarget;
    if (to && to.closest && to.closest(imageSelector)) return;
    setImageHover(false);
  });

  // Safety: hide cursor when leaving the window/tab
  window.addEventListener('blur', () => {
    setVisible(false);
    setImageHover(false);
  });
  window.addEventListener('mouseleave', () => {
    setVisible(false);
    setImageHover(false);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      setVisible(false);
      setImageHover(false);
    }
  });
})();
