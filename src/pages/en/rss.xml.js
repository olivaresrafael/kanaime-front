import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE } from '../../consts';

const SITE_DESCRIPTION_EN = "Digital magazine of nature, exploration, and culture from the heart of Venezuela.";

export async function GET(context) {
	const posts = await getCollection('blog');
	const enPosts = posts
		.filter((post) => post.data.lang === "en")
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	return rss({
		title: `${SITE_TITLE} — English`,
		description: SITE_DESCRIPTION_EN,
		site: context.site,
		items: enPosts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			link: `/en/blog/${post.id}/`,
			pubDate: post.data.pubDate,
			author: post.data.author,
			categories: post.data.tags,
		})),
		customData: `<language>en</language>`,
	});
}
