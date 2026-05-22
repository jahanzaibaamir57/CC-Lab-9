# Task App
This is a React + Vite task app that uses Supabase for auth and data storage.
# Name: Abdul Wahab
# Enrollment: 01-131232-007
# Section: BSE6A

# Deployment Link
https://cc-labb-09.vercel.app/
# Supabase URL
https://xubmndoojivabmyeymww.supabase.co

## Local setup

1. Copy [.env.example](.env.example) to [.env.local](.env.local).
2. Fill in your Supabase project URL and anon key.
3. Run `npm install` if dependencies are not installed yet.
4. Start the app with `npm run dev`.

## Supabase setup

1. Create a Supabase project.
2. Run the SQL in [supabase/schema.sql](supabase/schema.sql) to create the `tasks` table and row-level security policies.
3. Enable Auth providers you want to support, usually email/password.
4. Add your production URL to the Supabase Auth redirect URLs.
5. Use the project URL and anon key in your frontend environment variables.

## GitHub and deployment

1. Commit and push this repository to GitHub.
2. Connect the GitHub repo to your deployment platform of choice, such as Vercel or Netlify, for the frontend.
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the platform environment settings.
4. Redeploy after changing environment variables.

## Production build

Run `npm run build` before deployment to verify the app compiles cleanly.

## Deploy to Supabase (Hosting)

1. In the Supabase dashboard, open the **Sites** (or Hosting) area and choose **New site** → **Connect GitHub**.
2. Select the repository `Wahab440/CC_Labb_09` and the `master` branch.
3. Set the build command to:

```
npm run build
```

4. Set the publish directory to:

```
dist
```

5. Add two environment variables in the site settings:

- `VITE_SUPABASE_URL` — your Supabase project URL (e.g. `https://<project-ref>.supabase.co`)
- `VITE_SUPABASE_ANON_KEY` — the anon/public API key

6. In the Supabase project's SQL editor, run the SQL at `supabase/schema.sql` to create the `tasks` table and RLS policies.
7. Deploy the site; Supabase will build the site and publish it. After the build completes, add the site URL to your Supabase Auth redirect URLs so sign-in flows return correctly.

If you prefer automated deploys from GitHub without the dashboard, use the Supabase GitHub integration in the project settings to enable automatic redeploys on push.
