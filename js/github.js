// github.js — pulls live stars + language for each project card.
// Results are cached for 6 hours so the unauthenticated GitHub API
// rate limit (60 req/hr) is never a problem. Fails silently.

import { PROJECTS, GITHUB_USER } from './data.js';
import { load, save } from './store.js';

const CACHE_KEY = 'gh-stats-v1';
const TTL = 6 * 60 * 60 * 1000;

export async function initGithubStats() {
	let cache = load(CACHE_KEY);

	if (!cache || Date.now() - cache.at > TTL) {
		cache = { at: Date.now(), repos: {} };
		try {
			const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`);
			if (!res.ok) throw new Error(res.status);
			for (const r of await res.json()) {
				cache.repos[r.name] = { stars: r.stargazers_count, lang: r.language };
			}
			save(CACHE_KEY, cache);
		} catch {
			return; // offline / rate-limited — cards just show no stats
		}
	}

	apply(cache.repos);
	// re-apply whenever the grid is re-rendered (tag filter)
	document.addEventListener('projects:rendered', () => apply(cache.repos));
}

function apply(repos) {
	for (const card of document.querySelectorAll('.project')) {
		const info = repos[card.dataset.repo];
		const slot = card.querySelector('.gh-stats');
		if (!info || !slot) continue;
		const bits = [];
		if (info.lang) bits.push(info.lang.toLowerCase());
		if (info.stars > 0) bits.push(`★ ${info.stars}`);
		slot.textContent = bits.join(' · ');
	}
}
