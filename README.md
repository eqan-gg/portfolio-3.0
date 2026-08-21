# Eqan Hanif - Personal Portfolio

A modern, high-performance personal portfolio website built to showcase my projects, MERN stack skills, and security research findings. Designed with a focus on seamless user experience, smooth interactions, and a premium dark-themed aesthetic.

## 🚀 Features

- **Custom Developer Cursor**: A specialized `</>` cursor with smooth lerp animation and interactive hover states.
- **Dynamic Spotlight Effect**: A mouse-following radial gradient overlay that creates a subtle, ambient glow on desktop.
- **Interactive UI Elements**: Text hover glows, glassmorphism design, and smart card dimming effects for focused interactions.
- **Drag-and-Drop Projects**: An interactive projects section powered by `@hello-pangea/dnd`, allowing visitors to play with and reorder the project list.
- **Integrated PDF Viewer**: Custom glassmorphic modal for viewing security acknowledgment letters directly within the portfolio.
- **Animated Tech Stack**: A dual-row infinite marquee showcasing 20+ technologies and tools (with reduced-motion fallbacks).
- **Fully Responsive Layout**: A sticky two-column architecture on desktop that elegantly collapses into a streamlined mobile view.
- **Live Status Indicator**: A pulsing "Available for work" badge and typing animation for different roles.

## 💻 Tech Stack

- **Core**: React.js, Vite
- **Styling**: Vanilla CSS (Custom properties, Flexbox/Grid, Animations)
- **Features**: `@hello-pangea/dnd` (Drag and Drop), IntersectionObserver API
- **Deployment**: Vercel

## 📂 Project Structure

- `src/components/`: Reusable UI components (Header, Projects, TechStack, SecurityAcknowledgments, etc.)
- `src/data/`: Centralized content configuration (`content.js`) making it easy to update projects, tech stack, and bio without touching UI code.
- `src/index.css`: Global design system, color palette, and custom utility classes.
- `public/`: Static assets including PDFs for security acknowledgments.

## 🛠️ Getting Started

To run this project locally:

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd portfolio-2.0
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```

## 🛡️ Security Acknowledgments

The portfolio features a dedicated section for responsible security disclosures, with integrated document viewing for letters from organizations like Qodo and Tigris Data, as well as links to HackerOne and Skipr profiles.
