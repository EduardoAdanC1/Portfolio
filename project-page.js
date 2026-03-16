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
          label: 'Role',
          value: 'Identity, packaging + art direction'
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
      summary: [
        {
          label: 'Challenge',
          value: 'Create a beauty identity that feels luxury-first and ultra-clean without slipping into something cold or generic.'
        },
        {
          label: 'What I owned',
          value: 'I developed the identity direction, packaging expressions, material language, and campaign-style applications.'
        },
        {
          label: 'Key constraint',
          value: 'The system had to stay minimal enough for premium positioning while still creating immediate visual distinction.'
        },
        {
          label: 'Outcome',
          value: 'The result is a tightly art-directed brand world that scales cleanly from product to packaging to launch imagery.'
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
          label: 'Role',
          value: 'Identity system + merch applications'
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
      summary: [
        {
          label: 'Challenge',
          value: 'Make a publishing identity feel trustworthy for educators and parents while still warm enough for young readers.'
        },
        {
          label: 'What I owned',
          value: 'I built the logo concept, typographic system, merchandise applications, and the broader editorial visual language.'
        },
        {
          label: 'Key constraint',
          value: 'The mark needed to stay legible across book spines, stationery, and school merchandise without losing personality.'
        },
        {
          label: 'Outcome',
          value: 'The system balances educational credibility with optimism, giving the brand a flexible identity for both retail and publishing use.'
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
          label: 'Role',
          value: 'Identity, can system + illustration'
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
      summary: [
        {
          label: 'Challenge',
          value: 'Create a beer identity that feels coastal and energetic while still reading instantly at shelf distance.'
        },
        {
          label: 'What I owned',
          value: 'I built the identity, can graphics, launch card, and the custom underwater illustration system for the label.'
        },
        {
          label: 'Key constraint',
          value: 'The packaging had to stay bold and readable first, while using illustration to add character instead of visual clutter.'
        },
        {
          label: 'Outcome',
          value: 'The final concept feels retail-ready, distinctive, and flexible enough to expand into a larger flavor and campaign family.'
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
          label: 'Role',
          value: 'Packaging direction + collectible system'
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
      summary: [
        {
          label: 'Challenge',
          value: 'Refresh a nostalgic brand for modern retail without losing the charm longtime fans already recognize.'
        },
        {
          label: 'What I owned',
          value: 'I developed packaging directions, collectible hierarchy, and a more premium visual system for shelf and launch storytelling.'
        },
        {
          label: 'Key constraint',
          value: 'The work needed to feel contemporary and collectible while preserving the color, energy, and familiarity people expect from Neopets.'
        },
        {
          label: 'Outcome',
          value: 'The resulting direction balances nostalgia with cleaner retail structure, making the brand easier to scale across modern product formats.'
        }
      ],
      sections: [
        {
          title: 'Project Brief',
          kicker: 'Exploration',
          copy: 'The Neopets direction started with a clear goal: preserve the familiarity and affection of the original brand while organizing it into a sharper, more retail-ready system. Exploration focused on how much nostalgia to retain, how much hierarchy to modernize, and how to make the collectible story read faster across packaging and presentation touchpoints.',
          layout: 'single',
          images: [stock('neopets-explore', 1800, 1000)],
          captions: ['Early exploration focused on balancing nostalgia, collectibility, and a more current retail presentation.']
        },
        {
          title: 'System in Use',
          kicker: 'Application',
          copy: 'The final packaging language was built to feel more premium while keeping the brand playful and accessible. Structural hierarchy, collector cues, color contrast, and character placement were tuned to make the assortment easier to scan while still feeling unmistakably Neopets. That balance gives the brand a cleaner retail presence without stripping away its personality.',
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
          label: 'Role',
          value: 'Packaging system + launch direction'
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
      summary: [
        {
          label: 'Challenge',
          value: 'Build packaging that feels fashion-forward and collectible while still landing clearly in a toy aisle environment.'
        },
        {
          label: 'What I owned',
          value: 'I shaped the packaging system, launch-facing visual direction, and hierarchy needed to scale across multiple collectible formats.'
        },
        {
          label: 'Key constraint',
          value: 'The line needed to carry a premium tone and strong character attitude without sacrificing readability for younger shoppers and gift buyers.'
        },
        {
          label: 'Outcome',
          value: 'The system creates a bolder shelf presence while keeping assortment logic, callouts, and collectible depth organized across the line.'
        }
      ],
      sections: [
        {
          title: 'Project Brief',
          kicker: 'Visual Tone',
          copy: 'Dress to Impress needed a packaging approach that could borrow cues from editorial fashion while still functioning as clear, high-energy toy packaging. The direction focused on balancing attitude, collectibility, and hierarchy—making sure the line felt aspirational without losing the readability and immediacy required at shelf.',
          layout: 'single',
          images: [stock('dress-grid-1', 1800, 1050)],
          captions: ['Editorial direction study aimed at making the brand feel aspirational while staying toy-shelf friendly.']
        },
        {
          title: 'System in Use',
          kicker: 'Architecture',
          copy: 'Across mystery products, dolls, and deluxe sets, the packaging architecture was designed to stay consistent: strongest hero read first, collectible story second, then supporting callouts and depth. That system thinking helps the line scale across formats while keeping the visual attitude intact and the retail read clean.',
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
      title: 'Case Study in Progress',
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
    summary: [
      {
        label: 'Challenge',
        value: 'Final storytelling and visuals are still being organized for this project page.'
      },
      {
        label: 'What I owned',
        value: 'The page structure is in place so role, process, and application content can be added cleanly once assets are ready.'
      },
      {
        label: 'Key constraint',
        value: 'This entry is temporarily using placeholder imagery until final approved visuals are available.'
      },
      {
        label: 'Outcome',
        value: 'The case study system is ready to scale, making future project uploads more consistent and presentation-ready.'
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
    fnaf: "Five Nights at Freddy's",
    pet: 'Pet Simulator',
    fisch: 'Fisch',
    aadan: 'Case Study in Progress',
    'lowtide-ipa': 'Lowtide IPA',
    'kof-orochi-saga': 'King of Fighters The Orochi Saga',
    'moon-coffee': 'Moon Coffee Co.',
    complexity: 'Complexity Surveillance',
    blox: 'Blox Fruits',
    proj1: 'Poppy Playtime',
    proj2: 'Invincible',
    proj3: 'One Piece',
    bendy: 'Additional Work'
  };

  const projectSequence = [
    'clean-by-pallet',
    'sun-books',
    'moon-coffee',
    'kof-orochi-saga',
    'lowtide-ipa',
    'complexity',
    'aadan'
  ];

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
    pageData.subtitle = 'Complexity Surveillance is a field-ready identity system built for a security provider serving residential and commercial clients—designed to communicate trust, technical precision, and immediate recognition across vehicles, uniforms, and customer-facing materials.';
    pageData.facts = [
      {
        label: 'Category',
        value: 'Security branding'
      },
      {
        label: 'Role',
        value: 'Identity, fleet + collateral system'
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
    pageData.summary = [
      {
        label: 'Challenge',
        value: 'Build a surveillance identity that communicates trust, technical credibility, and visibility across real field applications.'
      },
      {
        label: 'What I owned',
        value: 'I developed the logo system, fleet graphics, apparel direction, and client-facing collateral applications.'
      },
      {
        label: 'Key constraint',
        value: 'The identity needed to remain clean and highly legible on moving vehicles, workwear, and printed service documents.'
      },
      {
        label: 'Outcome',
        value: 'The system creates a cohesive field-ready brand presence that feels professional, scalable, and easy to recognize.'
      }
    ];
    if (Array.isArray(pageData.sections) && pageData.sections[0]) {
      pageData.sections[0].title = 'Project Brief';
      pageData.sections[0].kicker = 'Foundation';
      pageData.sections[0].copy = 'The brief was to create a security identity that felt dependable, modern, and easy to recognize in the field. I focused on building a clean visual system that could scale from service vehicles and uniforms to business cards and printed materials without losing clarity or authority.';
      pageData.sections[0].images = ['assets/images/tshirt.jpg'];
      pageData.sections[0].captions = ['Initial branded apparel study created to establish a practical, recognizable field-ready identity.'];
    }
    if (Array.isArray(pageData.sections) && pageData.sections[1]) {
      const appSection = pageData.sections[1];
      appSection.kicker = 'Application';
      appSection.copy = 'The system was designed to work hard across real service touchpoints, including technician apparel, fleet graphics, work-order documents, and business cards. High-contrast color, simple iconography, and disciplined hierarchy keep the brand legible in motion, on-site, and in print—creating a consistent professional presence wherever the company shows up.';
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
    pageData.subtitle = 'Moon Coffee Co. is a premium coffee identity built around a lunar-inspired wordmark, a repeatable celestial graphic system, and packaging applications designed to feel elevated, recognizable, and production-aware from the start.';
    pageData.facts = [
      {
        label: 'Category',
        value: 'Coffee branding'
      },
      {
        label: 'Role',
        value: 'Identity, packaging + application system'
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
    pageData.summary = [
      {
        label: 'Challenge',
        value: 'Create a coffee identity that feels premium and memorable while still warm, calm, and approachable.'
      },
      {
        label: 'What I owned',
        value: 'I developed the logo, pattern language, packaging applications, and the typographic rules that hold the system together.'
      },
      {
        label: 'Key constraint',
        value: 'The brand needed to reproduce clearly on dark surfaces and packaging while keeping the celestial concept elegant instead of gimmicky.'
      },
      {
        label: 'Outcome',
        value: 'The final system feels retail-ready, distinctive, and flexible enough to extend into future packaging and campaign moments.'
      }
    ];
    if (Array.isArray(pageData.sections) && pageData.sections[0]) {
      pageData.sections[0].title = 'Project Brief';
      pageData.sections[0].kicker = 'Foundation';
      pageData.sections[0].copy = 'The goal for Moon Coffee was to create a brand identity that felt calm, premium, and memorable without leaning gimmicky. I built the system around a distinctive lunar mark and a restrained visual language that could carry across cups, packaging, and storefront moments with the same sense of polish.';
      pageData.sections[0].images = ['assets/images/Moon Coffee Hero3.jpg'];
      pageData.sections[0].captions = ['Primary identity presentation introducing the lunar mark, typography, and premium mood of the brand.'];
    }
    if (Array.isArray(pageData.sections) && pageData.sections[1]) {
      const moonNextSection = pageData.sections[1];
      moonNextSection.title = 'Direction + Application';
      moonNextSection.kicker = 'System in Use';
      moonNextSection.copy = 'The application system turns that core identity into a retail-ready brand world. The moon-and-bean motif, dark palette, and Canela typography work together to create something that feels refined and recognizable, while the pattern language helps the packaging and cup applications stay consistent without becoming repetitive. Every touchpoint was designed to feel polished, legible, and easy to extend.';
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
    pageData.title = 'King of Fighters The Orochi Saga';
    pageData.subtitle = 'The King of Fighters: The Orochi Saga is a launch-ready trading card game identity that translates the energy of the franchise into bold logo work, collectible packaging, and gameplay-supporting card graphics built to scale across future releases.';
    pageData.facts = [
      {
        label: 'Category',
        value: 'TCG branding'
      },
      {
        label: 'Role',
        value: 'Logo, packaging + card system'
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
    pageData.summary = [
      {
        label: 'Challenge',
        value: 'Launch a collectible card game identity that channels KOF energy while staying clear enough for packaging and gameplay assets.'
      },
      {
        label: 'What I owned',
        value: 'I developed the logo direction, packaging graphics, and card-back system for a scalable launch-ready brand foundation.'
      },
      {
        label: 'Key constraint',
        value: 'The system had to feel dramatic and collectible without overpowering the hierarchy needed for product clarity.'
      },
      {
        label: 'Outcome',
        value: 'The result is a bold launch system that can expand into future packs, editions, and supporting marketing assets.'
      }
    ];
    if (Array.isArray(pageData.sections) && pageData.sections[0]) {
      pageData.sections[0].title = 'Project Brief';
      pageData.sections[0].kicker = 'Launch Direction';
      pageData.sections[0].copy = 'This project needed a logo and packaging system that could launch with immediate energy while still feeling organized enough for a collectible card game. I leaned into flame-driven motion, darker supernatural tones, and strong hierarchy so the identity could deliver shelf presence, clear read distance, and a scalable foundation for future expansions.';
      pageData.sections[0].images = ['assets/images/KOF_brand-02.jpg'];
      pageData.sections[0].captions = ['Brand identity exploration focused on a fully vectorized logo system built for print, sharp reproduction, and a bold collectible presence.'];
    }
    if (Array.isArray(pageData.sections) && pageData.sections[1]) {
      const kofNextSection = pageData.sections[1];
      kofNextSection.kicker = 'Application';
      kofNextSection.copy = 'From hero packaging to the card-back system, each touchpoint was designed to feel cohesive, premium, and expansion-ready. The packaging keeps the logo front and center for shelf impact, while the card graphics carry the same atmosphere with a cleaner frame that supports gameplay readability. Together, the system shows how the brand can extend into future packs, special editions, and launch marketing without losing its core energy.';
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

  const nextProjectLink = document.getElementById('nextProjectLink');
  if (nextProjectLink) {
    const currentIndex = projectSequence.indexOf(key);
    if (currentIndex >= 0 && projectSequence.length > 1) {
      const nextKey = projectSequence[(currentIndex + 1) % projectSequence.length];
      const nextProject = projectPages[nextKey] || fallbackTemplate(projectNames[nextKey] || 'Project');
      nextProjectLink.href = `project.html?key=${encodeURIComponent(nextKey)}`;
      nextProjectLink.hidden = false;
      nextProjectLink.setAttribute('aria-label', `Next project: ${nextProject.title || 'Project'}`);
      nextProjectLink.title = `Next project: ${nextProject.title || 'Project'}`;
    }
  }

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

  const renderSummary = (summary) => {
    const items = Array.isArray(summary)
      ? summary.filter((item) => item && (item.label || item.value))
      : [];
    if (!items.length) return '';

    return `
      <section class="pp-summary" aria-label="Case study highlights">
        ${items.map((item) => `
          <article class="pp-summary-item">
            <span class="pp-summary-label">${escapeHtml(item.label || '')}</span>
            <p class="pp-summary-value">${escapeHtml(item.value || '')}</p>
          </article>
        `).join('')}
      </section>
    `;
  };

  const renderImage = (src, alt, caption = '') => {
    if (!src) return '';
    const safeCaption = String(caption || '').trim();
    const figureClass = safeCaption ? 'pp-figure pp-figure--captioned pp-reveal' : 'pp-figure pp-reveal';
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

  const initProjectImageReveals = () => {
    const revealTargets = Array.from(root.querySelectorAll('.pp-hero, .pp-figure'));
    if (!revealTargets.length) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      revealTargets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px'
    });

    window.requestAnimationFrame(() => {
      revealTargets.forEach((el) => observer.observe(el));
    });
  };

  root.innerHTML = `
    <h1 class="pp-headline">${escapeHtml(pageData.title || 'Project')}</h1>
    <p class="pp-sub">${escapeHtml(pageData.subtitle || '')}</p>
    ${renderFacts(pageData.facts)}
    ${renderSummary(pageData.summary)}
    <section class="pp-hero pp-reveal">
      <img class="pp-img" src="${pageData.hero || ''}" alt="${escapeHtml((pageData.title || 'Project') + ' hero image')}" />
    </section>
    ${(Array.isArray(pageData.sections) ? pageData.sections : []).map(renderSection).join('')}
  `;

  initProjectImageReveals();
})();
