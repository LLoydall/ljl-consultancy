import {
	createDirectus,
	rest,
	staticToken,
	readCollections,
	deleteCollection
} from '@directus/sdk';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load .env from project root
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

const DIRECTUS_URL = process.env.VITE_DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;

if (!DIRECTUS_ADMIN_TOKEN) {
	console.error('❌ DIRECTUS_ADMIN_TOKEN is missing in .env');
	console.info(
		'Please create an admin user in Directus, generate a static token, and add it to your .env file.'
	);
	process.exit(1);
}

const client = createDirectus(DIRECTUS_URL).with(staticToken(DIRECTUS_ADMIN_TOKEN)).with(rest());

async function cleanSchema() {
	console.log(`🧹 Cleaning schema at ${DIRECTUS_URL}...`);

	try {
		// 1. Get existing collections
		const existingCollections = await client.request(readCollections());
		const existingCollectionNames = existingCollections.map(
			(c: { collection: string }) => c.collection
		);

		// 2. Filter out Directus system collections
		const userCollections = existingCollectionNames.filter(
			(name: string) => !name.startsWith('directus_')
		);

		if (userCollections.length === 0) {
			console.log('\n✅ No user collections found to delete.');
		} else {
			console.log(
				`\nFound ${userCollections.length} user collections to delete: ${userCollections.join(', ')}`
			);
			for (const collection of userCollections) {
				console.log(`\n🗑️ Deleting collection: ${collection}`);
				try {
					await client.request(deleteCollection(collection));
					console.log(`   ✅ Successfully deleted ${collection}`);
				} catch (err: unknown) {
					const error = err as { errors?: unknown; message?: string };
					console.error(
						`   ❌ Failed to delete ${collection}:`,
						error?.errors || error?.message || error
					);
				}
			}
		}

		console.log('\n✨ Schema cleanup complete!');
	} catch (err: unknown) {
		const error = err as { errors?: unknown; message?: string };
		console.error('\n❌ Error connecting to Directus:', error?.errors || error?.message || error);
		process.exit(1);
	}
}

cleanSchema();
