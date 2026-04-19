import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Mock data for work experience
	// Will eventually be fetched from Directus
	return {
		title: 'Professional Experience',
		roles: [
			{
				id: 'lloyds-01',
				company: 'Lloyds Banking Group',
				role: 'Software Engineer',
				period: '2021 - Present',
				description: 'Focused on complex frontend architecture, accessibility standards, and state management within a large-scale enterprise environment. Building secure, robust web applications used by millions.',
				technologies: ['React', 'TypeScript', 'Redux', 'A11y'],
				status: 'ACTIVE'
			},
			{
				id: 'wt-01',
				company: 'Wunderman Thompson',
				role: 'Web Developer',
				period: '2018 - 2021',
				description: 'Developed high-performance web applications and creative digital experiences for global brands in a fast-paced agency environment. Specialized in performant UI and complex CSS animations.',
				technologies: ['JavaScript', 'Svelte', 'CSS Animations', 'Node.js'],
				status: 'ARCHIVED'
			}
		]
	};
};
