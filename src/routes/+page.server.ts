import type { PageServerLoad } from './$types';
import { directus } from '$lib/cms/directus';
// Note: In the future, we will import readItems from '@directus/sdk' to fetch data
// import { readItems } from '@directus/sdk';

export const load: PageServerLoad = async () => {
	// In a production scenario with a live Directus instance, we would fetch data like this:
	// try {
	// 	const projects = await directus.request(readItems('projects', { limit: 1, sort: ['-date_created'] }));
	//  const system = await directus.request(readSingleton('system_status'));
	// } catch (e) {
	//  console.error(e);
	// }

	// Returning mock data to align with what the CMS will eventually return
	return {
		system: {
			status: 'ONLINE',
			uptime: '99.9'
		},
		latestProject: {
			title: 'Quantum Web Architecture',
			status: 'SYSTEM OPTIMAL',
			logs: [
				'> INITIALIZING NEW SEQUENCE...',
				'> SYNCING WITH DIRECTUS CMS...',
				'> FETCHING LATEST SCHEMATICS...'
			],
			actionText: 'View Specs'
		}
	};
};
