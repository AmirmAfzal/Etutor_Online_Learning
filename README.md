# E‑Tutor LMS

A modern Learning Management System built with Next.js 15, React 19, and a scalable Node/MongoDB backend. This project implements an end‑to‑end e‑learning experience for students and instructors, aligned with the product design in Figma.

Design reference: [E‑Tutor — Learning Management System (Figma)](https://www.figma.com/design/l1BH5rMjVaDMrnBLlF7yyE/E-Tutor---Learning-Management-System--Community---Community-?node-id=2118-61474&t=fcyaLWGiR7AkmN00-1)

<p align="left">
  <a href="https://nextjs.org"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs" /></a>
  <a href="https://react.dev"><img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" /></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" /></a>
  <a href="https://tailwindcss.com"><img alt="Tailwind" src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white" /></a>
  <a href="https://www.mongodb.com/"><img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white" /></a>
  <a href="https://next-auth.js.org/"><img alt="NextAuth" src="https://img.shields.io/badge/Auth-NextAuth-000000?logo=auth0&logoColor=white" /></a>
</p>

## Table of contents
- Features
- Tech stack
- Getting started
- Environment variables
- Scripts
- Development conventions
- Theming (DaisyUI)
- Deployment (Vercel)
- Project structure
- Contributing
- Acknowledgements

## Features
- Authentication with credentials using NextAuth and MongoDB Adapter
- Instructor dashboard: create courses, manage curriculum, earnings, messages, settings
- Student area: wishlist, messages, purchase history, settings, course watching experience
- Course marketplace: categories, filters, search, ratings, instructors, related courses
- Media management with Cloudinary (images, videos, thumbnails)
- Responsive UI with Tailwind CSS, DaisyUI themes, and shadcn/ui + Radix primitives
- Animations and micro‑interactions (GSAP, Lottie)
- Charts and analytics (Recharts)
- Deployed to Netlify with Next.js plugin

## Tech stack

Frontend
- Next.js 15: React 19 App Router, server components, image optimization
- React 19: modern concurrent features and performance
- Tailwind CSS 4: utility‑first styling; `tailwind-merge` for class merging
- DaisyUI: Tailwind component library and themes support
- shadcn/ui + Radix UI: accessible components (dialog, dropdown, select, tabs, etc.)
- Icon systems: Lucide, Iconify, react-icons
- Forms: React Hook Form with Zod validation and @hookform/resolvers
- Animations: GSAP, @gsap/react, Lottie
- Carousels: embla-carousel-react, Swiper
- Charts: Recharts

Backend / Data / Auth
- NextAuth v4 with CredentialsProvider and MongoDB Adapter
- MongoDB with Mongoose ODM; also low-level MongoClient for NextAuth session persistence
- Cloudinary SDK and next-cloudinary for media uploads/delivery
- Bcrypt for password hashing
- Zod and zod-form-data for schema validation
- Axios/Undici for HTTP utilities where needed

Build & Tooling
- TypeScript 5
- ESLint 9 + TypeScript ESLint + Prettier (with Tailwind plugin)
- PostCSS/Tailwind CSS 4 toolchain
- Netlify Next.js plugin for deployment


## Getting started

Prerequisites
- Node.js 20+
- MongoDB database (Atlas or local)
- Cloudinary account (for media)

Install
```bash
npm install
```

Run dev server
```bash
npm run dev
```
The app starts on http://localhost:3000

Build
```bash
npm run build
npm run start
```

## Environment variables
Create a `.env.local` in the project root with:

```bash
# Database
DATABASE_URL="mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate_a_strong_random_secret"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

```

Notes
- `lib/db/MongoDbClient.ts` requires `DATABASE_URL` and throws if missing.
- `lib/db/db.ts` uses Mongoose with the same `DATABASE_URL`.
- `lib/cloudinary.ts` requires Cloudinary keys and enables secure delivery.
- Auth pages are routed via NextAuth and custom pages at `/auth/signin` and `/auth/signup`.

## Scripts
```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## Development conventions
- TypeScript everywhere; prefer explicit types on exported functions
- Utility `cn()` in `lib/utils.ts` for class merging
- Keep components small and composable; colocate feature logic under `components/` and `app/`
- Validate inputs with Zod; handle errors with early returns/guards
- Follow ESLint/Prettier; run `npm run lint` locally before commits

## Theming (DaisyUI)
- DaisyUI provides ready-made themes. Set the theme via the `data-theme` attribute on the root element.

## Deployment (Vercel)
- Push your repository to GitHub/GitLab/Bitbucket
- Import the project in Vercel and select the Next.js framework preset
- Set environment variables in Vercel Project Settings (same as `.env.local`)
- Build command: `next build` (default)
- Output: handled automatically by Vercel for Next.js
- Set `NEXTAUTH_URL` to your Vercel production domain (e.g., `https://your-app.vercel.app`)

## Project structure
```
app/                    # Next.js App Router pages and routes
components/             # UI and feature components (shadcn/ui, custom)
lib/                    # DB, auth, utilities, Cloudinary
  auth/authOptions.ts   # NextAuth configuration (Credentials, MongoDB Adapter)
  db/db.ts              # Mongoose connection and boot logs
  db/MongoDbClient.ts   # MongoClient for NextAuth adapter
  cloudinary.ts         # Cloudinary config
middleware.ts           # NextAuth middleware (protects /dashboard/*)
public/                 # Static assets and icons/images
```

## Contributing
- Fork the repository and create a feature branch
- Run the app locally and add tests/docs where relevant
- Follow the code style and run `npm run lint`
- Open a PR with a clear description and screenshots/video if UI changes

## Acknowledgements
- Design inspired by the Figma file: [E‑Tutor LMS (Figma)](https://www.figma.com/design/l1BH5rMjVaDMrnBLlF7yyE/E-Tutor---Learning-Management-System--Community---Community-?node-id=2118-61474&t=fcyaLWGiR7AkmN00-1)
- Framework: Next.js by Vercel
- UI: Tailwind CSS, DaisyUI, shadcn/ui, Radix UI
- Auth: NextAuth
- Storage & Media: MongoDB Atlas, Cloudinary

---

If you find a bug or have a feature request, please open an issue or a pull request. Contributions are welcome!
