import type { PageServerLoad } from './$types';
import { directus } from '$lib/cms/directus';
import { readSingleton, readItems } from '@directus/sdk';

export const load: PageServerLoad = async () => {
	try {
		const systemStatus = await directus.request(readSingleton('system_status'));
		const projects = await directus.request(readItems('projects', { limit: 1, sort: ['sort'] }));
		const latestProject = projects[0];

		return {
			system: {
				status: systemStatus?.status || 'OFFLINE',
				uptime: systemStatus?.uptime || '0.0'
			},
			latestProject: latestProject
				? {
						title: latestProject.title,
						status: latestProject.status,
						logs: latestProject.logs || [],
						actionText: latestProject.action_text
					}
				: {
						title: 'No Project Data',
						status: 'OFFLINE',
						logs: ['> WAITING FOR DATA...'],
						actionText: 'STANDBY'
					}
		};
	} catch (e) {
		console.error('Error fetching CMS data:', e);
		return {
			system: { status: 'OFFLINE', uptime: '0.0' },
			latestProject: {
				title: 'System Error',
				status: 'OFFLINE',
				logs: ['> CMS CONNECTION FAILED...'],
				actionText: 'RETRY'
			}
		};
	}
};
