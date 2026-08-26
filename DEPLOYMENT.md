# Render deployment

This repository contains three deployable services:

- `brivent-api`: Node/Express backend
- `brivent-website`: Next.js public website
- `brivent-admin`: Vite static admin dashboard

## Deploy with Blueprint

1. Push the repository to GitHub. The Firebase service-account JSON and all `.env` files are ignored and must not be committed.
2. In Render, choose **New + > Blueprint** and select this repository.
3. Render will read `render.yaml` and create all three services.
4. Complete the environment values marked `sync: false` in the Render dashboard.

## Required backend values

For `brivent-api`:

```env
FIREBASE_PROJECT_ID=brivent-website
FIREBASE_SERVICE_ACCOUNT_JSON={the complete service-account JSON on one line}
ADMIN_EMAILS=the Firebase Authentication admin email
CORS_ALLOWED_ORIGINS=https://brivent-website.onrender.com,https://brivent-admin.onrender.com
```

Use the actual Render URLs after the services are created. Keep the service-account JSON only in Render's secret environment variable. Do not paste it into GitHub.

## Required website values

For `brivent-website`:

```env
BRIVENT_API_URL=https://brivent-api.onrender.com
```

For `brivent-admin`:

```env
VITE_API_URL=https://brivent-api.onrender.com
VITE_SITE_URL=https://brivent-website.onrender.com
VITE_FIREBASE_API_KEY=AIza...
```

The remaining Firebase web values are already specified in `render.yaml`. `VITE_*` values are public browser configuration; the backend service-account JSON is private.

## Firebase setup

In Firebase Console:

1. Enable **Authentication > Sign-in method > Email/Password**.
2. Create the admin user.
3. Create Firestore Database if it does not exist.
4. After the backend is deployed, run the team seed locally with the service account configured in `backend/.env`:

```bash
cd backend
npm install
npm run seed:team
```

The admin dashboard can then manage the `team`, `products`, `blogPosts`, `work`, and `careers` collections.

## Manual Render setup

If you do not use the Blueprint, create the same three services manually using the root directories and commands in `render.yaml`. For the admin static site, use `dist` as the publish directory.