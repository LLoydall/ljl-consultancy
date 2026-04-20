import type { PageServerLoad } from './$types';
import { directus } from '$lib/cms/directus';
import { readItems } from '@directus/sdk';

export const load: PageServerLoad = async () => {
	try {
		const projectItems = await directus.request(readItems('projects', { sort: ['sort'] }));

		return {
			projects: projectItems.map((item) => ({
				id: item.id,
				slug: item.slug,
				title: item.title,
				type: item.type,
				status: item.status,
				description: item.description,
				technologies: item.technologies || [],
				glowColor: item.glow_color
			}))
		};
	} catch (e) {
		console.error('Error fetching CMS data:', e);
		return {
			projects: []
		};
	}
};
