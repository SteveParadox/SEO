# ToolDrop AI

ToolDrop AI is a content-driven website for discovering, browsing, and comparing AI tools, prompts, and emerging model capabilities.

The site is built to scale content-first, with clean URLs, strong SEO foundations, and fast static delivery. Everything is structured so new tools, prompts, and comparisons can be added without rewriting page logic like a caveman.

---

## Features

- 🔍 Browse curated AI tools and prompts  
- ⚖️ Side-by-side AI tool comparisons  
- 🧠 SEO-optimized pages with dynamic metadata  
- ⚡ Static generation for fast load times  
- 🔗 Clean slugs and canonical URLs  
- 🎨 Modern UI with reusable components  

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Deployment:** Vercel

---

## Getting Started

Install dependencies and start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

Open your browser and visit:

http://localhost:3000

Changes update automatically during development.


---

Project Structure

app/            # Route-based pages (prompts, comparisons, collections)
components/     # Reusable UI components
lib/            # Data access, helpers, SEO utilities
public/         # Static assets


---

Content System

All tools, prompts, and comparisons are driven by structured data files.

This allows:

Easy content expansion

Consistent page generation

SEO-friendly static rendering

Minimal logic changes as the site grows



---

Deployment

The recommended deployment platform is Vercel.

Vercel provides:

Automatic builds on push

Optimized static and edge delivery

Built-in font and image optimization


Simply connect the repository and deploy using the standard Next.js setup.


---

License

This project is private and intended for production use.
Reuse or redistribution should follow the repository owner’s terms.
