# Brivent Website Hosting Handoff

This project has three parts and uses two hosting platforms:

| Application | Purpose | Hosting | Directory |
| --- | --- | --- | --- |
| Brivent Website | Public-facing website | Vercel | `brivent/` |
| Brivent API | Website data, contact form, and admin API | Render | `backend/` |
| Brivent Admin | Private content dashboard | Vercel | `admin/` |

The public website and admin dashboard are deployed as separate Vercel projects. The backend runs as a Node service on Render.

## Repository and secrets

Push the repository to GitHub and give the hosting administrator access to it. The repository includes the source code and deployment configuration, but does not include local `.env` files or the Firebase service-account JSON.

Do not commit or send these files through GitHub:

- `backend/.env`
- `admin/.env`
- `backend/brivent-website-firebase-adminsdk-*.json`
- Any `node_modules` directory

The Firebase service-account credentials must be added privately in Render. The Firebase web configuration can be added as Vercel environment variables.

## 1. Deploy the backend on Render

In Render, create a **Web Service** connected to this repository. Use these settings:

- **Root directory:** `backend`
- **Runtime:** Node
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Node version:** `20`

The included `render.yaml` can also be used to create the backend service as a Blueprint.

Add these environment variables to the Render service:

```env
FIREBASE_PROJECT_ID=brivent-website
FIREBASE_SERVICE_ACCOUNT_JSON=<complete Firebase service-account JSON>
FIREBASE_STORAGE_BUCKET=brivent-website.firebasestorage.app
ADMIN_EMAILS=<admin Firebase account email>
CORS_ALLOWED_ORIGINS=https://<website-domain>,https://<admin-domain>
```

`FIREBASE_STORAGE_BUCKET` is where the admin dashboard's image uploads are stored. It must match the bucket shown in the Firebase Console under Storage (and the same value used for `VITE_FIREBASE_STORAGE_BUCKET` below).

Use the final Vercel domains in `CORS_ALLOWED_ORIGINS`. For example:

```env
CORS_ALLOWED_ORIGINS=https://brivent.vercel.app,https://brivent-admin.vercel.app
```

The service-account JSON is private and must only be entered in Render's environment settings.

After deployment, confirm the API is running by opening:

```text
https://<render-backend-domain>/health
```

## 2. Deploy the public website on Vercel

Create a new Vercel project from the same GitHub repository with these settings:

- **Root directory:** `brivent`
- **Framework preset:** Next.js
- **Install command:** `npm install`
- **Build command:** `npm run build`
- **Start command:** Vercel manages this automatically

Add this environment variable in Vercel:

```env
BRIVENT_API_URL=https://<render-backend-domain>
```

After the first deployment, copy the website's Vercel domain into the backend's `CORS_ALLOWED_ORIGINS` value.

## 3. Deploy the admin dashboard on Vercel

Create another Vercel project from the same GitHub repository:

- **Root directory:** `admin`
- **Framework preset:** Other
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`

Add these environment variables in Vercel:

```env
VITE_API_URL=https://<render-backend-domain>
VITE_SITE_URL=https://<website-domain>
VITE_FIREBASE_API_KEY=<Firebase web API key>
VITE_FIREBASE_AUTH_DOMAIN=brivent-website.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=brivent-website
VITE_FIREBASE_STORAGE_BUCKET=brivent-website.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=246431380167
VITE_FIREBASE_APP_ID=1:246431380167:web:749211513d05e1774f44e2
```

The admin's Firebase web settings are safe to use in a browser. They are different from the private Firebase Admin service-account credentials used by Render.

After the admin deployment is live, add its Vercel domain to the backend's `CORS_ALLOWED_ORIGINS` value and redeploy the backend.

## Firebase setup

In the Firebase Console for `brivent-website`:

1. Enable **Authentication > Sign-in method > Email/Password**.
2. Create the administrator account.
3. Create Firestore Database if it does not already exist.
4. Enable **Storage** if it does not already exist, and note its bucket name for `FIREBASE_STORAGE_BUCKET` above.
5. Make sure the administrator email matches `ADMIN_EMAILS` in Render.

The admin dashboard manages these Firestore collections:

- `team`
- `products`
- `blogPosts`
- `work`
- `careers`

## Initial team data

After Firestore has been created, seed the existing team records once from a computer with the Firebase service account configured in `backend/.env`:

```bash
cd backend
npm install
npm run seed:team
```

The command can be run again safely. It uses each member's `slug` as the Firestore document ID.

## Final checks

1. Open the Vercel website and confirm it loads.
2. Open the Render `/health` URL and confirm it returns successfully.
3. Open the Vercel admin URL and sign in with the Firebase administrator account.
4. Confirm that the Team collection appears in the dashboard.
5. Submit a test contact form and confirm the enquiry appears in the admin dashboard.
