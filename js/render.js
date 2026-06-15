// render.js — builds every section from data.js.

import { PROJECTS, STACK, CERTS, COMPS, TIMELINE_YEARS, GITHUB_USER } from './data.js';

const repoUrl = (p) => `https://github.com/${GITHUB_USER}/${p.repo}`;

function el(tag, cls, html) {
	const n = document.createElement(tag);
	if (cls) n.className = cls;
	if (html !== undefined) n.innerHTML = html;
	return n;
}

/* ---------- projects + tag filter ---------- */

let activeTag = null;

export function renderProjects() {
	const grid = document.getElementById('project-grid');
	grid.innerHTML = '';

	for (const p of PROJECTS) {
		if (activeTag && !p.tags.includes(activeTag)) continue;

		const card = el('article', 'project');
		card.dataset.repo = p.repo;

		const head = el('div', 'project-head');
		const link = el('a');
		link.href = repoUrl(p);
		link.target = '_blank';
		link.rel = 'noopener';
		link.append(el('h3', null, p.name));
		head.append(link);
		if (p.wip) head.append(el('span', 'badge-wip', 'wip'));
		card.append(head);

		card.append(el('p', 'project-desc', p.desc));

		const meta = el('div', 'project-meta');
		for (const t of p.tags) meta.append(el('span', 'tag', t));
		meta.append(el('span', 'gh-stats')); // filled by github.js
		card.append(meta);

		grid.append(card);
	}

	if (!grid.children.length) {
		grid.append(el('p', 'empty', 'nothing tagged that — clear the filter to see everything.'));
	}
}

export function renderFilters() {
	const wrap = document.getElementById('project-filters');
	const tags = [...new Set(PROJECTS.flatMap((p) => p.tags))].sort();

	const make = (label, tag) => {
		const b = el('button', 'filter' + (activeTag === tag ? ' active' : ''), label);
		b.type = 'button';
		b.setAttribute('aria-pressed', String(activeTag === tag));
		b.addEventListener('click', () => {
			activeTag = activeTag === tag ? null : tag;
			renderFilters();
			renderProjects();
			document.dispatchEvent(new CustomEvent('projects:rendered'));
		});
		return b;
	};

	wrap.innerHTML = '';
	wrap.append(make('all', null));
	for (const t of tags) wrap.append(make(t, t));
}

/* ---------- stack ---------- */

export function renderStack() {
	const grid = document.getElementById('stack-grid');
	for (const s of STACK) {
		const item = el('div', 'skill-item');
		item.append(el('i', s.icon), el('span', null, s.label));
		grid.append(item);
	}
}

/* ---------- certs / comps ---------- */

export function renderCerts() {
	const ul = document.getElementById('certs-list');
	for (const c of CERTS) {
		ul.append(el('li', null, `${c.name} <span class="dim-span">(${c.span})</span>`));
	}
}

export function renderComps() {
	const ul = document.getElementById('comps-list');
	for (const c of COMPS) {
		const place = c.place ? `<span class="place">${c.place}</span> — ` : '';
		ul.append(el('li', null, `${place}${c.name}`));
	}
}

/* ---------- timeline (generated from project years) ---------- */

export function renderTimeline() {
	const track = document.getElementById('timeline');
	track.innerHTML = '';

	const byYear = new Map();
	for (const p of PROJECTS) {
		if (!byYear.has(p.year)) byYear.set(p.year, []);
		byYear.get(p.year).push(p);
	}
	const years = [...new Set([...byYear.keys(), ...TIMELINE_YEARS])].sort((a, b) => b - a);

	for (const year of years) {
		track.append(el('div', 'timeline-year', String(year)));
		const items = byYear.get(year) || [];
		for (let i = 0; i < items.length; i += 2) {
			const row = el('div', 'timeline-row');
			row.append(timelineCard(items[i], 'left'));
			row.append(items[i + 1] ? timelineCard(items[i + 1], 'right') : el('div', 'timeline-card empty'));
			track.append(row);
		}
	}
}

function timelineCard(p, side) {
	const a = el('a', `timeline-card ${side}`, p.name);
	a.href = repoUrl(p);
	a.target = '_blank';
	a.rel = 'noopener';
	return a;
}

/* ---------- collapse with persistence ---------- */

import { load, save } from './store.js';

export function initCollapse() {
	const collapsed = new Set(load('collapsed', []));

	for (const id of collapsed) {
		document.getElementById(id)?.classList.add('collapsed');
	}
	syncAria();

	document.addEventListener('click', (e) => {
		const h = e.target.closest('[data-toggle]');
		if (!h) return;
		const sec = h.closest('.sec');
		sec.classList.toggle('collapsed');
		sec.classList.contains('collapsed') ? collapsed.add(sec.id) : collapsed.delete(sec.id);
		save('collapsed', [...collapsed]);
		syncAria();
	});

	function syncAria() {
		for (const h of document.querySelectorAll('[data-toggle]')) {
			h.setAttribute('aria-expanded', String(!h.closest('.sec').classList.contains('collapsed')));
		}
	}
}
