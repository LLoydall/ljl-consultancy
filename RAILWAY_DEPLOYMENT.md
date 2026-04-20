# Railway Deployment Guide

This guide walks you through deploying your LJL Consultancy portfolio (SvelteKit frontend) and headless CMS (Directus backend) as a unified full-stack application on [Railway.com](https://railway.app).

## Overview

You will create **one Railway Project** containing multiple services:

1.  **PostgreSQL** (Database for Directus)
2.  **Redis** (Cache for Directus - Optional but recommended)
3.  **Directus** (Backend CMS)
4.  **SvelteKit** (Frontend application)

---

## Step 1: Deploy Directus Backend

1. Log into your Railway Dashboard and click **New Project**.
2. Select **Deploy from Template**.
3. Search for **Directus** and select the official template (it will usually bundle PostgreSQL and Redis automatically).
4. Click **Deploy**. Railway will provision the database, cache, and the Directus Node.js server.
5. Once deployed, click on the **Directus** service in your Railway project canvas.
6. Go to the **Settings** tab.
7. Scroll down to **Networking** and click **Generate Domain**.
8. **Save this URL** (e.g., `https://directus-production-xxxx.up.railway.app`). This is your `VITE_DIRECTUS_URL`.
9. _Visit your new Directus URL, set up your admin account, and configure the Schema according to the `DIRECTUS_SETUP.md` guide._

---

## Step 2: Deploy SvelteKit Frontend

1. Ensure your current frontend codebase is pushed to a GitHub repository.
2. In the **same Railway project** canvas where your Directus instance lives, click **New** -> **GitHub Repo**.
3. Select the repository containing your SvelteKit code.
4. Railway will automatically detect the `railway.toml` file in the root of the repo, which specifies:
   - Build Command: `npm run build`
   - Start Command: `node build`
5. **DO NOT let the build finish yet!** It will fail without the environment variable.
6. Click on your newly created SvelteKit service.
7. Go to the **Variables** tab and add a new variable:
   - **VARIABLE NAME:** `VITE_DIRECTUS_URL`
   - **VALUE:** `https://<YOUR_DIRECTUS_DOMAIN>.up.railway.app` (The domain you generated in Step 1).
8. Go to the **Settings** tab, scroll to **Networking**, and click **Generate Domain** for your frontend.
9. Railway will automatically redeploy the SvelteKit frontend now that the environment variables are set.

---

## Step 3: Connect Live Data

Now that both services are running:

1. In your local codebase, open `src/routes/+page.server.ts` (and the `experience`/`projects` server routes).
2. Uncomment the live data fetching code (`directus.request(...)`).
3. Delete the mock data `return` objects.
4. Commit and push these changes to GitHub.
5. Railway will automatically detect the push, rebuild your SvelteKit application using `nixpacks`, and deploy the fresh code.

Your frontend is now securely querying your Directus backend within the same infrastructure ecosystem!
