# McAssets — Home Asset Management System

A web application for cataloguing and managing home assets, including purchase history, technical details, invoices, and financial records. Built with Next.js 14 App Router, Supabase, and Cloudinary.

![McAssets](public/hi_assets.jpg)

---

## Features

- **Asset inventory** — record and browse all assets with images, descriptions, and categorisation
- **Technical details** — track manufacturer, model number, serial number, and instruction documents
- **Finance tracking** — log purchase dates, amounts, invoices, disposal records, and asset value over time
- **Reporting & charts** — bar and pie charts showing asset value by category and year
- **Admin panel** — manage asset categories and locations
- **Google OAuth** — secure sign-in via Google, restricted to pre-approved users
- **File storage** — images, invoices, and instruction PDFs uploaded to Cloudinary
- **Responsive UI** — Tailwind CSS with a dark-themed design

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL) |
| Auth | [NextAuth.js v5 beta](https://authjs.dev/) with Google provider |
| File storage | [Cloudinary](https://cloudinary.com/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Charts | [AG Charts](https://www.ag-grid.com/charts/) |
| Data grid | [AG Grid](https://www.ag-grid.com/) + [Syncfusion](https://www.syncfusion.com/) |
| Icons | [Heroicons](https://heroicons.com/) |

---

## Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com/) project
- A [Cloudinary](https://cloudinary.com/) account
- A [Google Cloud](https://console.cloud.google.com/) project with OAuth 2.0 credentials

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/grumpypoles/mcassets.git
cd mcassets
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
# Supabase
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_KEY=your-supabase-anon-key

# NextAuth
AUTH_SECRET=your-random-secret-string         # generate with: openssl rand -base64 32
AUTH_GOOGLE_ID=your-google-oauth-client-id
AUTH_GOOGLE_SECRET=your-google-oauth-client-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# App URL (required by NextAuth)
NEXTAUTH_URL=http://localhost:3002
```

### 4. Set up the database

In your Supabase project, create the following tables:

#### `app_users`
| Column | Type | Notes |
|---|---|---|
| `id` | int8 | Primary key |
| `email` | text | Unique, used for Google OAuth lookup |
| `fullname` | text | |
| `access_type` | text | e.g. `"admin"`, `"user"` |
| `is_active` | bool | |

> **Important:** new users are blocked at sign-in unless their email exists in `app_users`. Add approved users manually or via the Supabase dashboard.

#### `hi_assets_web`
Main asset table. Key columns:

| Column | Type |
|---|---|
| `id` | int8 (PK) |
| `selcode` | text (unique asset code) |
| `card_description` | text |
| `card_model` | text |
| `card_image` | text[] (Cloudinary URLs) |
| `technical_category` | text |
| `technical_location` | text |
| `technical_maker_name` | text |
| `technical_maker_web` | text |
| `technical_model_number` | text |
| `technical_serial_number` | text |
| `technical_instructions` | text[] (Cloudinary URLs) |
| `finance_purchase_date` | date |
| `finance_purchase_location` | text |
| `finance_purchase_amount` | numeric |
| `finance_purchase_invoice` | text[] (Cloudinary URLs) |
| `finance_purchase_note` | text |
| `finance_disposal_date` | date |
| `finance_disposal_amount` | numeric |
| `finance_disposal_note` | text |
| `status` | text |
| `admin_creation_date` | timestamptz |
| `admin_creation_user` | int8 (FK → app_users.id) |
| `admin_update_date` | timestamptz |
| `admin_update_user` | int8 (FK → app_users.id) |

#### `hi_categories`
| Column | Type |
|---|---|
| `id` | int8 (PK) |
| `description` | text |

#### `hi_locations`
| Column | Type |
|---|---|
| `id` | int8 (PK) |
| `description` | text |

#### Views (used for reporting)
- `hi_assets_web_stats_category` — asset counts and values grouped by category
- `hi_assets_web_annual` — asset values grouped by year

### 5. Set up Cloudinary

In your Cloudinary account, create the following upload folders:

- `ass_images` — asset photos
- `ass_invoices` — purchase invoice PDFs
- `ass_instructions` — instruction manual PDFs

The app uses default placeholder files hosted on Cloudinary when no file is uploaded. Update the default URLs in `app/_lib/data-service.js` to point to your own Cloudinary account if needed.

### 6. Configure Google OAuth

In the [Google Cloud Console](https://console.cloud.google.com/):

1. Create an OAuth 2.0 Client ID (Web application)
2. Add authorised redirect URIs:
   - `http://localhost:3002/api/auth/callback/google` (development)
   - `https://your-domain.com/api/auth/callback/google` (production)

### 7. Run the development server

```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) in your browser.

---

## Project Structure

```
mcassets/
├── app/
│   ├── _components/        # Shared React components
│   ├── _config/            # (legacy, unused)
│   ├── _images/            # Static SVG assets
│   ├── _lib/
│   │   ├── actions.js      # Auth-guarded server action wrappers
│   │   ├── auth.js         # NextAuth configuration
│   │   ├── cloudinary.js   # Cloudinary SDK instance
│   │   ├── data-service.js # Supabase data access + server actions
│   │   ├── delete_item.js  # Asset deletion logic
│   │   ├── helpers.js      # Form data builder + date utilities
│   │   ├── statistics.js   # Reporting data queries
│   │   ├── supabase.js     # Supabase client
│   │   └── user-service.js # User lookup
│   ├── _styles/
│   │   └── globals.css
│   ├── account/            # Dashboard, profile, admin pages (auth required)
│   ├── api/auth/           # NextAuth route handler
│   ├── hiassets/           # Asset list, detail, add, edit pages (auth required)
│   ├── login/              # Sign-in page
│   ├── reports/            # Reporting page (auth required)
│   ├── about/
│   ├── layout.js
│   └── page.jsx            # Home / landing page
├── public/                 # Static images
├── middleware.js            # Route protection via NextAuth
├── next.config.mjs
├── tailwind.config.js
└── package.json
```

---

## Authentication & Access Control

Authentication uses Google OAuth via NextAuth. Access is restricted — signing in with a Google account that is not in the `app_users` table redirects to `/login/admin` instead of granting access.

**To add a new authorised user**, insert a row directly into the `app_users` table in Supabase with their Google account email.

Protected routes (enforced by `middleware.js`):
- `/account/*`
- `/hiassets/*`
- `/reports/*`

---

## Available Scripts

```bash
npm run dev      # Start development server on port 3002
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Deployment

The easiest way to deploy is via [Vercel](https://vercel.com/):

1. Push the repository to GitHub
2. Import the project in Vercel
3. Add all environment variables from `.env.local` in the Vercel project settings
4. Update `NEXTAUTH_URL` to your production domain
5. Update the Google OAuth redirect URI to include your production domain

---

## Known Issues & Planned Improvements

- Input validation (Zod) not yet implemented on server actions
- No automated tests
- `delete_item.js` needs to be refactored before use
- Cloudinary cloud name is partially hardcoded in default URL constants