# Brivent Admin

Vite + React + TypeScript + Tailwind dashboard for managing Brivent content and contact enquiries.

## Setup

1. Enable **Email/Password** sign-in in Firebase Authentication.
2. Create the admin user in Firebase Authentication.
3. Copy `.env.example` to `.env` and fill in the Firebase web app config from Project settings.
4. Add the same admin email to `backend/.env` as `ADMIN_EMAILS`.
5. Ensure the backend has a Firebase Admin service account configured.
6. Install and run:

```bash
npm install
npm run dev
```

The dashboard runs at `http://localhost:5173` by default.

## Content model

The dashboard manages the Firestore collections `products`, `blogPosts`, `work`, `team`, and `careers`. Documents use their `slug` as the Firestore document ID. Use **Import** to upload one JSON document or an array of documents, and **Export** to download the current collection.

The backend admin API is protected by Firebase ID tokens and the `ADMIN_EMAILS` allowlist. Public website reads remain unchanged.
