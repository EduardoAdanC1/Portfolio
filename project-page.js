(() => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const htmlElement = document.documentElement;
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') htmlElement.classList.add('dark-mode');
  else htmlElement.classList.remove('dark-mode');

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      htmlElement.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', htmlElement.classList.contains('dark-mode'));
    });
  }

  // Mobile nav
  (() => {
    const nav = document.querySelector('.header .nav');
    const toggle = document.getElementById('menuToggle');
    const links = nav?.querySelector?.('.nav-links');
    if (!nav || !toggle || !links) return;

    const setExpanded = (expanded) => {
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      toggle.setAttribute('aria-label', expanded ? 'Close menu' : 'Open menu');
    };

    const closeMenu = () => {
      if (!nav.classList.contains('is-open')) return;
      nav.classList.remove('is-open');
      setExpanded(false);
    };

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const willOpen = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', willOpen);
      setExpanded(willOpen);
      toggle.blur();
    });

    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target)) return;
      closeMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
    links.addEventListener('click', (e) => {
      const a = e.target?.closest?.('a');
      if (!a) return;
      closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    }, { passive: true });
  })();

  const stock = (seed, width = 1600, height = 1000) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;

  const projectPages = {
    'clean-by-pallet': {
      title: 'Clean by Pallet',
      subtitle: 'Clean by Pallet is a luxury-focused brand designed to feel both crisp and refined—true to the simplicity of the logo while delivering a premium, elevated experience.',
      hero: 'assets/images/Clean by Pallet Hero.png',
      sections: [
        {
          title: 'Brand Direction',
          copy: 'Clean by Pallet is built on precision + restraint—a luxury system that feels crisp, modern, and intentional. The visual language is minimal and high-contrast: mirror-polished chrome, soft studio whites, and a single controlled red accent used like a signature. Typography is elegant and editorial, letting space and proportion do the heavy lifting while the materials communicate premium quality. Overall, the brand aims to feel “clean” without becoming sterile—refined, elevated, and confidently simple.',
          layout: 'single',
          images: ['assets/images/3Q Palette.png']
        },
        {
          title: 'Application',
          copy: 'The system scales across packaging, product, and digital touchpoints by keeping the same core rules: monochrome foundations, consistent lighting, immaculate materials, and disciplined use of the red accent. On-product and packaging, the chrome and subtle textures reinforce luxury and tactility; in digital and campaign work, liquid-metal surfaces and bold type create immediate impact without clutter. Whether it’s a hero image, retail display, social post, or billboard, everything should feel unified—minimal composition, perfect alignment, and a premium finish that reads instantly as Clean by Pallet.',
          sectionClass: 'pp-application-focus',
          layout: 'two-up-then-single',
          images: [
            'assets/images/CleanHero1.png',
            'assets/images/CleanLipstick.jpg',
            'assets/images/Liquid.jpg'
          ]
        }
      ]
    },
    'sun-books': {
      title: 'Sun Books Publishing',
      subtitle: 'This case study highlights my ideation process, exploring a potential publishing company’s logo and developing a refreshed brand identity.',
      hero: 'assets/images/SunbooksHero.jpg',
      sections: [
        {
          title: 'Brand Identity',
          copy: `This identity works for Sun Books because it communicates the idea of learning and discovery right away—the sun rising from an open book is simple, clear, and memorable. The navy and golden yellow palette balances trust and warmth, making it feel credible for parents and educators while still inviting for kids. Baskerville supports the publishing space with a classic, editorial tone, and the bold hierarchy keeps everything readable across covers, spines, and digital. Overall, it feels cohesive and flexible enough to scale into a full system of real-world applications.`,
          layout: 'single',
          images: ['assets/images/sunBooks hero2.jpg']
        },
        {
          title: 'Applications',
          copy: 'The Sun Books identity extends cleanly across real-world touchpoints, from stationery and packaging to school-ready merchandise, without losing clarity or consistency. The logo remains highly legible at multiple sizes, making it effective on everything from book spines and shipping boxes to pens, backpacks, and accessories. A tight color palette and strong typographic hierarchy keep each application feeling editorial and premium, while still approachable for a family-focused audience. Overall, the system is flexible enough to scale across product lines while staying unmistakably Sun Books.',
          layout: 'two-up-then-single',
          images: [
            'assets/images/Sun_Books_2.png',
            'assets/images/Sun_Books_3.png',
            'assets/images/Sun_Books_4.png'
          ]
        }
      ]
    },
    neopets: {
      title: 'Neopets',
      subtitle: 'A nostalgic brand refresh translated into modern collectible packaging systems, in-store storytelling, and launch-ready assets.',
      hero: stock('neopets-hero'),
      sections: [
        {
          title: 'Many Directions',
          copy: 'Creating a brand that spans across multiple applications as a solutions-driven operator was made so easy with their brilliant team. We explored many different avenues that the brand could go in before settling on a clear, premium system that could scale from shelf to social.',
          layout: 'single',
          images: [stock('neopets-explore', 1800, 1000)]
        },
        {
          title: 'Elevated Experience',
          copy: 'We designed the packaging architecture to feel premium while still playful. Structural hierarchy, typography rhythm, and color contrast were tuned so every touchpoint feels cohesive and collectible.',
          layout: 'two-up-then-single',
          images: [
            stock('neopets-a', 1000, 1200),
            stock('neopets-b', 1000, 1200),
            stock('neopets-c', 1800, 1000)
          ]
        }
      ]
    },
    dress: {
      title: 'Dress to Impress',
      subtitle: 'Premium toy-fashion packaging with bold shelf presence, collector logic, and fast-turn launch execution.',
      hero: stock('dress-hero'),
      sections: [
        {
          title: 'Greyheath-Inspired Editorial Style',
          copy: 'A premium visual approach balancing modern elegance with approachable energy. The tone stays fashion-forward while preserving toy-category clarity for younger shoppers and gift-givers.',
          layout: 'single',
          images: [stock('dress-grid-1', 1800, 1050)]
        },
        {
          title: 'System Thinking',
          copy: 'Across mystery products, dolls, and deluxe sets, the hierarchy remains consistent: strongest hero area first, read-optimized callouts second, then collectible depth.',
          layout: 'two-up-then-single',
          images: [stock('dress-grid-2', 1000, 1200), stock('dress-grid-3', 1000, 1200), stock('dress-grid-4', 1800, 1050)]
        }
      ]
    },
    aadan: {
      title: 'EC Working Hard to Upload',
      subtitle: 'This case study is currently in progress. Final assets and detailed breakdowns are being prepared and will be uploaded soon.',
      hero: 'assets/images/aadan.png?v=20260302',
      sections: [
        {
          title: 'Coming Soon',
          copy: 'I am actively building this case study and organizing final visuals. Please check back soon for the full project brief, process work, and application examples.',
          layout: 'single',
          images: ['assets/images/comingsoon.jpg']
        },
        {
          title: 'Application',
          copy: 'Additional brand applications and production-ready mockups will be added once final assets are approved.',
          layout: 'single',
          images: ['assets/images/comingsoon.jpg']
        }
      ]
    }
  };

  const fallbackTemplate = (name) => ({
    title: name,
    subtitle: 'Case study page in progress. Placeholder visuals are being used until final imagery is provided.',
    hero: stock(`${name}-hero`),
    sections: [
      {
        title: 'Direction',
        copy: 'This page is structured and ready. Once you provide final assets, we can drop them into this exact layout and polish copy per project.',
        layout: 'single',
        images: [stock(`${name}-direction`, 1800, 1000)]
      },
      {
        title: 'Application',
        copy: 'A reusable section format keeps every project consistent while still allowing unique storytelling per brand.',
        layout: 'two-up-then-single',
        images: [stock(`${name}-app-a`, 1000, 1200), stock(`${name}-app-b`, 1000, 1200), stock(`${name}-app-c`, 1800, 1050)]
      }
    ]
  });

  const projectNames = {
    neopets: 'Neopets',
    dress: 'Dress to Impress',
    clean: 'Clean Girl',
    rainbow: 'Rainbow Friends',
    fnaf: 'Five Nights at Freddys',
    pet: 'Pet Simulator',
    fisch: 'Fisch',
    aadan: 'EC Working Hard to Upload',
    'kof-orochi-saga': 'King of Fighters The Orichi Saga',
    'moon-coffee': 'Moon Coffee Co.',
    complexity: 'Complexity Surveillance',
    blox: 'Blox Fruits',
    proj1: 'Poppy Playtime',
    proj2: 'Invincible',
    proj3: 'One Piece',
    bendy: 'More Projects'
  };

  const params = new URLSearchParams(window.location.search);
  const rawKey = (params.get('key') || '').trim().toLowerCase();
  const keyAliases = {
    clean: 'clean-by-pallet'
  };
  const key = keyAliases[rawKey] || rawKey;
  const pageData = projectPages[key] || fallbackTemplate(projectNames[key] || projectNames[rawKey] || 'Project');
  if (key === 'complexity') {
    pageData.hero = 'assets/images/cslogoenhanced.png';
    pageData.subtitle = 'Complexity Surveillance is a security solutions provider specializing in residential and commercial surveillance systems. The company focuses on delivering reliable, technology-driven protection through professionally installed camera systems designed for visibility, safety, and peace of mind. Their services emphasize precision, trust, and modern security infrastructure for everyday environments.';
    if (Array.isArray(pageData.sections) && pageData.sections[0]) {
      pageData.sections[0].title = 'Project Brief';
      pageData.sections[0].copy = 'Complexity Surveillance needed a professional brand identity that communicated reliability, precision, and modern technology. The goal was to create a clean, recognizable visual system that could scale across service vehicles, uniforms, business cards, and marketing materials while reinforcing trust and security in both residential and commercial environments';
      pageData.sections[0].images = ['assets/images/tshirt.jpg'];
    }
    if (Array.isArray(pageData.sections) && pageData.sections[1]) {
      const appSection = pageData.sections[1];
      const appImages = Array.isArray(appSection.images) ? appSection.images : [];
      appSection.copy = 'The identity system was built to scale easily across real-world service touchpoints such as technician apparel, fleet vehicles, work order documents, and business cards. High-contrast colors and simple iconography ensure the brand remains legible and impactful in both digital and physical environments. These applications help create a cohesive and professional presence that reflects the company’s reliability and technical expertise in the field.';
      appSection.sectionClass = 'pp-complexity-left-hero';
      appSection.images = [
        'assets/images/Complexity Van.jpg',
        'assets/images/Complexity Page.jpg',
        'assets/images/Complexity Business Card.jpg'
      ];
    }
  }
  if (key === 'moon-coffee') {
    pageData.hero = 'assets/images/Moon Coffee Hero2.jpg';
    pageData.subtitle = 'Moon Coffee Co. was developed as a premium, modern coffee identity built around a bold lunar-inspired wordmark and a cohesive icon system (moon + stars) that feels confident, minimal, and instantly recognizable. I translated that core mark into a flexible brand world by designing a repeatable pattern language and applying it across key touchpoints—especially packaging—so the identity stays consistent while still feeling dynamic. My process focused on production-realistic execution: clean typography, tight spacing rules, and high-contrast applications that remain legible on dark substrates and under finishes like spot UV. The result is a scalable, retail-ready brand system that feels elevated, distinctive, and easy to extend into new products and campaign imagery.';
    if (Array.isArray(pageData.sections) && pageData.sections[0]) {
      pageData.sections[0].title = 'Project Brief';
      pageData.sections[0].copy = 'Moon Coffee needed a brand identity that felt warm, premium, and memorable while reflecting the calm, ritualistic nature of enjoying coffee. The goal was to create a distinctive logo and visual system that blended celestial inspiration with coffee culture, allowing the brand to stand out across cups, packaging, and storefront applications.';
      pageData.sections[0].images = ['assets/images/Moon Coffee Hero3.jpg'];
    }
    if (Array.isArray(pageData.sections) && pageData.sections[1]) {
      const moonNextSection = pageData.sections[1];
      moonNextSection.title = 'Direction + Application';
      moonNextSection.copy = 'The Moon Coffee brand identity was designed to feel calm, premium, and approachable while subtly referencing the ritual of coffee. The moon and coffee bean motif creates a distinctive visual mark that blends celestial inspiration with the product itself, giving the brand a memorable and symbolic identity. The deep, dark color palette paired with the Canela type family reinforces a refined, modern aesthetic that feels both cozy and sophisticated. When applied across cups and packaging, the branding remains highly legible and consistent, allowing the pattern, logo, and typography to work together to create a cohesive and recognizable coffee experience.';
      const moonNextImages = [
        'assets/images/moon_2.jpg',
        'assets/images/moon_3.jpg',
        'assets/images/Moon Coffee Hero4.jpg'
      ];
      moonNextSection.sectionClass = 'pp-moon-coffee-bottom-hero';
      moonNextSection.images = moonNextImages;
    }
  }
  if (key === 'kof-orochi-saga') {
    pageData.hero = 'assets/images/KoFHero.jpg';
    pageData.title = 'King of Fighters The Orichi Saga';
    pageData.subtitle = 'The King of Fighters: The Orochi Saga is a trading card game inspired by the iconic storyline from the King of Fighters series. The game brings together legendary fighters from the saga, allowing players to build decks, battle opponents, and relive the conflict between rival teams and the mysterious Orochi power. Through collectible cards featuring characters, abilities, and special moves, the game translates the energy and strategy of the classic fighting series into a competitive tabletop experience.';
    if (Array.isArray(pageData.sections) && pageData.sections[0]) {
      pageData.sections[0].title = 'Project Brief';
      pageData.sections[0].copy = 'The King of Fighters: The Orochi Saga expandable trading card game required a new logo and packaging system to launch the brand with a bold, collectible presence. The identity leans into KOF’s signature energy—pairing aggressive flame motion with darker, supernatural tones that reflect the Orochi storyline. Packaging was designed for strong hierarchy and instant shelf impact, ensuring clear readability across boxes, card backs, and future expansions. The system was built to feel premium and scalable, establishing a consistent visual foundation for upcoming releases and special edition packs.';
      pageData.sections[0].images = ['assets/images/KoFHero2.png'];
    }
    if (Array.isArray(pageData.sections) && pageData.sections[1]) {
      const kofNextSection = pageData.sections[1];
      kofNextSection.copy = 'The identity was applied across key touchpoints to create a cohesive, launch-ready system for The King of Fighters: The Orochi Saga trading card game. Packaging visuals were developed as premium hero mockups to highlight shelf impact, readability, and character-driven storytelling while keeping the logo as the central focal point. The trading card back direction extends the same energy into gameplay components, using a simplified frame and atmospheric texture to support the brand without overpowering it. Together, these applications demonstrate a scalable design language built to carry across future expansions, special packs, and additional marketing assets.';
      kofNextSection.sectionClass = 'pp-kof-next-hero';
      kofNextSection.images = [
        'assets/images/KoFHero3.png',
        'assets/images/KoFCard.jpg',
        'assets/images/KOF_brand-03.png'
      ];
    }
  }
  document.body.classList.toggle('pp-theme-sun-books', key === 'sun-books');
  document.body.classList.toggle('pp-theme-clean-by-pallet', key === 'clean-by-pallet');
  document.body.classList.toggle('pp-theme-complexity', key === 'complexity');
  document.body.classList.toggle('pp-theme-kof-orochi-saga', key === 'kof-orochi-saga');
  document.body.classList.toggle('pp-theme-moon-coffee', key === 'moon-coffee');

  document.title = `${pageData.title} – Case Study`;

  const root = document.getElementById('projectPageRoot');
  if (!root) return;

  const escapeHtml = (str) => String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  const renderSection = (section) => {
    const sectionClassName = String(section.sectionClass || '').trim();
    const safeSectionClass = sectionClassName
      ? ' ' + sectionClassName.replace(/[^a-z0-9_-]/gi, ' ').trim().replace(/\s+/g, ' ')
      : '';
    const title = `<h2 class="pp-section-title">${escapeHtml(section.title || '')}</h2>`;
    const copy = `<p class="pp-copy">${escapeHtml(section.copy || '')}</p>`;
    const images = Array.isArray(section.images) ? section.images : [];

    if (section.layout === 'two-up-then-single') {
      return `
        <section class="pp-section${safeSectionClass}">
          ${title}
          ${copy}
          <div class="pp-grid-2">
            <img class="pp-img" src="${images[0] || ''}" alt="${escapeHtml(section.title || 'project image')}" loading="lazy" />
            <img class="pp-img" src="${images[1] || ''}" alt="${escapeHtml(section.title || 'project image')}" loading="lazy" />
          </div>
          <div class="pp-stack">
            <img class="pp-img" src="${images[2] || ''}" alt="${escapeHtml(section.title || 'project image')}" loading="lazy" />
          </div>
        </section>
      `;
    }

    return `
      <section class="pp-section${safeSectionClass}">
        ${title}
        ${copy}
        <div class="pp-stack">
          ${images.map((src) => `<img class="pp-img" src="${src || ''}" alt="${escapeHtml(section.title || 'project image')}" loading="lazy" />`).join('')}
        </div>
      </section>
    `;
  };

  root.innerHTML = `
    <h1 class="pp-headline">${escapeHtml(pageData.title || 'Project')}</h1>
    <p class="pp-sub">${escapeHtml(pageData.subtitle || '')}</p>
    <section class="pp-hero">
      <img class="pp-img" src="${pageData.hero || ''}" alt="${escapeHtml((pageData.title || 'Project') + ' hero image')}" />
    </section>
    ${(Array.isArray(pageData.sections) ? pageData.sections : []).map(renderSection).join('')}
  `;
})();
