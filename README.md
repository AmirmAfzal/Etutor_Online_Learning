# E-Tutor LMS 🚀

> A full-featured Learning Management System built with **Next.js 15**, **React 19**, **MongoDB**, and **NextAuth** — a Persian-language e-learning platform for students and instructors.

![E-Tutor screenshot](./screenshot.png)

## ✨ Features

- 🔐 **Authentication** — sign-in/sign-up with NextAuth credentials, JWT sessions, and bcrypt-hashed passwords backed by MongoDB.
- 🛍️ **Course marketplace** — browse courses, full-text search, and filters for category, level, price, rating, and duration.
- 📄 **Single-course page** — overview, curriculum, trailer video, instructor card, reviews, and related courses.
- 🎓 **Student area** — dashboard with per-course progress, wishlist, purchase history, messages/chat, and account settings.
- 🧑‍🏫 **Instructor area** — multi-step course creation (info, curriculum, publish), my-courses management, earnings with payment cards and withdrawal history, messages, and settings.
- 🎥 **Watch experience** — lecture video player, section/lecture navigation, lecture notes and downloadable files, plus comments and reviews.
- 🛒 **Cart & checkout** — add to cart, buy-now, and a gift-course flow with mock payment methods.
- 🗓️ **Persian-friendly** — Persian (Farsi) UI with Jalali date formatting (`moment-jalaali`).

## 🛠️ Tech Stack

| Layer          | Tech                                                                  |
| -------------- | --------------------------------------------------------------------- |
| Frontend       | Next.js 15 (App Router), React 19, TypeScript 5                       |
| Styling        | Tailwind CSS 4, DaisyUI 5, shadcn/ui + Radix UI                       |
| Forms & Data   | React Hook Form, Zod, Next.js server actions                     |
| Backend        | MongoDB + Mongoose, NextAuth v4 (JWT + MongoDB adapter), Bcrypt       |
| Media          | Cloudinary SDK + next-cloudinary (images, videos, notes, files)       |
| UI/UX extras   | GSAP, Lottie, Swiper, Embla, Recharts, Lucide, Iconify               |
| Dates          | Jalali calendar (`moment-jalaali`, `zaman`)                           |
| Deployment     | Netlify via `@netlify/plugin-nextjs`                                  |

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- MongoDB database (local or Atlas)
- Cloudinary account (for media uploads)

### Installation

```bash
npm install
```

### Configuration

Copy the env template and fill it in:

```bash
cp .env.example .env
```

| Variable                           | Description                              |
| ---------------------------------- | ---------------------------------------- |
| `DATABASE_URL`                     | MongoDB connection string                |
| `NEXTAUTH_URL`                     | App base URL (e.g. `http://localhost:3000`) |
| `NEXTAUTH_SECRET`                  | Secret used to sign JWT sessions         |
| `NEXT_PUBLIC_API_URL`              | Public API base URL                      |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`| Cloudinary cloud name (client widgets)   |
| `CLOUDINARY_CLOUD_NAME`            | Cloudinary cloud name (server SDK)       |
| `NEXT_PUBLIC_UPLOAD_PRESET`        | Cloudinary unsigned upload preset        |
| `CLOUDINARY_API_KEY`               | Cloudinary API key                       |
| `CLOUDINARY_API_SECRET`            | Cloudinary API secret                    |

### Run

```bash
npm run dev
```

Open <http://localhost:3000>.

## 📜 Scripts

```bash
npm run dev     # start the dev server (Turbopack)
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
```

## 📁 Project Structure

```
app/            # Next.js App Router pages and API routes
components/     # UI and feature components (shadcn/ui + custom)
lib/            # DB models, auth, Cloudinary, server actions, validation
hooks/          # shared hooks
types/          # global type declarations
public/         # static assets, icons, and images
middleware.ts   # NextAuth middleware
netlify.toml    # Netlify + Next.js plugin config
```

## ☁️ Deployment

The project deploys on **Netlify** (`netlify.toml` uses the Next.js build plugin). Set the same environment variables listed above in your hosting provider's dashboard, pointing `NEXTAUTH_URL` at your production domain. The same setup also works on any Next.js-compatible host such as Vercel.

## 📄 License

MIT
