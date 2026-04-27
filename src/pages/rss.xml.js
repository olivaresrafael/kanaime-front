import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	const esPosts = posts
		.filter((post) => post.data.lang === "es")
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: esPosts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			link: `/blog/${post.id}/`,
			pubDate: post.data.pubDate,
			author: post.data.author,
			categories: post.data.tags,
		})),
		customData: `<language>es</language>`,
	});
}
