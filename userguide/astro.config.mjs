import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Findher',
			social: {
				github: 'https://github.com/c0ndii/Find_H_er',
			},
			sidebar: [
				{
					label: 'Overview',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Findher', link: '/overview/findher/' },
					],
				},
				{
					label: 'Authentication',
					autogenerate: { directory: 'authentication' },
				},
				{
					label: 'Pages',
					autogenerate: { directory: 'pages' },
				},
			],
		}),
	],
});
