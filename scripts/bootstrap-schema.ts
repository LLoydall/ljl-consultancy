import {
	createDirectus,
	rest,
	staticToken,
	readCollections,
	createCollection,
	readFieldsByCollection,
	createField,
	CoreSchema,
	CreateCollectionOutput
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

async function bootstrapSchema() {
	console.log(`🚀 Bootstrapping schema to ${DIRECTUS_URL}...`);

	try {
		// Read schema definition from JSON file
		const schemaPath = resolve(__dirname, '../directus-schema.json');
		const schemaContent = readFileSync(schemaPath, 'utf-8');
		const schemaDefinition = JSON.parse(schemaContent);

		// 1. Get existing collections
		const existingCollections = await client.request(readCollections());
		const existingCollectionNames = existingCollections.map((c: CoreSchema) => c.collection);

		for (const def of schemaDefinition) {
			const { collection, meta, schema, fields } = def;

			// 2. Create collection if it doesn't exist
			if (!existingCollectionNames.includes(collection)) {
				console.log(`\n📦 Creating collection: ${collection}`);
				await client.request(
					createCollection({ collection, meta, schema } as CreateCollectionOutput<CoreSchema>)
				);
			} else {
				console.log(`\n✅ Collection exists: ${collection}`);
			}

			// 3. Get existing fields for this collection
			const existingFieldsRes = await client.request(readFieldsByCollection(collection));
			const existingFieldNames = existingFieldsRes.map((f: CoreSchema) => f.field);

			// 4. Create missing fields
			for (const fieldDef of fields) {
				if (!existingFieldNames.includes(fieldDef.field)) {
					console.log(`   ➕ Adding field: ${fieldDef.field}`);
					await client.request(createField(collection, fieldDef));
				} else {
					console.log(`   ✔️ Field exists: ${fieldDef.field}`);
				}
			}
		}

		console.log('\n🎉 Schema bootstrap complete!');
	} catch (error) {
		console.error('\n❌ Error bootstrapping schema:', error?.errors || error?.message || error);
		process.exit(1);
	}
}

bootstrapSchema();
