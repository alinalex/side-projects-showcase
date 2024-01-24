## Side Projects Showcase

This project was born from my need to have a place where I can show the world all the side projects that I've been tinkering with.

## How to run the project

You need to create an .env.local file in the root of the project with the following variables:
- SUPABASE_URL=''
- SUPABASE_ANON_KEY=''
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=''
- CLERK_SECRET_KEY=''
- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
- NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard/admin
- NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard/admin

You have to create an account with [clerk][https://clerk.com/] and [supabase][https://supabase.com/] from where you'll get the first four variables that I left empty string.