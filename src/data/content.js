import profileImg from '../assets/profile.jpeg';

export const content = {
  hero: {
    name: 'Eqan Hanif',
    title: 'Frontend Developer & Security Researcher',
    tagline: 'I build pixel-perfect web experiences and break things responsibly.',
    img: profileImg,
  },

  nav: [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Tech Stack', href: '#techstack' },
    { name: 'Security', href: '#security' },
    { name: 'Contact', href: '#contact' },
  ],

  social: {
    github: 'https://github.com/eqan-gg',
    linkedin: 'https://www.linkedin.com/in/eqan-hanif',
    hackerone: 'https://hackerone.com/eqan-ggg?type=user',
    email: 'eqanchauhaan@gmail.com',
  },

  about: {
    paragraphs: [
      `I'm a passionate Frontend Developer and BSCS student who specializes in building exceptional websites, applications, and everything in between. My focus is on creating accessible, user-centric interfaces that blend performance with aesthetics.`,
      `I love the problem-solving aspect of development and the immediate visual feedback of frontend work. Turning complex designs into functional, beautiful code is what drives me. On the security side, I actively hunt for vulnerabilities through responsible disclosure programs — with acknowledgments from organizations like Qodo, Tigris Data, Skipr, and Novu.`,
      `I'm looking for opportunities to work with a collaborative team on ambitious projects where I can continue to learn and grow as a developer.`,
    ],
    highlightedTerms: [
      { text: 'Frontend Developer', url: null },
      { text: 'accessible', url: null },
      { text: 'Qodo', url: 'https://www.qodo.ai/' },
      { text: 'Tigris Data', url: 'https://www.tigrisdata.com/' },
      { text: 'Skipr', url: 'https://www.skipr.co/resources/responsible-disclosure' },
      { text: 'Novu', url: 'https://github.com/novuhq/novu/security/advisories/GHSA-rwfx-fwc7-rg4j' },
    ],
  },

  techStack: [
    { name: 'HTML5', icon: 'ri-html5-fill', color: '#E34F26' },
    { name: 'CSS3', icon: 'ri-css3-fill', color: '#1572B6' },
    { name: 'JavaScript', icon: 'ri-javascript-fill', color: '#F7DF1E' },
    { name: 'TypeScript', icon: 'ri-code-s-slash-fill', color: '#3178C6' },
    { name: 'React', icon: 'ri-reactjs-line', color: '#61DAFB' },
    { name: 'Vue.js', icon: 'ri-vuejs-fill', color: '#4FC08D' },
    { name: 'Redux', icon: 'ri-stack-fill', color: '#764ABC' },
    { name: 'Node.js', icon: 'ri-nodejs-fill', color: '#339933' },
    { name: 'WordPress', icon: 'ri-wordpress-fill', color: '#21759B' },
    { name: 'Bootstrap', icon: 'ri-bootstrap-fill', color: '#7952B3' },
    { name: 'MongoDB', icon: 'ri-database-2-fill', color: '#47A248' },
    { name: 'Firebase', icon: 'ri-fire-fill', color: '#FFCA28' },
    { name: 'Nginx', icon: 'ri-server-fill', color: '#009639' },
    { name: 'GitHub', icon: 'ri-github-fill', color: '#E6EDF3' },
    { name: 'Vercel', icon: 'ri-arrow-up-circle-fill', color: '#FFFFFF' },
    { name: 'Netlify', icon: 'ri-cloud-fill', color: '#00C7B7' },
    { name: 'Figma', icon: 'ri-pen-nib-fill', color: '#F24E1E' },
    { name: 'Canva', icon: 'ri-palette-fill', color: '#00C4CC' },
    { name: 'Adobe Illustrator', icon: 'ri-pencil-ruler-2-fill', color: '#FF9A00' },
    { name: 'Burp Suite', icon: 'ri-shield-keyhole-fill', color: '#FF6633' },
    { name: 'Nodemon', icon: 'ri-refresh-fill', color: '#76D04B' },
    { name: 'Git', icon: 'ri-git-branch-fill', color: '#F05032' },
  ],

  projects: {
    react: [
      {
        id: 'pinnacle',
        title: 'Pinnacle Design Agency Clone',
        description:
          'A pixel-perfect clone of Pinnacle Design Agency\'s website, rebuilt from scratch with React 19 and modern tooling including AOS animations and React Slick carousels.',
        techStack: ['React 19', 'Vite', 'AOS', 'React Slick', 'Bootstrap 4', 'Font Awesome'],
        demoLink: 'https://pinnacle-agency-clone.vercel.app/',
        githubLink: 'https://github.com/eqan-gg/pinnacle-agency-clone',
        featured: false,
      },
      {
        id: 'sitr-abayas',
        title: 'Sitr Abayas — E-Commerce',
        description:
          'A university e-commerce project for selling abayas with WhatsApp integration on all pages, allowing customers to order directly through chat.',
        techStack: ['TypeScript', 'Tailwind CSS', 'JavaScript', 'WhatsApp API'],
        demoLink: 'https://sitr-abayas.vercel.app/',
        githubLink: 'https://github.com/eqan-gg/sitr-abayas-IFS',
        featured: true,
      },
      {
        id: 'manageup',
        title: 'ManageUp — Task Management',
        description:
          'A role-based task management web application with separate admin and employee dashboards, task creation/assignment workflows, and LocalStorage persistence.',
        techStack: ['React.js', 'Tailwind CSS', 'Context API', 'LocalStorage'],
        demoLink: 'https://manage-up.vercel.app/',
        githubLink: 'https://github.com/eqan-gg/ManageUp',
        featured: false,
      },
      {
        id: 'student-lms',
        title: 'Student LMS Portal',
        description:
          'A comprehensive learning management system with Supabase authentication, student enrollment, attendance marking, and course selection features.',
        techStack: ['React', 'TypeScript', 'Vite', 'Shadcn UI', 'Tailwind CSS', 'Supabase'],
        demoLink: 'https://student-portal-2-tau.vercel.app/auth',
        githubLink: 'https://github.com/eqan-gg/student-portal-2',
        featured: true,
      },
      {
        id: 'mockmate',
        title: 'MockMate — AI Mock Interviews',
        description:
          'An AI-powered mock interview platform for university students. Integrates ElevenLabs API for realistic voice-based Q&A sessions to help prepare for the job market and boost confidence.',
        techStack: ['React', 'TypeScript', 'Vite', 'Shadcn UI', 'Tailwind CSS', 'ElevenLabs API'],
        demoLink: 'https://mockmate-eta.vercel.app/',
        githubLink: 'https://github.com/eqan-gg/mockmate',
        featured: true,
      },
      {
        id: 'nexusai',
        title: 'NexusAI Landing Page',
        description:
          'A modern, responsive SaaS landing page featuring glassmorphism design, interactive animations, and mobile-first approach.',
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'Font Awesome'],
        demoLink: 'https://nexusai-landing-page.vercel.app/',
        githubLink: 'https://github.com/eqan-gg/nexusai-landing-page',
        featured: false,
      },
      {
        id: 'movies',
        title: 'Movie Streaming UI',
        description:
          'A responsive movie streaming application interface with real-time search, favorites management, and a clean browsing experience.',
        techStack: ['React.js', 'CSS', 'React Router', 'OMDB API'],
        demoLink: 'https://movies-app-three-sand.vercel.app/',
        githubLink: 'https://github.com/eqan-gg/movies-app',
        featured: false,
      },
    ],
    wordpress: [
      {
        id: 'providers-global',
        title: 'The Providers Global',
        description:
          'A professional business website built for a client organization using WordPress, featuring a corporate design and content management system.',
        techStack: ['WordPress', 'PHP', 'CSS', 'Elementor'],
        demoLink: 'https://theprovidersglobal.org/',
        type: 'Client Project',
      },
      {
        id: 'landingpagex',
        title: 'LandingPageX',
        description:
          'A personal WordPress project showcasing a modern landing page template with responsive design and clean aesthetics.',
        techStack: ['WordPress', 'PHP', 'CSS', 'Custom Theme'],
        demoLink: 'https://dev-landingpagex.pantheonsite.io/',
        type: 'Personal Project',
      },
      {
        id: 'axelz',
        title: 'AxelZ',
        description:
          'An in-progress WordPress site featuring a modern homepage design with dynamic sections and custom styling.',
        techStack: ['WordPress', 'PHP', 'CSS', 'Custom Theme'],
        demoLink: 'https://dev-axelz.pantheonsite.io/home/#',
        type: 'In Progress',
      },
    ],
  },

  security: {
    intro: 'These are a few of my security findings which I am allowed to share publicly.',
    items: [
      {
        id: 'qodo',
        org: 'Qodo',
        title: 'Responsible Security Disclosure',
        description:
          'Received a Letter of Acknowledgement from Qodo (formerly CodiumAI) for responsibly disclosing a security vulnerability in their platform.',
        icon: '🏢',
        severity: null,
        link: 'https://www.qodo.ai/',
        pdfLink: '/qodo-acknowledgment.pdf',
        hasDocument: true,
      },
      {
        id: 'tigris',
        org: 'Tigris Data',
        title: 'Responsible Security Disclosure',
        description:
          'Received a Reference Letter from Tigris Data for identifying and responsibly disclosing a security vulnerability.',
        icon: '🔒',
        severity: null,
        link: 'https://www.tigrisdata.com/',
        pdfLink: '/tigris-acknowledgment.pdf',
        hasDocument: true,
      },
      {
        id: 'hackerone',
        org: 'HackerOne',
        title: 'Active Bug Bounty Hunter',
        description:
          'Active profile on HackerOne, the leading bug bounty and vulnerability disclosure platform.',
        icon: '🐛',
        severity: null,
        link: 'https://hackerone.com/eqan-ggg?type=user',
        pdfLink: null,
        hasDocument: false,
      },
      {
        id: 'skipr',
        org: 'Skipr',
        title: 'Security Hall of Fame',
        description:
          'Listed on Skipr\'s Responsible Disclosure Security Hall of Fame for identifying and reporting a security vulnerability.',
        icon: '⭐',
        severity: null,
        link: 'https://www.skipr.co/resources/responsible-disclosure',
        pdfLink: null,
        hasDocument: false,
      },
      {
        id: 'novu',
        org: 'Novu',
        title: 'GitHub Security Advisory',
        description:
          'Reported a Weak Password Policy vulnerability on the Novu Dashboard. Published as GHSA-rwfx-fwc7-rg4j with moderate severity.',
        icon: '🛡️',
        severity: 'Moderate',
        link: 'https://github.com/novuhq/novu/security/advisories/GHSA-rwfx-fwc7-rg4j',
        pdfLink: null,
        hasDocument: false,
      },
    ],
  },

  contact: {
    heading: 'Get In Touch',
    description:
      "I'm currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi — I'll try my best to get back to you!",
    email: 'eqanchauhaan@gmail.com',
    apiEndpoint: 'https://portfolio-server-vev8.onrender.com/api/contact',
  },

  footer: {
    credit: 'Designed & Built by Eqan Hanif',
  },
};
