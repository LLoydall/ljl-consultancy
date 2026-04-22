import type { PageServerLoad } from './$types';
import { directus } from '$lib/cms/directus';
import { readSingleton, readItems } from '@directus/sdk';

export const load: PageServerLoad = async () => {
	try {
		const [systemStatus, projects, experienceItems] = await Promise.all([
			directus.request(readSingleton('system_status')),
			directus.request(readItems('projects', { limit: 1, sort: ['sort'] })),
			directus.request(readItems('experience', { sort: ['sort'] }))
		]);

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
					},
			experience: {
				title: 'Professional Experience',
				roles: experienceItems.map((item) => ({
					id: item.id,
					company: item.company,
					role: item.role,
					period: item.period,
					description: item.description,
					technologies: item.technologies || [],
					status: item.status
				}))
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
			},
			experience: {
				title: 'Professional Experience',
				roles: []
			}
		};
	}
};
