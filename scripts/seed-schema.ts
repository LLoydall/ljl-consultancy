import {
	createDirectus,
	rest,
	staticToken,
	readItems,
	deleteItems,
	createItems,
	updateSingleton
} from '@directus/sdk';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

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

async function seedData() {
	try {
		console.log('🌱 Starting Directus data seed...');

		// Read seed data
		const seedDataPath = resolve(__dirname, '../directus-seed-data.json');
		const seedDataContent = readFileSync(seedDataPath, 'utf-8');
		const seedData = JSON.parse(seedDataContent);

		// Recursively scan and replace {file:path} tokens
		function replaceFileTokens(obj: any): any {
			if (typeof obj === 'string') {
				const fileMatch = obj.match(/^{file:(.*?)}$/);
				if (fileMatch) {
					const filePath = resolve(__dirname, '..', fileMatch[1]);
					console.log(`   Reading file: ${fileMatch[1]}`);
					try {
						return readFileSync(filePath, 'utf-8');
					} catch (err) {
						console.error(`   ❌ Failed to read file ${filePath}:`, err);
						return obj;
					}
				}
				return obj;
			}
			if (Array.isArray(obj)) {
				return obj.map(replaceFileTokens);
			}
			if (obj !== null && typeof obj === 'object') {
				const newObj: any = {};
				for (const key in obj) {
					newObj[key] = replaceFileTokens(obj[key]);
				}
				return newObj;
			}
			return obj;
		}

		const processedSeedData = replaceFileTokens(seedData);

		// Seed System Status
		if (processedSeedData.system_status) {
			console.log('⏳ Seeding system_status (singleton)...');
			await client.request(updateSingleton('system_status', processedSeedData.system_status));
			console.log('✅ system_status seeded successfully.');
		}

		// Seed Collections
		const collectionsToSeed = ['projects', 'experience'];

		for (const collection of collectionsToSeed) {
			if (processedSeedData[collection] && Array.isArray(processedSeedData[collection])) {
				console.log(`⏳ Seeding ${collection}...`);

				// 1. Fetch existing items to delete them and start fresh
				const existingItems = await client.request(
					readItems(collection, { fields: ['id'], limit: -1 })
				);

				if (existingItems.length > 0) {
					console.log(
						`   Found ${existingItems.length} existing items in ${collection}. Deleting...`
					);
					const idsToDelete = existingItems.map((item: any) => item.id);
					await client.request(deleteItems(collection, idsToDelete as any));
				}

				// 2. Insert new items
				const newItems = processedSeedData[collection];
				if (newItems.length > 0) {
					console.log(`   Inserting ${newItems.length} new items into ${collection}...`);
					await client.request(createItems(collection, newItems));
				}

				console.log(`✅ ${collection} seeded successfully.`);
			}
		}

		console.log('🎉 Seed completed successfully!');
	} catch (error) {
		console.error('❌ Error seeding data:', error);
		process.exit(1);
	}
}

seedData();
