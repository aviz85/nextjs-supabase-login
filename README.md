# Next.js Supabase Authentication

This is a minimal Next.js application with Supabase authentication. The homepage is protected and only accessible after login.

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser

## Features

- User authentication with Supabase
- Protected routes (homepage)
- Login page
- Automatic redirection based on authentication status

## Setup Supabase

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Navigate to Authentication > Settings and enable Email provider
4. Create a user in Authentication > Users
5. Copy your project URL and anon key from Settings > API and add them to your `.env.local` file 