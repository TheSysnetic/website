// Single source of truth for all site copy. Pages and sections render from here.

export const site = {
  name: "Sysnetic",
  url: "https://thesysnetic.com",
  tagline: "Digital products, engineered to move.",
  description:
    "Sysnetic is a Nürnberg-based software studio designing and building web applications, mobile apps, cloud platforms and digital experiences for ambitious companies worldwide.",
  email: "info@thesysnetic.com",
  phone: "+49 163 6718592",
  phoneHref: "tel:+491636718592",
  address: {
    street: "Gugelstraße 102",
    city: "90459 Nürnberg",
    country: "Germany",
    mapUrl: "https://maps.google.com/?q=Gugelstra%C3%9Fe+102,+90459+N%C3%BCrnberg",
  },
  founded: 2024,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/thesysnetic/" },
    { label: "Instagram", href: "https://www.instagram.com/thesysnetic/" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61563773785560" },
  ],
};

export const nav = [
  { label: "Work", href: "/work/" },
  { label: "Services", href: "/services/" },
  { label: "Company", href: "/company/" },
  { label: "Contact", href: "/contact/" },
];

export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  summary: string;
  intro: string;
  deliverables: string[];
  outcomes: { title: string; text: string }[];
  stack: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    index: "01",
    title: "Web Development",
    short: "Web apps & platforms",
    summary:
      "Responsive, secure and fast web applications built on modern frameworks — from marketing sites to complex SaaS platforms.",
    intro:
      "We design and engineer web products that feel instant, scale with your business and are a pleasure to maintain. Every build starts with a clear architecture and ends with measurable performance, accessibility and SEO foundations.",
    deliverables: [
      "Custom web applications & SaaS platforms",
      "Marketing websites & headless CMS",
      "Dashboards, portals & internal tools",
      "API design & third-party integrations",
      "Performance, accessibility & SEO audits",
    ],
    outcomes: [
      { title: "Built for speed", text: "Server rendering, static generation and lean bundles keep pages fast on every device." },
      { title: "Secure by default", text: "Authentication, input validation and dependency hygiene are part of the build, not an afterthought." },
      { title: "Easy to evolve", text: "Typed, tested, documented code that your team — or ours — can extend with confidence." },
    ],
    stack: ["Next.js", "React", "Vue / Nuxt", "TypeScript", "Node.js", "NestJS", "Laravel", "PostgreSQL", "GraphQL"],
    faqs: [
      { q: "Do you build new products or improve existing ones?", a: "Both. We regularly start from a blank page, but we also take over existing codebases, audit them, and modernise them step by step without stopping the business." },
      { q: "Which framework will you use?", a: "The one that fits the problem. For most content-heavy and product sites we reach for Next.js or Nuxt; for API-heavy platforms we pair them with Node.js, NestJS or Laravel backends." },
      { q: "Can we edit the content ourselves?", a: "Yes. We connect a headless CMS or build a tailored admin so your team can update pages, products and posts without touching code." },
    ],
  },
  {
    slug: "mobile-development",
    index: "02",
    title: "Mobile Apps",
    short: "iOS, Android & cross-platform",
    summary:
      "High-performing native and cross-platform apps that feel at home on every device and are built to ship — and keep shipping.",
    intro:
      "From first prototype to App Store and Google Play release, we build mobile apps with polished interactions, offline-ready data and a release pipeline that makes updates routine.",
    deliverables: [
      "Cross-platform apps with Flutter",
      "Native iOS (Swift) & Android (Kotlin)",
      "Offline sync, push notifications & payments",
      "Backend & API development for mobile",
      "Store submission & release management",
    ],
    outcomes: [
      { title: "One codebase, two stores", text: "Cross-platform development keeps cost down without compromising the native feel." },
      { title: "Smooth at 60fps", text: "Careful rendering and animation work make interfaces feel responsive and alive." },
      { title: "Release with confidence", text: "Automated builds, testing and staged rollouts take the stress out of shipping." },
    ],
    stack: ["Flutter", "Swift", "Kotlin", "Ionic", "Firebase", "Node.js", "REST & GraphQL"],
    faqs: [
      { q: "Native or cross-platform?", a: "For most products Flutter gives you one high-quality codebase for iOS and Android. If you depend on deep platform features or have an existing native app, we build natively in Swift and Kotlin." },
      { q: "Do you handle App Store and Google Play publishing?", a: "Yes — store listings, review guidelines, certificates, and staged releases are all part of the engagement." },
      { q: "Can you build the backend too?", a: "Absolutely. We design the APIs, databases and admin tools your app needs, or integrate with the systems you already have." },
    ],
  },
  {
    slug: "cloud-solutions",
    index: "03",
    title: "Cloud & DevOps",
    short: "AWS, Azure & infrastructure",
    summary:
      "Cloud architecture, migration and automation on AWS and Azure — tuned for performance, security and cost-efficiency.",
    intro:
      "We help teams move to the cloud, scale what they already run there, and automate the path from commit to production. The result: infrastructure that is reliable, observable and doesn't surprise you on the monthly bill.",
    deliverables: [
      "Cloud architecture & migration",
      "Infrastructure as code",
      "CI/CD pipelines & release automation",
      "Containers with Docker & Kubernetes",
      "Monitoring, security & cost optimisation",
    ],
    outcomes: [
      { title: "Scales with demand", text: "Auto-scaling, managed services and caching keep you fast on launch day and quiet days alike." },
      { title: "Fewer 3am incidents", text: "Monitoring, alerting and reproducible environments make problems rare — and short." },
      { title: "Predictable spend", text: "Right-sized resources and clear cost reporting keep your cloud bill under control." },
    ],
    stack: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    faqs: [
      { q: "Can you migrate our existing application?", a: "Yes. We assess what you run today, plan the move in low-risk phases, and migrate with minimal downtime." },
      { q: "Do you offer ongoing support?", a: "We can stay on to operate, monitor and improve your infrastructure, or hand over with documentation and training for your team." },
      { q: "AWS or Azure?", a: "We work with both. If you have no preference, we recommend based on your existing tools, team skills and the services your product needs." },
    ],
  },
  {
    slug: "ui-ux-design",
    index: "04",
    title: "UI & UX Design",
    short: "Product & interface design",
    summary:
      "Intuitive user experiences and visually striking interfaces that captivate your audience and elevate your brand.",
    intro:
      "Good design is how a product works, not just how it looks. We combine research, rapid prototyping and meticulous visual craft to create interfaces people understand instantly and enjoy using.",
    deliverables: [
      "User research & journey mapping",
      "Wireframes & interactive prototypes",
      "Visual UI design for web & mobile",
      "Design systems & component libraries",
      "Usability testing & iteration",
    ],
    outcomes: [
      { title: "Clarity first", text: "Clear hierarchy and flows reduce friction and turn visitors into users." },
      { title: "On-brand everywhere", text: "A shared design system keeps every screen consistent as your product grows." },
      { title: "Developer-ready", text: "Specs, tokens and components translate directly into production code." },
    ],
    stack: ["Figma", "Prototyping", "Design Systems", "Motion Design", "Accessibility (WCAG)"],
    faqs: [
      { q: "Can you work with our existing brand?", a: "Yes. We extend your existing identity into a digital design system, or refresh it if it no longer fits where you are going." },
      { q: "Do you test designs with real users?", a: "Wherever possible. Even a handful of usability sessions on a clickable prototype surfaces issues long before they become expensive to fix." },
      { q: "Do you only design, or also build?", a: "Both. Because our designers and engineers work side by side, what you approve in Figma is what ships." },
    ],
  },
  {
    slug: "low-code",
    index: "05",
    title: "Low-Code Solutions",
    short: "Rapid tools & automation",
    summary:
      "Accelerate delivery with low-code platforms — internal tools, workflows and MVPs in a fraction of the time, without losing flexibility.",
    intro:
      "Not every problem needs a fully custom build. We use low-code platforms to ship internal tools, automations and prototypes fast — and extend them with custom code where it matters.",
    deliverables: [
      "Internal tools & admin panels",
      "Workflow & process automation",
      "Rapid MVPs & proof-of-concepts",
      "Integrations between your existing tools",
      "Custom code extensions where needed",
    ],
    outcomes: [
      { title: "Weeks, not months", text: "Ship working software quickly and learn from real usage sooner." },
      { title: "Less manual work", text: "Automate repetitive processes and connect the tools your team already uses." },
      { title: "Room to grow", text: "We design solutions with a clear path to custom development when you outgrow them." },
    ],
    stack: ["Workflow Automation", "Firebase", "Node.js", "REST APIs", "Webhooks"],
    faqs: [
      { q: "When is low-code the right choice?", a: "For internal tools, automations and early-stage validation it is often the fastest, most cost-effective route. For core customer-facing products we usually recommend a custom build." },
      { q: "Won't we get locked in?", a: "We choose platforms with good export and API options and keep business logic documented, so moving to custom code later is a planned step rather than a rewrite." },
    ],
  },
  {
    slug: "digital-marketing",
    index: "06",
    title: "Digital Marketing",
    short: "SEO, social & growth",
    summary:
      "Data-driven SEO, social media and content strategies that grow your reach, engagement and conversions.",
    intro:
      "A great product needs to be found. We pair technical SEO and analytics with content and social strategies to bring the right people to your door — and measure what actually works.",
    deliverables: [
      "Technical & on-page SEO",
      "Content strategy & production",
      "Social media management",
      "Paid campaigns & landing pages",
      "Analytics, tracking & reporting",
    ],
    outcomes: [
      { title: "Be found", text: "Technical foundations and relevant content improve visibility where your customers search." },
      { title: "Convert more", text: "Landing pages and funnels designed around a single clear action." },
      { title: "Know what works", text: "Clean tracking and transparent reporting tie marketing to real outcomes." },
    ],
    stack: ["SEO", "Google Analytics", "Search Console", "Meta Ads", "Google Ads", "Content"],
    faqs: [
      { q: "How soon will we see results?", a: "Paid campaigns can drive traffic immediately; SEO is a longer game that compounds over months. We set clear, honest milestones for both." },
      { q: "Can you work with our in-house team?", a: "Yes. We can run campaigns end-to-end or support your team with strategy, technical SEO and production capacity." },
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  client: string;
  /** short label for the card chip */
  category: string;
  industry: string;
  services: string[];
  website: string;
  tagline: string;
  accent: string;
  /** client logo, shown on a white plate (public/images/work/logos) */
  logo: string;
  /** intrinsic logo size in px (for SVGs, the viewBox) */
  logoSize: [number, number];
  /** largest width (CSS px) the logo is shown at, so raster logos never get upscaled into blur */
  logoMaxWidth: number;
  overview: string;
  challenges: string[];
  solutions: string[];
};

export const projects: Project[] = [
  {
    slug: "khushghar",
    name: "KhushGhar",
    client: "KhushGhar",
    category: "E-commerce",
    industry: "Home & Kitchen Retail",
    services: ["UI & UX Design", "Web Development", "Launch"],
    website: "https://khushghar.com",
    tagline: "A bilingual online store bringing smart, useful home products to households across Pakistan.",
    accent: "#f2c230",
    logo: "/images/work/logos/khushghar.webp",
    logoSize: [1440, 296],
    logoMaxWidth: 460,
    overview:
      "KhushGhar brings clever kitchen tools, small appliances, storage, cleaning helpers and home decor to homes across Pakistan. Every product is picked for being useful every day, checked against real buyer ratings, and delivered nationwide with cash on delivery.",
    challenges: [
      "Shoppers across Pakistan expect to pay on delivery and to see delivery costs upfront.",
      "A growing catalogue across six departments had to stay effortless to browse on a phone.",
      "The store needed to speak to customers in both English and Urdu.",
      "A new brand had to feel trustworthy from the very first visit.",
    ],
    solutions: [
      "A cash-on-delivery checkout with delivery pricing and the free-delivery threshold shown clearly.",
      "Department navigation plus curated collections — bestsellers, kitchen favourites, under Rs 1,000.",
      "A bilingual storefront with a one-tap English / Urdu switch.",
      "Clear replacement, returns and shipping policies surfaced throughout the store.",
    ],
  },
  {
    slug: "reparametrize-ateliers",
    name: "Reparametrize Ateliers",
    client: "Reparametrize Ateliers",
    category: "Architecture",
    industry: "Architecture & Design",
    services: ["UI & UX Design", "Web Development"],
    website: "https://www.rpateliers.com",
    tagline: "A quiet, editorial home for a multidisciplinary architecture studio.",
    accent: "#9fb4c7",
    logo: "/images/work/logos/reparametrize-ateliers.svg",
    logoSize: [842, 247],
    logoMaxWidth: 360,
    overview:
      "Reparametrize Ateliers transforms spaces through five functional areas captured in the acronym LACED: Living, Ateliers, Community, Estates and Decor. Their work spans innovative living environments, captivating ateliers, community-focused design, timeless estates and curated decor — all driven by sustainable, inventive design that merges creativity with practicality.",
    challenges: [
      "Five distinct practice areas needed to live under one coherent, navigable structure.",
      "Large-format architectural imagery had to load quickly without sacrificing quality.",
      "The brand called for restraint — an interface that steps back and lets the work speak.",
      "Projects, people and philosophy needed room to grow as the portfolio expands.",
    ],
    solutions: [
      "An information architecture built around the LACED practice areas.",
      "Editorial, typography-led layouts with generous whitespace and a muted palette.",
      "Responsive, lazy-loaded imagery tuned for heavy visual content.",
      "A modular page system that scales with new projects and team members.",
    ],
  },
  {
    slug: "product-house",
    name: "Product House",
    client: "Product House",
    category: "Product Studio",
    industry: "Product Development",
    services: ["UI & UX Design", "Web Development", "Launch"],
    website: "https://www.producthouse.us",
    tagline: "A founder-friendly platform where ideas become products.",
    accent: "#2fe0a4",
    logo: "/images/work/logos/product-house.png",
    logoSize: [702, 136],
    logoMaxWidth: 350,
    overview:
      "Product House is where innovation and execution come together to turn ideas into industry-leading solutions. Specialising in intuitive digital design, robust hardware development and strategic guidance, they help startups scale and thrive — turning visionary concepts into impactful realities, one product at a time.",
    challenges: [
      "Explaining three offerings — digital design, hardware and strategy — without overwhelming founders.",
      "A brand that needed to feel energetic, approachable and credible at the same time.",
      "Making a complex, multi-step process feel simple and actionable.",
      "Giving startups a clear reason to reach out on their first visit.",
    ],
    solutions: [
      "A playbook-style narrative that walks founders through each stage of building a product.",
      "A vivid green-on-dark identity with friendly illustration and strong contrast.",
      "Service blocks that break each offering into digestible, scannable steps.",
      "Prominent calls to action and a streamlined enquiry flow.",
    ],
  },
];

export const process = [
  { index: "01", title: "Discover", text: "Workshops to understand your goals, users and constraints. We leave with a shared definition of success and a realistic plan." },
  { index: "02", title: "Design", text: "User flows, prototypes and visual design, validated early so the build starts from certainty instead of guesswork." },
  { index: "03", title: "Build", text: "Short, transparent sprints with regular demos. You see working software early and steer it as it grows." },
  { index: "04", title: "Launch & grow", text: "Careful release, monitoring and iteration. After launch we stay close to keep improving what matters." },
];

export const values = [
  { title: "Innovation", text: "We constantly seek fresh ideas and technologies to deliver solutions that are unique and effective." },
  { title: "Excellence", text: "We hold every project — from code to customer service — to the highest standard of quality." },
  { title: "Collaboration", text: "Great work comes from bringing diverse talents and perspectives together, including yours." },
  { title: "Integrity", text: "We work with honesty, transparency and ethical practice to build lasting trust." },
];

export const techStack: { name: string; category: "Frontend" | "Backend" | "Mobile" | "Cloud" | "Data" }[] = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Vue", category: "Frontend" },
  { name: "Nuxt", category: "Frontend" },
  { name: "Angular", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Gatsby", category: "Frontend" },
  { name: "Sass", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "NestJS", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "AdonisJS", category: "Backend" },
  { name: "Laravel", category: "Backend" },
  { name: "PHP", category: "Backend" },
  { name: "CodeIgniter", category: "Backend" },
  { name: "Firebase", category: "Backend" },
  { name: "Prisma", category: "Backend" },
  { name: "TypeORM", category: "Backend" },
  { name: "Sequelize", category: "Backend" },
  { name: "Knex", category: "Backend" },
  { name: "Flutter", category: "Mobile" },
  { name: "Swift", category: "Mobile" },
  { name: "Kotlin", category: "Mobile" },
  { name: "Ionic", category: "Mobile" },
  { name: "AWS", category: "Cloud" },
  { name: "Azure", category: "Cloud" },
  { name: "Docker", category: "Cloud" },
  { name: "Kubernetes", category: "Cloud" },
  { name: "PostgreSQL", category: "Data" },
  { name: "MySQL", category: "Data" },
  { name: "MongoDB", category: "Data" },
  { name: "GraphQL", category: "Data" },
];

export const stats = [
  { value: "2024", label: "Founded in Nürnberg" },
  { value: "6", label: "Service disciplines" },
  { value: "30+", label: "Technologies in our stack" },
  { value: "3", label: "Featured launches" },
];
