# Directus Headless CMS Setup Guide

This guide provides step-by-step instructions on how to configure your self-hosted Directus instance to properly interface with the LJL Consultancy SvelteKit frontend.

## 1. Initial Setup

1. Spin up a new Directus instance (e.g., via Railway.com using the official Directus template).
2. Log in using your initial admin credentials.
3. Once logged in, go to **Settings > Roles & Permissions**, click on the **Public** role, and grant **Read** access to the collections you are about to create so the frontend can fetch them without an API token (or alternatively, create a secure static token for the frontend if you prefer).

---

## 2. Data Schema Configuration

You need to create three specific collections in Directus. For each collection, create exactly the fields listed below.

### Collection 1: `system_status`

This collection handles the global status dashboard items.
*   **Type:** Singleton
*   **Collection Name:** `system_status`

**Fields to Create:**

| Field Key | Type in Directus | Interface / Notes |
| :--- | :--- | :--- |
| `status` | String (Input) | e.g. "ONLINE" or "DEGRADED" |
| `uptime` | String (Input) | e.g. "99.9" |

---

### Collection 2: `projects`

This collection holds your engineering and consultancy projects.
*   **Type:** Collection (Multiple Items)
*   **Collection Name:** `projects`
*   *(Optional)* Enable "Sort" in the collection setup to allow manual drag-and-drop reordering.

**Fields to Create:**

| Field Key | Type in Directus | Interface / Notes |
| :--- | :--- | :--- |
| `title` | String (Input) | e.g. "Quantum Web Architecture" |
| `type` | String (Input) | e.g. "SYSTEM ARCHITECTURE" |
| `status` | String (Dropdown) | Choices: `ONLINE`, `ARCHIVED`, `SYSTEM OPTIMAL` |
| `description` | Text (Textarea) | Short descriptive text |
| `technologies` | JSON (Tags or Repeater) | Array of strings (e.g. `["SvelteKit", "Tailwind"]`) |
| `glow_color` | String (Dropdown) | Choices: `amber`, `cyan`, `none` |
| `logs` | JSON (Tags or Repeater) | Array of terminal strings (e.g. `["> INIT..."]`) |
| `action_text` | String (Input) | Button text (e.g. "View Specs") |

---

### Collection 3: `experience`

This collection holds your professional roles and timelines.
*   **Type:** Collection (Multiple Items)
*   **Collection Name:** `experience`
*   *(Optional)* Enable "Sort" in the collection setup to allow manual drag-and-drop reordering.

**Fields to Create:**

| Field Key | Type in Directus | Interface / Notes |
| :--- | :--- | :--- |
| `company` | String (Input) | e.g. "Lloyds Banking Group" |
| `role` | String (Input) | e.g. "Software Engineer" |
| `period` | String (Input) | e.g. "2021 - Present" |
| `description` | Text (Textarea) | Description of responsibilities |
| `technologies` | JSON (Tags or Repeater) | Array of strings (e.g. `["React", "TypeScript"]`) |
| `status` | String (Dropdown) | Choices: `ACTIVE`, `ARCHIVED` |

---

## 3. Environment Variables

Once Directus is running, ensure you copy the URL to your frontend's `.env` file:

```env
VITE_DIRECTUS_URL="https://your-directus-railway-app.up.railway.app"
```

The Directus SDK in `src/lib/cms/directus.ts` uses this environment variable, and thanks to the `src/lib/cms/schema.ts` file we created, all your API calls via `@directus/sdk` will now be strictly typed to the schema above.
