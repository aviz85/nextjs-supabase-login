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

## Authentication Architecture

The application uses a multi-layer authentication flow with Next.js and Supabase:

```
┌───────────┐     ┌───────────┐    ┌───────────┐     ┌───────────┐
│   Client  │     │ Next.js   │    │  Middleware│     │  Supabase │
│  Browser  │     │  Server   │    │            │     │           │
└─────┬─────┘     └─────┬─────┘    └─────┬─────┘     └─────┬─────┘
      │                 │                 │                 │
      │  Request Page   │                 │                 │
      │────────────────>│                 │                 │
      │                 │                 │                 │
      │                 │ Route Request   │                 │
      │                 │────────────────>│                 │
      │                 │                 │                 │
      │                 │                 │ Check Session   │
      │                 │                 │───────────────->│
      │                 │                 │                 │
      │                 │                 │ Session Status  │
      │                 │                 │<────────────────│
      │                 │                 │                 │
      │                 │                 │ If no session   │
      │                 │<────────────────│ & protected route│
      │                 │ Redirect to     │                 │
      │                 │ /login          │                 │
      │                 │                 │                 │
      │ Login Page      │                 │                 │
      │<────────────────│                 │                 │
      │                 │                 │                 │
      │ Submit Login    │                 │                 │
      │ Credentials     │                 │                 │
      │────────────────>│                 │                 │
      │                 │                 │                 │
      │                 │ Authentication  │                 │
      │                 │ Request         │                 │
      │                 │───────────────────────────────────>│
      │                 │                 │                 │
      │                 │                 │                 │ Validate
      │                 │                 │                 │ Credentials
      │                 │                 │                 │
      │                 │ Auth Response   │                 │
      │                 │<───────────────────────────────────│
      │                 │                 │                 │
      │ Set Auth Cookies│                 │                 │
      │<────────────────│                 │                 │
      │                 │                 │                 │
      │ Redirect to /   │                 │                 │
      │<────────────────│                 │                 │
      │                 │                 │                 │
      │ Request /       │                 │                 │
      │────────────────>│                 │                 │
      │                 │                 │                 │
      │                 │ Route Request   │                 │
      │                 │────────────────>│                 │
      │                 │                 │                 │
      │                 │                 │ Check Session   │
      │                 │                 │───────────────->│
      │                 │                 │                 │
      │                 │                 │ Session Valid   │
      │                 │                 │<────────────────│
      │                 │                 │                 │
      │                 │<────────────────│ Allow Access    │
      │                 │                 │                 │
      │ Render Home Page│                 │                 │
      │<────────────────│                 │                 │
      │                 │                 │                 │
      │ Get User Data   │                 │                 │
      │(Client Component)                 │                 │
      │───────────────────────────────────────────────────>│
      │                 │                 │                 │
      │ User Data       │                 │                 │
      │<───────────────────────────────────────────────────│
      │                 │                 │                 │
      │ Display User UI │                 │                 │
      │                 │                 │                 │
```

## Authentication Flow Explained

1. **Initial Request & Middleware Check**:
   - User requests a page
   - Middleware intercepts and checks if a valid session exists with Supabase
   - If no session exists and the route is protected, redirects to login

2. **Login Process**:
   - User enters credentials on login page
   - Next.js sends authentication request to Supabase
   - Supabase validates credentials and returns a session token
   - Next.js sets auth cookies in the browser
   - User is redirected to the homepage

3. **Protected Route Access**:
   - With valid session cookies, user requests the homepage
   - Middleware validates the session with Supabase
   - Access is granted to the protected route
   - Client components fetch user data from Supabase
   - UI is rendered with personalized data

4. **Logout Process**:
   - User clicks logout
   - Session is terminated in Supabase
   - Cookies are cleared
   - User is redirected to login page

## Technical Implementation

- **Next.js App Router**: For routing and server/client components
- **Middleware**: To protect routes and verify authentication
- **Context API**: For user state management across components
- **Supabase Auth**: Handles authentication, sessions, and tokens

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