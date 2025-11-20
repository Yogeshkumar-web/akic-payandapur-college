# Educational Institute Website

A modern, full-featured educational institute website built with Next.js, TypeScript, Tailwind CSS, Drizzle ORM, and Supabase.

## Features

### Public Pages

- **Homepage**: Hero section, stats, latest announcements, and about section
- **Subjects**: Class-wise subject information (Classes 9-12 with Science/Arts streams)
- **Notice Board**: Dynamic announcements with category filtering
- **Resources**: Study materials organized by class
- **Contact**: Contact form with Google Maps integration

### Admin Panel

- **Dashboard**: Overview statistics and quick actions
- **Notices Management**: Create, edit, and delete notices
- **Study Materials**: Upload and manage study materials with Supabase Storage
- **Contact Submissions**: View and manage contact form submissions with status tracking

### Authentication

- Secure admin authentication using Supabase Auth
- Protected admin routes with middleware
- Email/password login system

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Drizzle ORM
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Supabase account (free tier works fine)

### Installation

1. **Clone and install dependencies:**

   ```bash
   cd college_cursor
   pnpm install
   ```

2. **Set up Supabase:**

   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to find your credentials
   - Go to Settings > Database to find your connection string

3. **Configure environment variables:**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   DATABASE_URL=your-postgres-connection-string
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Set up the database:**

   ```bash
   # Generate migrations
   pnpm drizzle-kit generate

   # Push schema to database
   pnpm drizzle-kit push
   ```

5. **Create Supabase Storage bucket:**

   ⚠️ **IMPORTANT**: This step is required for study materials upload to work!

   - Go to Storage in Supabase dashboard
   - Create a new bucket named `study-materials` (exactly this name)
   - Set it to **public access**
   - Configure RLS policies for security

   📖 **See [SUPABASE_STORAGE_SETUP.md](./SUPABASE_STORAGE_SETUP.md) for detailed instructions**

6. **Create admin user:**

   - Go to Authentication in Supabase dashboard
   - Add a new user with email and password
   - This will be your admin login credentials

7. **Run the development server:**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the website.

### Production Build

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
college_cursor/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Authentication pages
│   ├── admin/               # Admin panel pages
│   ├── api/                 # API routes
│   └── [public pages]       # Public-facing pages
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── admin/               # Admin-specific components
│   └── [feature components]
├── db/                      # Database schema
├── lib/                     # Utility functions and configs
│   ├── supabase/           # Supabase clients
│   └── db.ts               # Drizzle client
├── drizzle.config.ts       # Drizzle Kit configuration
└── middleware.ts           # Next.js middleware for auth
```

## Database Schema

### Tables

**notices**

- id (serial, primary key)
- title (varchar)
- content (text)
- category (varchar): Academic, Events, Holidays, General
- date (timestamp)
- created_at (timestamp)

**study_materials**

- id (serial, primary key)
- title (varchar)
- description (text)
- file_url (text)
- class (varchar): 9, 10, 11, 12
- subject (varchar)
- uploaded_at (timestamp)

**contact_submissions**

- id (serial, primary key)
- name (varchar)
- email (varchar)
- phone (varchar)
- message (text)
- status (varchar): pending, read, resolved
- created_at (timestamp)

## Scripts

```bash
# Development
pnpm dev

# Build
pnpm build

# Start production
pnpm start

# Lint
pnpm lint

# Database migrations
pnpm drizzle-kit generate
pnpm drizzle-kit push
pnpm drizzle-kit studio  # View database in browser
```

## Admin Panel Access

1. Navigate to `/login`
2. Enter admin email and password (created in Supabase Auth)
3. Access admin panel at `/admin`

## Design System

The project follows a consistent design system defined in `.cursor/rules/`:

- **Primary Color**: #0B5FFF (Blue)
- **Accent Color**: #FFB703 (Amber)
- **Typography**: Inter (headings), Nunito (body)
- **Border Radius**: 1.25rem for cards
- **Container**: max-w-7xl with responsive padding

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- AWS Amplify
- Docker container

## License

This project is created for educational purposes.

## Support

For issues or questions, please use the contact form on the website or reach out to the development team.
