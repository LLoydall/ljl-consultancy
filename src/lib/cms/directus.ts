import { createDirectus, rest, graphql } from '@directus/sdk';
import type { Schema } from './schema';

// Use an environment variable for the API URL, defaulting to localhost if not provided
const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055';

export const directus = createDirectus<Schema>(DIRECTUS_URL).with(rest());
