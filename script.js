// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

// Check for saved dark mode preference (default to light mode)
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') htmlElement.classList.add('dark-mode');
else htmlElement.classList.remove('dark-mode');

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
    window.dispatchEvent(new Event('headercontrastrefresh'));
  });
}

// Mobile nav (hamburger)
(() => {
  const nav = document.querySelector('.header .nav');
  const toggle = document.getElementById('menuToggle');
  const links = nav?.querySelector?.('.nav-links');
  const overlay = document.getElementById('siteMenuOverlay');
  const overlayBackdrop = overlay?.querySelector?.('.site-menu-backdrop');
  const overlayPanel = overlay?.querySelector?.('.site-menu-panel');
  if (!nav || !toggle || !links) return;

  const isTouchLike =
    window.matchMedia?.('(hover: none)').matches ||
    window.matchMedia?.('(pointer: coarse)').matches;
  const isDesktopOverlay = () =>
    window.innerWidth > 768 &&
    window.matchMedia?.('(hover: hover)')?.matches &&
    window.matchMedia?.('(pointer: fine)')?.matches &&
    !!overlay;

  let starTimer = 0;
  let overlayPinned = false;
  let overlayCloseTimer = 0;

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

  const cancelOverlayClose = () => {
    if (!overlayCloseTimer) return;
    window.clearTimeout(overlayCloseTimer);
    overlayCloseTimer = 0;
  };

  const closeOverlay = () => {
    if (!overlay?.classList.contains('is-open')) {
      overlayPinned = false;
      return;
    }
    cancelOverlayClose();
    overlayPinned = false;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('site-menu-open');
    setExpanded(false);
    window.dispatchEvent(new Event('headercontrastrefresh'));
  };

  const openOverlay = ({ pinned = false } = {}) => {
    if (!overlay) return;
    cancelOverlayClose();
    overlayPinned = pinned;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('site-menu-open');
    setExpanded(true);
    window.dispatchEvent(new Event('headercontrastrefresh'));
  };

  const scheduleOverlayClose = (delay = 120) => {
    if (overlayPinned) return;
    cancelOverlayClose();
    overlayCloseTimer = window.setTimeout(() => {
      overlayCloseTimer = 0;
      closeOverlay();
    }, delay);
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

    if (isDesktopOverlay()) {
      const willOpenPinned = !overlay?.classList.contains('is-open') || !overlayPinned;
      if (willOpenPinned) openOverlay({ pinned: true });
      else closeOverlay();
      toggle.blur();
      return;
    }

    const willOpen = !nav.classList.contains('is-open');
    if (willOpen) openMenu();
    else closeMenu();

    flashStar();

    // Prevent lingering focus styles (mobile browsers can keep focus/hover “stuck”)
    toggle.blur();
  });

  if (overlay) {
    toggle.addEventListener('mouseenter', () => {
      if (!isDesktopOverlay()) return;
      openOverlay({ pinned: false });
    });

    toggle.addEventListener('mouseleave', () => {
      if (!isDesktopOverlay()) return;
      scheduleOverlayClose();
    });

    overlay.addEventListener('mouseenter', () => {
      if (!isDesktopOverlay()) return;
      cancelOverlayClose();
    });

    overlay.addEventListener('mouseleave', () => {
      if (!isDesktopOverlay()) return;
      scheduleOverlayClose();
    });

    overlay.addEventListener('click', (e) => {
      const link = e.target?.closest?.('a');
      if (link) {
        closeOverlay();
        return;
      }
      if (overlayPanel && !overlayPanel.contains(e.target)) {
        closeOverlay();
      }
    });

    overlayBackdrop?.addEventListener('click', () => {
      closeOverlay();
    });
  }

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (isDesktopOverlay()) {
      if (!overlay?.classList.contains('is-open')) return;
      if (overlay.contains(e.target) || toggle.contains(e.target)) return;
      closeOverlay();
      return;
    }
    if (!nav.classList.contains('is-open')) return;
    if (nav.contains(e.target)) return;
    closeMenu();
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeMenu();
    closeOverlay();
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
    else closeOverlay();
    window.dispatchEvent(new Event('headercontrastrefresh'));
  }, { passive: true });
})();

// Projects (cards) and their associated galleries
const projects = [
  { key: 'neopets', title: 'Neopets', cat: 'Branding + Packaging', thumb: 'assets/images/Neopets.jpg' },
  { key: 'dress', title: 'Dress to Impress', cat: 'Branding + Packaging', thumb: 'assets/images/dress.jpg' },
  { key: 'clean', title: 'Clean Girl', cat: 'Branding + Packaging', thumb: 'assets/images/clean.jpg' },
  { key: 'rainbow', title: 'Rainbow Friends', cat: 'Branding + Packaging', thumb: 'assets/images/rainbow.jpg' },
  { key: 'fnaf', title: "Five Nights at Freddy's", cat: 'Branding + Packaging', thumb: 'assets/images/fnaf.jpg' },
  { key: 'pet', title: 'Pet Simulator', cat: 'Branding + Packaging', thumb: 'assets/images/pet.jpg' },
  { key: 'fisch', title: 'Fisch', cat: 'Branding + Packaging', thumb: 'assets/images/fisch.jpg' },
  { key: 'blox', title: 'Blox Fruits', cat: 'Branding + Packaging', thumb: 'assets/images/blox_hero.jpg' },
  { key: 'proj1', title: 'Poppy Playtime', cat: 'Branding + Packaging', thumb: 'assets/images/Poppy Banner.jpg' },
  { key: 'proj2', title: 'Invincible', cat: 'Branding + Packaging', thumb: 'assets/images/invincible.jpg' },
  { key: 'proj3', title: 'One Piece', cat: 'Branding + Packaging', thumb: 'assets/images/OnePiece.jpg' },
  { key: 'bendy', title: 'More Projects', cat: 'Additional Work', thumb: 'assets/images/whitelogo.png' },
];

const galleries = {
  blox: [
    {
      src: 'assets/images/blox_action.jpg',
      title: 'Series 3 – Action Figure Packaging (Tiger)',
      desc: 'Led the packaging direction for this Series 3 action figure SKU, guiding junior design support on panel layout, defining hero-shot needs, approving KeyShot renders, and managing approvals through final factory handoff.'
    },
    {
      src: 'assets/images/blox_minis.jpg',
      title: 'Series 3 – Minifigures',
      desc: 'Designed the gravity feeder and foil bag system, organizing character icon placement, DLC callouts, and the cross-sell grid so the assortment stayed collectible, readable, and retail-ready.'
    },
    {
      src: 'assets/images/blox_bundle.jpg',
      title: 'Series 3 – Collector Head Bundle',
      desc: 'Led the shrink-wrap graphic strategy and vendor coordination needed to make the wrap register cleanly on a complex form, while also creating the poster artwork and illustration system that extended the brand on-pack.'
    }
  ],
  // Dress to Impress — full carousel
  dress: [
    {
      src: 'assets/images/dti_mm1.jpg',
      title: 'Series 1 Mystery Models',
      desc: 'For Dress to Impress Mystery Models, I built the star capsule program from the ground up—owning structure, dielines, printable components, and the full retail-facing visual direction. I also created the tray dielines, DLC card, collector insert, and supporting packaging system that launched successfully at Target and Walmart.'
    },
    {
      src: 'assets/images/dti_mm2.jpg',
      title: 'Series 2 Mystery Models',
      desc: 'For Series 2, I evolved the full packaging system with a more premium color palette, updated iconography, and a cleaner collectible hierarchy—building on the original foundation while improving shelf impact and brand consistency across every component.'
    },
    {
      src: 'assets/images/dti_fashiondoll.jpg',
      title: 'Series 1 Fashion Doll Line',
      desc: 'For the Fashion Doll line, I built a packaging system that kept every SKU aligned—from window placement and character art to callouts, branding, and supporting collector components. The line moved on a tight schedule, so the work demanded fast decisions without sacrificing cohesion or retail readiness.'
    },
    {
      src: 'assets/images/dti_lanadeluxe.jpg',
      title: 'Series 1 Fashion Doll Playset',
      desc: 'For the Deluxe Lana Salon, I developed the complete packaging and packout system—owning structure, layout, and visual communication for 20+ accessories and play features. I also created the custom Red Reveal mechanic, turning the package into a stronger interactive and collectible experience while keeping the line on-brand.'
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
      title: "Five Nights at Freddy's Security Breach Construction Set", 
      desc: "For the Five Nights at Freddy’s – Security Breach Construction Set, I developed the complete packaging look and visual direction, ensuring the PhatStacks branding, titles, and graphic system remained consistent across the full construction line. I created all product renders in KeyShot, building a vibrant hero shot that showcased the playset’s scale and details. Every packaging element—layout, branding, iconography, and print-ready files—was designed and executed by me to deliver a cohesive, collectible-driven presence on shelf." 
    },
    {
      src: 'assets/images/fnaf_construction2.jpg',
      title: "Five Nights at Freddy's Security Breach Single Figure Construction Set",
      desc: "For the Five Nights at Freddy’s Charging Station Series, I designed both the packaging box and CDU, developing a cohesive visual system aligned with the Security Breach aesthetic and PhatStacks branding. I collaborated with the product team to produce 3D KeyShot renders for pack, created all instruction manuals, and partnered with the factory to engineer a custom dieline meeting structural and production needs. Every component, from layout to graphics to mechanical accuracy, was directed and executed by me for retail launch."
    },
    {
      src: 'assets/images/fnaf_headbundle1.jpg',
      title: "Five Nights at Freddy's Freddy Head Bundle",
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
      desc: 'For Poppy Playtime: Nightmare Critters Minifigures, I developed the full packaging system across the CDU, box panels, and foil bags—building a bolder collectible language around supplied character art and carrying it through licensor approval into a stronger shelf presence.'
    },
    {
      src: 'assets/images/poppy_10pk.jpg',
      title: 'Poppy Playtime Nightmare Critters 10-Pack',
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
      desc: 'For Invincible Minifigures Series 1, I translated the Amazon Original style guide into a retail-ready packaging system, then produced the final KeyShot renders from product-design CAD to ensure the CDU and foil bag formats balanced character presence with clear assortment communication.'
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
      desc: 'I developed the full packaging look that helped reintroduce Neopets to Walmart and Target, creating the box graphics, DLC artwork, poly-bag designs, and a custom carry-box dieline that made the SKU feel nostalgic, current, and collectible at shelf.'
    },
    {
      src: 'assets/images/neopets_series2mf.jpg',
      title: 'Neopets Minifigures Series 2',
      desc: 'For Neopets Minifigures Series 2, I led the packaging from concept through final mechanicals—coordinating with the licensor for assets, designing the CDU and blind-bag compositions, and building a custom dieline that kept the line vibrant, collectible, and unmistakably Neopets.'
    },
    {
      src: 'assets/images/neopets_series2cp.jpg',
      title: 'Neopets Mystery Plush Series 2',
      desc: 'For Neopets Mystery Plush Series 2, I refreshed the line with a brighter boutique-inspired direction, designing the graphics, layouts, and full dieline so the box and carry panel supported both display and unboxing while still feeling playful and brand-authentic.'
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
      // Clear any inline overrides so the CSS base state can replay cleanly.
      underline.style.removeProperty('background-size');
      underline.style.removeProperty('filter');
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

  const inner = resumeSection.querySelector('.inner');
  const revealTargets = inner
    ? Array.from(inner.children).flatMap((child) => {
        if (child.matches('.resume-spotlight, .resume-grid')) return Array.from(child.children);
        return [child];
      })
    : [];

  revealTargets.forEach((el, index) => {
    el.classList.add('resume-reveal');
    el.style.setProperty('--resume-delay', String(index));
  });

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || typeof IntersectionObserver === 'undefined') {
    resumeSection.classList.add('visible', 'is-inview');
    return;
  }

  const ioResume = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const on = entry.isIntersecting;
      resumeSection.classList.toggle('visible', on);
      resumeSection.classList.toggle('is-inview', on);
    });
  }, { threshold: 0 });

  ioResume.observe(resumeSection);
})();

// Smooth sentence-by-sentence scroll fill for resume intro copy.
(() => {
  const fillTargets = Array.from(document.querySelectorAll('.resume-scrollfill'));
  if (!fillTargets.length) return;

  const sentenceRegex = /[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g;
  const sentenceSpans = [];

  fillTargets.forEach((target) => {
    const text = target.textContent || '';
    const sentences = text.match(sentenceRegex) || [text];
    target.textContent = '';
    target.classList.add('is-sentence-fill-ready');

    sentences.forEach((sentence) => {
      const span = document.createElement('span');
      span.className = 'scrollfill-sentence';
      span.textContent = sentence;
      target.appendChild(span);
      sentenceSpans.push(span);
    });
  });

  const introCard = fillTargets[0]?.closest('.resume-intro-card') || fillTargets[0];
  if (!introCard || !sentenceSpans.length) return;

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  if (reducedMotion) {
    sentenceSpans.forEach((span) => span.style.setProperty('--sentence-fill', '100%'));
    fillTargets.forEach((target) => target.classList.add('is-fill-complete'));
    return;
  }

  let targetProgress = 0;
  let currentProgress = 0;
  let rafId = 0;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const applyProgress = (progress) => {
    const scaled = progress * sentenceSpans.length;

    sentenceSpans.forEach((span, index) => {
      const sentenceProgress = clamp(scaled - index, 0, 1);
      span.style.setProperty('--sentence-fill', `${(sentenceProgress * 100).toFixed(2)}%`);
    });

    fillTargets.forEach((target) => {
      target.classList.toggle('is-fill-complete', progress >= 0.995);
    });
  };

  const tick = () => {
    currentProgress += (targetProgress - currentProgress) * 0.14;

    if (Math.abs(targetProgress - currentProgress) < 0.0015) {
      currentProgress = targetProgress;
      applyProgress(currentProgress);
      rafId = 0;
      return;
    }

    applyProgress(currentProgress);
    rafId = window.requestAnimationFrame(tick);
  };

  const updateTarget = () => {
    const rect = introCard.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    const start = viewportHeight * 0.9;
    const end = viewportHeight * 0.2;
    const raw = (start - rect.top) / Math.max(start - end, 1);
    targetProgress = clamp(raw, 0, 1);

    if (!rafId) rafId = window.requestAnimationFrame(tick);
  };

  applyProgress(0);
  updateTarget();
  window.addEventListener('scroll', updateTarget, { passive: true });
  window.addEventListener('resize', updateTarget, { passive: true });
  window.addEventListener('orientationchange', updateTarget, { passive: true });
})();

// Slow randomized gradient drift for the About / Resume intro card.
(() => {
  const cards = Array.from(document.querySelectorAll('.resume-intro-card'));
  if (!cards.length) return;

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  if (reducedMotion) return;

  const rand = (min, max) => min + Math.random() * (max - min);
  const root = document.documentElement;
  const supportsFinePointer =
    window.matchMedia?.('(pointer: fine)').matches &&
    window.matchMedia?.('(hover: hover)').matches;
  const motionSeeds = cards.map(() => ({
    phaseA: rand(0, Math.PI * 2),
    phaseB: rand(0, Math.PI * 2),
    phaseC: rand(0, Math.PI * 2),
    phaseD: rand(0, Math.PI * 2)
  }));
  let wobbleRaf = 0;

  const applyRandomState = (card) => {
    const isDark = root.classList.contains('dark-mode');
    const profile = isDark
      ? {
          duration:[17, 24],
          glowX:[78, 88],
          glowY:[19, 31],
          beforeX:[-26, 28],
          beforeY:[-20, 22],
          beforeScale:[0.995, 1.07],
          beforeOpacity:[0.46, 0.68],
          afterX:[-30, 24],
          afterY:[-26, 22],
          afterScale:[0.99, 1.12],
          afterOpacity:[0.34, 0.58],
          next:[11000, 17000]
        }
      : {
          duration:[14, 20],
          glowX:[69, 93],
          glowY:[14, 40],
          beforeX:[-42, 44],
          beforeY:[-30, 34],
          beforeScale:[1, 1.11],
          beforeOpacity:[0.78, 0.98],
          afterX:[-52, 36],
          afterY:[-38, 34],
          afterScale:[1.03, 1.2],
          afterOpacity:[0.54, 0.88],
          next:[9000, 15000]
        };

    card.style.setProperty('--resume-card-motion-duration', `${rand(...profile.duration).toFixed(2)}s`);
    card.style.setProperty('--resume-card-glow-x', `${rand(...profile.glowX).toFixed(2)}%`);
    card.style.setProperty('--resume-card-glow-y', `${rand(...profile.glowY).toFixed(2)}%`);
    card.style.setProperty('--resume-card-before-ambient-x', `${rand(...profile.beforeX).toFixed(2)}px`);
    card.style.setProperty('--resume-card-before-ambient-y', `${rand(...profile.beforeY).toFixed(2)}px`);
    card.style.setProperty('--resume-card-before-scale', rand(...profile.beforeScale).toFixed(3));
    card.style.setProperty('--resume-card-before-opacity', rand(...profile.beforeOpacity).toFixed(3));
    card.style.setProperty('--resume-card-after-ambient-x', `${rand(...profile.afterX).toFixed(2)}px`);
    card.style.setProperty('--resume-card-after-ambient-y', `${rand(...profile.afterY).toFixed(2)}px`);
    card.style.setProperty('--resume-card-after-scale', rand(...profile.afterScale).toFixed(3));
    card.style.setProperty('--resume-card-after-opacity', rand(...profile.afterOpacity).toFixed(3));

    return profile.next;
  };

  const applyPointerState = (card, clientX, clientY) => {
    const rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const relX = ((clientX - rect.left) / rect.width - 0.5) * 2;
    const relY = ((clientY - rect.top) / rect.height - 0.5) * 2;
    const isDark = root.classList.contains('dark-mode');
    const beforeFactor = isDark ? 8 : 12;
    const afterFactor = isDark ? 15 : 22;

    card.style.setProperty('--resume-card-before-pointer-x', `${(relX * beforeFactor).toFixed(2)}px`);
    card.style.setProperty('--resume-card-before-pointer-y', `${(relY * beforeFactor * .7).toFixed(2)}px`);
    card.style.setProperty('--resume-card-after-pointer-x', `${(relX * afterFactor).toFixed(2)}px`);
    card.style.setProperty('--resume-card-after-pointer-y', `${(relY * afterFactor * .85).toFixed(2)}px`);
  };

  const resetPointerState = (card) => {
    card.style.setProperty('--resume-card-before-pointer-x', '0px');
    card.style.setProperty('--resume-card-before-pointer-y', '0px');
    card.style.setProperty('--resume-card-after-pointer-x', '0px');
    card.style.setProperty('--resume-card-after-pointer-y', '0px');
  };

  const renderWobble = (now) => {
    const t = now * 0.001;

    cards.forEach((card, index) => {
      const seed = motionSeeds[index];
      const isDark = root.classList.contains('dark-mode');
      const beforeAmpX = isDark ? 7.2 : 13;
      const beforeAmpY = isDark ? 5.2 : 9.6;
      const afterAmpX = isDark ? 13 : 23;
      const afterAmpY = isDark ? 9.8 : 16.4;
      const speed = isDark ? 0.24 : 0.33;

      const beforeX = Math.sin(t * speed + seed.phaseA) * beforeAmpX;
      const beforeY = Math.cos(t * speed * 0.86 + seed.phaseB) * beforeAmpY;
      const afterX = Math.sin(t * speed * 0.72 + seed.phaseC) * afterAmpX;
      const afterY = Math.cos(t * speed * 0.58 + seed.phaseD) * afterAmpY;

      card.style.setProperty('--resume-card-before-wobble-x', `${beforeX.toFixed(2)}px`);
      card.style.setProperty('--resume-card-before-wobble-y', `${beforeY.toFixed(2)}px`);
      card.style.setProperty('--resume-card-after-wobble-x', `${afterX.toFixed(2)}px`);
      card.style.setProperty('--resume-card-after-wobble-y', `${afterY.toFixed(2)}px`);
    });

    wobbleRaf = window.requestAnimationFrame(renderWobble);
  };

  const scheduleCard = (card, delay = 0) => {
    let timer = 0;

    const tick = () => {
      const nextWindow = applyRandomState(card);
      timer = window.setTimeout(tick, rand(...nextWindow));
    };

    timer = window.setTimeout(tick, delay);
    return () => window.clearTimeout(timer);
  };

  const cleanups = cards.map((card, index) => {
    applyRandomState(card);
    return scheduleCard(card, 1200 + index * 480);
  });
  wobbleRaf = window.requestAnimationFrame(renderWobble);

  const refreshAll = () => cards.forEach(applyRandomState);
  if (supportsFinePointer) {
    cards.forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        if (event.pointerType && event.pointerType !== 'mouse') return;
        applyPointerState(card, event.clientX, event.clientY);
      }, { passive: true });
      card.addEventListener('pointerleave', () => resetPointerState(card));
    });
  }
  window.addEventListener('headercontrastrefresh', refreshAll);
  window.addEventListener('pagehide', () => {
    cleanups.forEach((stop) => stop());
    if (wobbleRaf) window.cancelAnimationFrame(wobbleRaf);
    window.removeEventListener('headercontrastrefresh', refreshAll);
  }, { once: true });
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

  // Packaging project cards use the yellow "project" pill state.
  // The animated icon cursor is reserved for the modal image view.
  const imageSelector = '#modalImg';
  const projectSelector = '#projectGrid .card';

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

  const setProjectHover = (on) => {
    cursorEl.classList.toggle('is-project', on);
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
    setProjectHover(false);
    setImageHover(true);
  });

  document.addEventListener('pointerover', (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const card = e.target?.closest?.(projectSelector);
    if (!card) return;
    enable();
    setPos(e);
    setImageHover(false);
    setProjectHover(true);
  });

  document.addEventListener('pointerout', (e) => {
    const fromImg = e.target?.closest?.(imageSelector);
    if (!fromImg) return;
    const to = e.relatedTarget;
    if (to && to.closest && to.closest(imageSelector)) return;
    setImageHover(false);
  });

  document.addEventListener('pointerout', (e) => {
    const fromCard = e.target?.closest?.(projectSelector);
    if (!fromCard) return;
    const to = e.relatedTarget;
    if (to && to.closest && to.closest(projectSelector)) return;
    setProjectHover(false);
  });

  // Safety: hide cursor when leaving the window/tab
  window.addEventListener('blur', () => {
    setVisible(false);
    setImageHover(false);
    setProjectHover(false);
  });
  window.addEventListener('mouseleave', () => {
    setVisible(false);
    setImageHover(false);
    setProjectHover(false);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      setVisible(false);
      setImageHover(false);
      setProjectHover(false);
    }
  });
})();
