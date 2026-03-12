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
      subtitle: 'Clean by Pallet is a luxury-first beauty concept designed to feel crisp, elevated, and unmistakably premium through restrained color, polished materials, and sharp editorial hierarchy.',
      hero: 'assets/images/Clean by Pallet Hero.png',
      facts: [
        {
          label: 'Category',
          value: 'Beauty branding'
        },
        {
          label: 'Focus',
          value: 'Luxury restraint + polish'
        },
        {
          label: 'Deliverables',
          value: 'Identity, packaging, campaign mockups'
        }
      ],
      sections: [
        {
          title: 'Brand Direction',
          kicker: 'Foundation',
          copy: 'Clean by Pallet is built on precision + restraint—a luxury system that feels crisp, modern, and intentional. The visual language is minimal and high-contrast: mirror-polished chrome, soft studio whites, and a single controlled red accent used like a signature. Typography is elegant and editorial, letting space and proportion do the heavy lifting while the materials communicate premium quality. Overall, the brand aims to feel “clean” without becoming sterile—refined, elevated, and confidently simple.',
          layout: 'single',
          images: ['assets/images/3Q Palette.png'],
          captions: ['Core palette and visual language defining the clean, reflective, high-fashion tone of the brand.']
        },
        {
          title: 'Application',
          kicker: 'Rollout',
          copy: 'The system scales across packaging, product, and digital touchpoints by keeping the same core rules: monochrome foundations, consistent lighting, immaculate materials, and disciplined use of the red accent. On-product and packaging, the chrome and subtle textures reinforce luxury and tactility; in digital and campaign work, liquid-metal surfaces and bold type create immediate impact without clutter. Whether it’s a hero image, retail display, social post, or billboard, everything should feel unified—minimal composition, perfect alignment, and a premium finish that reads instantly as Clean by Pallet.',
          sectionClass: 'pp-application-focus',
          layout: 'two-up-then-single',
          images: [
            'assets/images/CleanHero1.png',
            'assets/images/CleanLipstick.jpg',
            'assets/images/Liquid.jpg'
          ],
          captions: [
            'Hero packaging visual showing how the identity holds up in a premium retail context.',
            'Product application focused on material contrast, restraint, and tactile luxury cues.',
            'Campaign-style imagery extending the brand into a dramatic, polished visual world.'
          ]
        }
      ]
    },
    'sun-books': {
      title: 'Sun Books Publishing',
      subtitle: 'Sun Books Publishing is a warm, editorial identity concept that blends the optimism of early learning with the credibility of classic publishing design.',
      hero: 'assets/images/SunbooksHero.jpg',
      facts: [
        {
          label: 'Category',
          value: 'Publishing identity'
        },
        {
          label: 'Focus',
          value: 'Education + editorial warmth'
        },
        {
          label: 'Deliverables',
          value: 'Logo, stationery, merchandise'
        }
      ],
      sections: [
        {
          title: 'Brand Identity',
          kicker: 'Concept',
          copy: `This identity works for Sun Books because it communicates the idea of learning and discovery right away—the sun rising from an open book is simple, clear, and memorable. The navy and golden yellow palette balances trust and warmth, making it feel credible for parents and educators while still inviting for kids. Baskerville supports the publishing space with a classic, editorial tone, and the bold hierarchy keeps everything readable across covers, spines, and digital. Overall, it feels cohesive and flexible enough to scale into a full system of real-world applications.`,
          layout: 'single',
          images: ['assets/images/sunBooks hero2.jpg'],
          captions: ['Primary identity direction pairing a sunrise motif with an open-book silhouette for immediate recognition.']
        },
        {
          title: 'Applications',
          kicker: 'System in Use',
          copy: 'The Sun Books identity extends cleanly across real-world touchpoints, from stationery and packaging to school-ready merchandise, without losing clarity or consistency. The logo remains highly legible at multiple sizes, making it effective on everything from book spines and shipping boxes to pens, backpacks, and accessories. A tight color palette and strong typographic hierarchy keep each application feeling editorial and premium, while still approachable for a family-focused audience. Overall, the system is flexible enough to scale across product lines while staying unmistakably Sun Books.',
          layout: 'two-up-then-single',
          images: [
            'assets/images/Sun_Books_2.png',
            'assets/images/Sun_Books_3.png',
            'assets/images/Sun_Books_4.png'
          ],
          captions: [
            'Logo identity breakdown highlighting the sun-over-book concept, core mark construction, and the visual idea behind the brand.',
            'Typography system establishing Baskerville weights for primary, secondary, and tertiary text applications across the identity.',
            'Extended merchandise showing how the identity scales across school and retail surfaces.'
          ]
        }
      ]
    },
    'lowtide-ipa': {
      title: 'Lowtide IPA',
      subtitle: 'Lowtide IPA is a premium packaging concept built around beachside energy, fast shelf recognition, and a bold typographic system that can flex across future flavor drops, launch cards, and seasonal campaign touchpoints.',
      hero: 'assets/images/Brew Co.jpg',
      facts: [
        {
          label: 'Category',
          value: 'Packaging concept'
        },
        {
          label: 'Focus',
          value: 'Shelf impact + readability'
        },
        {
          label: 'Deliverables',
          value: 'Can system, launch card'
        }
      ],
      sections: [
        {
          title: 'Project Brief',
          kicker: 'Positioning',
          copy: 'The goal for Lowtide IPA was to create a beer brand that feels bright, coastal, and confidently premium without losing clarity at shelf distance. I approached the identity by pairing oversized type with a simplified visual rhythm so the branding reads instantly and establishes a recognizable personality before it ever reaches the shelf. The resulting system feels energetic, modern, and flexible enough to support future variants, promotional graphics, and packaging extensions without losing cohesion.',
          layout: 'single',
          images: ['assets/images/LowTide Branding.jpg'],
          captions: ['Branding overview presenting the Lowtide identity through bold lettering, coastal color contrast, and a flexible visual system designed to scale across future touchpoints.']
        },
        {
          title: 'Packaging System',
          kicker: 'Application',
          copy: 'The packaging system carries the same Lowtide identity into a retail-ready format by balancing shelf impact with clean readability. Strong framing, confident typography, and the underwater illustration language give the can immediate personality, while the supporting launch card helps extend the brand into campaign and presentation moments. Together, these applications show how the identity can move from brand concept to a cohesive packaging family without losing its coastal energy.',
          layout: 'two-up',
          sectionClass: 'pp-lowtide-split',
          images: [
            'assets/images/LowtideIPA.jpg',
            'assets/images/Clean Beer details.jpg'
          ],
          captions: [
            'Retail-ready packaging system showing the illustrated can and multi-pack carrier working together with a clear, shelf-ready Lowtide hierarchy.',
            'Close-up packaging hero highlighting the illustrated Lowtide can in a calm coastal scene, with the label artwork and typography carrying the brand’s beach-inspired personality.'
          ]
        },
        {
          title: 'Illustration Detail',
          kicker: 'Label Artwork',
          copy: 'A key part of the Lowtide label system is the custom underwater illustration I created in Adobe Illustrator. The scene was built to add storytelling and texture without overwhelming the typography, using coral, sea life, and layered organic shapes to give the can a distinct sense of place. By drawing the artwork as vector illustration, the label stays crisp, scalable, and production-friendly while still delivering a rich, handcrafted personality up close.',
          layout: 'single',
          images: ['assets/images/Label Info.jpg'],
          captions: ['Illustration breakdown highlighting the vector artwork created in Illustrator for the label, designed to add depth, texture, and a distinctive coastal narrative to the packaging.']
        }
      ]
    },
    neopets: {
      title: 'Neopets',
      subtitle: 'A nostalgic brand refresh translated into modern collectible packaging systems, in-store storytelling, and launch-ready assets.',
      hero: stock('neopets-hero'),
      facts: [
        {
          label: 'Category',
          value: 'Collectible packaging'
        },
        {
          label: 'Focus',
          value: 'Nostalgia + modern retail polish'
        },
        {
          label: 'Deliverables',
          value: 'Packaging concepts, shelf storytelling'
        }
      ],
      sections: [
        {
          title: 'Many Directions',
          kicker: 'Exploration',
          copy: 'Creating a brand that spans across multiple applications as a solutions-driven operator was made so easy with their brilliant team. We explored many different avenues that the brand could go in before settling on a clear, premium system that could scale from shelf to social.',
          layout: 'single',
          images: [stock('neopets-explore', 1800, 1000)],
          captions: ['Early exploration focused on balancing nostalgia, collectibility, and a more current retail presentation.']
        },
        {
          title: 'Elevated Experience',
          kicker: 'Application',
          copy: 'We designed the packaging architecture to feel premium while still playful. Structural hierarchy, typography rhythm, and color contrast were tuned so every touchpoint feels cohesive and collectible.',
          layout: 'two-up-then-single',
          images: [
            stock('neopets-a', 1000, 1200),
            stock('neopets-b', 1000, 1200),
            stock('neopets-c', 1800, 1000)
          ],
          captions: [
            'Front-facing collectible packaging concept developed for stronger shelf appeal.',
            'Secondary format study exploring hierarchy, callouts, and character balance.',
            'Expanded brand world showing how the system could stretch into larger retail moments.'
          ]
        }
      ]
    },
    dress: {
      title: 'Dress to Impress',
      subtitle: 'Premium toy-fashion packaging with bold shelf presence, collector logic, and fast-turn launch execution.',
      hero: stock('dress-hero'),
      facts: [
        {
          label: 'Category',
          value: 'Toy-fashion packaging'
        },
        {
          label: 'Focus',
          value: 'Collector clarity + attitude'
        },
        {
          label: 'Deliverables',
          value: 'Packaging system, launch visuals'
        }
      ],
      sections: [
        {
          title: 'Greyheath-Inspired Editorial Style',
          kicker: 'Visual Tone',
          copy: 'A premium visual approach balancing modern elegance with approachable energy. The tone stays fashion-forward while preserving toy-category clarity for younger shoppers and gift-givers.',
          layout: 'single',
          images: [stock('dress-grid-1', 1800, 1050)],
          captions: ['Editorial direction study aimed at making the brand feel aspirational while staying toy-shelf friendly.']
        },
        {
          title: 'System Thinking',
          kicker: 'Architecture',
          copy: 'Across mystery products, dolls, and deluxe sets, the hierarchy remains consistent: strongest hero area first, read-optimized callouts second, then collectible depth.',
          layout: 'two-up-then-single',
          images: [stock('dress-grid-2', 1000, 1200), stock('dress-grid-3', 1000, 1200), stock('dress-grid-4', 1800, 1050)],
          captions: [
            'Package format concept for core SKUs, prioritizing attitude and easy read distance.',
            'Variant packaging study showing how the system could scale across collectible tiers.',
            'Broader retail presentation tying the full line together with one recognizable hierarchy.'
          ]
        }
      ]
    },
    aadan: {
      title: 'EC Working Hard to Upload',
      subtitle: 'This case study is currently in progress. Final assets and detailed breakdowns are being prepared and will be uploaded soon.',
      hero: 'assets/images/aadan.png?v=20260302',
      facts: [
        {
          label: 'Status',
          value: 'In progress'
        },
        {
          label: 'Next Update',
          value: 'Process + final mockups'
        },
        {
          label: 'Deliverables',
          value: 'Case study pending upload'
        }
      ],
      sections: [
        {
          title: 'Coming Soon',
          kicker: 'Status',
          copy: 'I am actively building this case study and organizing final visuals. Please check back soon for the full project brief, process work, and application examples.',
          layout: 'single',
          images: ['assets/images/comingsoon.jpg'],
          captions: ['Placeholder artwork until final project visuals and process slides are uploaded.']
        },
        {
          title: 'Application',
          kicker: 'What’s Next',
          copy: 'Additional brand applications and production-ready mockups will be added once final assets are approved.',
          layout: 'single',
          images: ['assets/images/comingsoon.jpg'],
          captions: ['Additional packaging, branding, and rollout imagery will appear here once the case study is finalized.']
        }
      ]
    }
  };

  const fallbackTemplate = (name) => ({
    title: name,
    subtitle: 'Case study page in progress. Placeholder visuals are being used until final imagery is provided.',
    hero: stock(`${name}-hero`),
    facts: [
      {
        label: 'Status',
        value: 'Template ready'
      },
      {
        label: 'Needs',
        value: 'Final visuals + copy'
      },
      {
        label: 'Layout',
        value: 'Reusable case study system'
      }
    ],
    sections: [
      {
        title: 'Direction',
        kicker: 'Placeholder',
        copy: 'This page is structured and ready. Once you provide final assets, we can drop them into this exact layout and polish copy per project.',
        layout: 'single',
        images: [stock(`${name}-direction`, 1800, 1000)],
        captions: ['Temporary artwork used to keep the case study structure in place until final assets arrive.']
      },
      {
        title: 'Application',
        kicker: 'Scalability',
        copy: 'A reusable section format keeps every project consistent while still allowing unique storytelling per brand.',
        layout: 'two-up-then-single',
        images: [stock(`${name}-app-a`, 1000, 1200), stock(`${name}-app-b`, 1000, 1200), stock(`${name}-app-c`, 1800, 1050)],
        captions: [
          'Temporary application mockup A.',
          'Temporary application mockup B.',
          'Temporary wide-format application mockup.'
        ]
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
    'lowtide-ipa': 'Lowtide IPA',
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
  document.body.dataset.projectKey = key || 'project';
  if (key === 'complexity') {
    pageData.hero = 'assets/images/cslogoenhanced.png';
    pageData.subtitle = 'Complexity Surveillance is a security solutions provider specializing in residential and commercial surveillance systems. The company focuses on delivering reliable, technology-driven protection through professionally installed camera systems designed for visibility, safety, and peace of mind. Their services emphasize precision, trust, and modern security infrastructure for everyday environments.';
    pageData.facts = [
      {
        label: 'Category',
        value: 'Security branding'
      },
      {
        label: 'Focus',
        value: 'Trust, clarity, field use'
      },
      {
        label: 'Deliverables',
        value: 'Identity, fleet, collateral'
      }
    ];
    if (Array.isArray(pageData.sections) && pageData.sections[0]) {
      pageData.sections[0].title = 'Project Brief';
      pageData.sections[0].kicker = 'Foundation';
      pageData.sections[0].copy = 'Complexity Surveillance needed a professional brand identity that communicated reliability, precision, and modern technology. The goal was to create a clean, recognizable visual system that could scale across service vehicles, uniforms, business cards, and marketing materials while reinforcing trust and security in both residential and commercial environments';
      pageData.sections[0].images = ['assets/images/tshirt.jpg'];
      pageData.sections[0].captions = ['Initial branded apparel study created to establish a practical, recognizable field-ready identity.'];
    }
    if (Array.isArray(pageData.sections) && pageData.sections[1]) {
      const appSection = pageData.sections[1];
      appSection.kicker = 'Application';
      appSection.copy = 'The identity system was built to scale easily across real-world service touchpoints such as technician apparel, fleet vehicles, work order documents, and business cards. High-contrast colors and simple iconography ensure the brand remains legible and impactful in both digital and physical environments. These applications help create a cohesive and professional presence that reflects the company’s reliability and technical expertise in the field.';
      appSection.sectionClass = 'pp-complexity-left-hero';
      appSection.images = [
        'assets/images/Complexity Van.jpg',
        'assets/images/Complexity Page.jpg',
        'assets/images/Complexity Business Card.jpg'
      ];
      appSection.captions = [
        'Fleet application designed for immediate recognition on the road and at client locations.',
        'Printed service materials showing how the brand stays clean and legible in day-to-day operations.',
        'Compact business collateral carrying the same high-contrast system into client-facing moments.'
      ];
    }
  }
  if (key === 'moon-coffee') {
    pageData.hero = 'assets/images/Moon Coffee Hero2.jpg';
    pageData.subtitle = 'Moon Coffee Co. was developed as a premium, modern coffee identity built around a bold lunar-inspired wordmark and a cohesive icon system (moon + stars) that feels confident, minimal, and instantly recognizable. I translated that core mark into a flexible brand world by designing a repeatable pattern language and applying it across key touchpoints—especially packaging—so the identity stays consistent while still feeling dynamic. My process focused on production-realistic execution: clean typography, tight spacing rules, and high-contrast applications that remain legible on dark substrates and under finishes like spot UV. The result is a scalable, retail-ready brand system that feels elevated, distinctive, and easy to extend into new products and campaign imagery.';
    pageData.facts = [
      {
        label: 'Category',
        value: 'Coffee branding'
      },
      {
        label: 'Focus',
        value: 'Premium ritual + recognition'
      },
      {
        label: 'Deliverables',
        value: 'Logo, cups, packaging system'
      }
    ];
    if (Array.isArray(pageData.sections) && pageData.sections[0]) {
      pageData.sections[0].title = 'Project Brief';
      pageData.sections[0].kicker = 'Foundation';
      pageData.sections[0].copy = 'Moon Coffee needed a brand identity that felt warm, premium, and memorable while reflecting the calm, ritualistic nature of enjoying coffee. The goal was to create a distinctive logo and visual system that blended celestial inspiration with coffee culture, allowing the brand to stand out across cups, packaging, and storefront applications.';
      pageData.sections[0].images = ['assets/images/Moon Coffee Hero3.jpg'];
      pageData.sections[0].captions = ['Primary identity presentation introducing the lunar mark, typography, and premium mood of the brand.'];
    }
    if (Array.isArray(pageData.sections) && pageData.sections[1]) {
      const moonNextSection = pageData.sections[1];
      moonNextSection.title = 'Direction + Application';
      moonNextSection.kicker = 'System in Use';
      moonNextSection.copy = 'The Moon Coffee brand identity was designed to feel calm, premium, and approachable while subtly referencing the ritual of coffee. The moon and coffee bean motif creates a distinctive visual mark that blends celestial inspiration with the product itself, giving the brand a memorable and symbolic identity. The deep, dark color palette paired with the Canela type family reinforces a refined, modern aesthetic that feels both cozy and sophisticated. When applied across cups and packaging, the branding remains highly legible and consistent, allowing the pattern, logo, and typography to work together to create a cohesive and recognizable coffee experience.';
      const moonNextImages = [
        'assets/images/moon_2.jpg',
        'assets/images/moon_3.jpg',
        'assets/images/Moon Coffee Hero4.jpg'
      ];
      moonNextSection.sectionClass = 'pp-moon-coffee-bottom-hero';
      moonNextSection.images = moonNextImages;
      moonNextSection.captions = [
        'Logo identity breakdown showing how the moon, coffee bean, and star details combine into one distinctive brand mark.',
        'Typography system establishing the Canela family for primary, secondary, and tertiary text applications across the brand.',
        'Hero composition combining logo, typography, and packaging into one retail-ready presentation.'
      ];
    }
  }
  if (key === 'kof-orochi-saga') {
    pageData.hero = 'assets/images/KoFHero.png?v=20260309';
    pageData.title = 'King of Fighters The Orichi Saga';
    pageData.subtitle = 'The King of Fighters: The Orochi Saga is a trading card game inspired by the iconic storyline from the King of Fighters series. The game brings together legendary fighters from the saga, allowing players to build decks, battle opponents, and relive the conflict between rival teams and the mysterious Orochi power. Through collectible cards featuring characters, abilities, and special moves, the game translates the energy and strategy of the classic fighting series into a competitive tabletop experience.';
    pageData.facts = [
      {
        label: 'Category',
        value: 'TCG branding'
      },
      {
        label: 'Focus',
        value: 'Collectibility + story energy'
      },
      {
        label: 'Deliverables',
        value: 'Logo, box system, card back'
      }
    ];
    if (Array.isArray(pageData.sections) && pageData.sections[0]) {
      pageData.sections[0].title = 'Project Brief';
      pageData.sections[0].kicker = 'Launch Direction';
      pageData.sections[0].copy = 'The King of Fighters: The Orochi Saga expandable trading card game required a new logo and packaging system to launch the brand with a bold, collectible presence. The identity leans into KOF’s signature energy—pairing aggressive flame motion with darker, supernatural tones that reflect the Orochi storyline. Packaging was designed for strong hierarchy and instant shelf impact, ensuring clear readability across boxes, card backs, and future expansions. The system was built to feel premium and scalable, establishing a consistent visual foundation for upcoming releases and special edition packs.';
      pageData.sections[0].images = ['assets/images/KOF_brand-02.jpg'];
      pageData.sections[0].captions = ['Brand identity exploration focused on a fully vectorized logo system built for print, sharp reproduction, and a bold collectible presence.'];
    }
    if (Array.isArray(pageData.sections) && pageData.sections[1]) {
      const kofNextSection = pageData.sections[1];
      kofNextSection.kicker = 'Application';
      kofNextSection.copy = 'The identity was applied across key touchpoints to create a cohesive, launch-ready system for The King of Fighters: The Orochi Saga trading card game. Packaging visuals were developed as premium hero mockups to highlight shelf impact, readability, and character-driven storytelling while keeping the logo as the central focal point. The trading card back direction extends the same energy into gameplay components, using a simplified frame and atmospheric texture to support the brand without overpowering it. Together, these applications demonstrate a scalable design language built to carry across future expansions, special packs, and additional marketing assets.';
      kofNextSection.sectionClass = 'pp-kof-next-hero';
      kofNextSection.images = [
        'assets/images/KoFHero3.jpg',
        'assets/images/KoF Back of Card.jpg',
        'assets/images/KOF_brand-03.png'
      ];
      kofNextSection.captions = [
        'Hero packaging mockup showcasing the fiery launch presence of the identity.',
        'Card-back system built to support gameplay readability without sacrificing atmosphere.',
        'Extended brand asset showing how the system could scale into future expansion formats.'
      ];
    }
  }
  document.body.classList.toggle('pp-theme-sun-books', key === 'sun-books');
  document.body.classList.toggle('pp-theme-clean-by-pallet', key === 'clean-by-pallet');
  document.body.classList.toggle('pp-theme-complexity', key === 'complexity');
  document.body.classList.toggle('pp-theme-kof-orochi-saga', key === 'kof-orochi-saga');
  document.body.classList.toggle('pp-theme-moon-coffee', key === 'moon-coffee');
  document.body.classList.toggle('pp-theme-lowtide-ipa', key === 'lowtide-ipa');

  document.title = `${pageData.title} – Case Study`;

  const root = document.getElementById('projectPageRoot');
  if (!root) return;

  const escapeHtml = (str) => String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  const renderFacts = (facts) => {
    const items = Array.isArray(facts)
      ? facts.filter((fact) => fact && (fact.label || fact.value))
      : [];
    if (!items.length) return '';

    return `
      <section class="pp-facts" aria-label="Project summary">
        ${items.map((fact) => `
          <div class="pp-fact">
            <span class="pp-fact-label">${escapeHtml(fact.label || '')}</span>
            <strong class="pp-fact-value">${escapeHtml(fact.value || '')}</strong>
          </div>
        `).join('')}
      </section>
    `;
  };

  const renderImage = (src, alt, caption = '') => {
    if (!src) return '';
    const safeCaption = String(caption || '').trim();
    const figureClass = safeCaption ? 'pp-figure pp-figure--captioned' : 'pp-figure';
    return `
      <figure class="${figureClass}">
        <img class="pp-img" src="${src}" alt="${escapeHtml(alt || 'project image')}" loading="lazy" />
        ${safeCaption ? `<figcaption class="pp-caption">${escapeHtml(safeCaption)}</figcaption>` : ''}
      </figure>
    `;
  };

  const renderSection = (section) => {
    const sectionClassName = String(section.sectionClass || '').trim();
    const safeSectionClass = sectionClassName
      ? ' ' + sectionClassName.replace(/[^a-z0-9_-]/gi, ' ').trim().replace(/\s+/g, ' ')
      : '';
    const kicker = section.kicker ? `<p class="pp-kicker">${escapeHtml(section.kicker || '')}</p>` : '';
    const title = `<h2 class="pp-section-title">${escapeHtml(section.title || '')}</h2>`;
    const copy = `<p class="pp-copy">${escapeHtml(section.copy || '')}</p>`;
    const images = Array.isArray(section.images) ? section.images : [];
    const captions = Array.isArray(section.captions) ? section.captions : [];

    if (section.layout === 'two-up') {
      return `
        <section class="pp-section${safeSectionClass}">
          ${kicker}
          ${title}
          ${copy}
          <div class="pp-grid-2">
            ${renderImage(images[0] || '', section.title || 'project image', captions[0] || '')}
            ${renderImage(images[1] || '', section.title || 'project image', captions[1] || '')}
          </div>
        </section>
      `;
    }

    if (section.layout === 'two-up-then-single') {
      return `
        <section class="pp-section${safeSectionClass}">
          ${kicker}
          ${title}
          ${copy}
          <div class="pp-grid-2">
            ${renderImage(images[0] || '', section.title || 'project image', captions[0] || '')}
            ${renderImage(images[1] || '', section.title || 'project image', captions[1] || '')}
          </div>
          <div class="pp-stack">
            ${renderImage(images[2] || '', section.title || 'project image', captions[2] || '')}
          </div>
        </section>
      `;
    }

    return `
      <section class="pp-section${safeSectionClass}">
        ${kicker}
        ${title}
        ${copy}
        <div class="pp-stack">
          ${images.map((src, index) => renderImage(src || '', section.title || 'project image', captions[index] || '')).join('')}
        </div>
      </section>
    `;
  };

  root.innerHTML = `
    <h1 class="pp-headline">${escapeHtml(pageData.title || 'Project')}</h1>
    <p class="pp-sub">${escapeHtml(pageData.subtitle || '')}</p>
    ${renderFacts(pageData.facts)}
    <section class="pp-hero">
      <img class="pp-img" src="${pageData.hero || ''}" alt="${escapeHtml((pageData.title || 'Project') + ' hero image')}" />
    </section>
    ${(Array.isArray(pageData.sections) ? pageData.sections : []).map(renderSection).join('')}
  `;
})();
