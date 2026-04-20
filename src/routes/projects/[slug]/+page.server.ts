import { error } from '@sveltejs/kit';
import { readItems } from '@directus/sdk';
import { directus } from '$lib/cms/directus';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	try {
		const projects = await directus.request(
			readItems('projects', {
				filter: { slug: { _eq: slug } },
				limit: 1
			})
		);

		if (!projects || projects.length === 0) {
			throw error(404, 'Project not found');
		}

		return {
			project: projects[0]
		};
	} catch (err) {
		console.error('Error fetching project:', err);
		throw error(404, 'Project not found');
	}
};
