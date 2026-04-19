import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		projects: [
			{
				id: 'proj-01',
				title: 'Quantum Web Architecture',
				type: 'SYSTEM ARCHITECTURE',
				status: 'ONLINE',
				description: 'A high-performance monolithic architecture featuring SvelteKit on the frontend and an optimized Directus headless CMS for backend operations.',
				technologies: ['SvelteKit', 'Directus CMS', 'Tailwind CSS v4'],
				glowColor: 'amber' as const
			},
			{
				id: 'proj-02',
				title: 'E-Commerce Refactor',
				type: 'FRONTEND ENGINEERING',
				status: 'ARCHIVED',
				description: 'Complete overhaul of an aging React frontend, introducing proper state management, strict TypeScript checking, and WCAG accessibility standards.',
				technologies: ['React', 'TypeScript', 'Redux', 'A11y'],
				glowColor: 'cyan' as const
			},
			{
				id: 'proj-03',
				title: 'Creative Agency Portal',
				type: 'FULLSTACK DEV',
				status: 'ARCHIVED',
				description: 'Internal dashboard with complex CSS-driven animations, tactile hardware UI, and extensive data visualization tools for campaign tracking.',
				technologies: ['Vue.js', 'Node.js', 'PostgreSQL'],
				glowColor: 'none' as const
			}
		]
	};
};
