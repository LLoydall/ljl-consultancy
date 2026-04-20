import type { PageServerLoad } from './$types';
import { directus } from '$lib/cms/directus';
import { readItems } from '@directus/sdk';

export const load: PageServerLoad = async () => {
	try {
		const experienceItems = await directus.request(readItems('experience', { sort: ['sort'] }));

		return {
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
		};
	} catch (e) {
		console.error('Error fetching CMS data:', e);
		return {
			title: 'Professional Experience',
			roles: []
		};
	}
};
