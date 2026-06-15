// palette.js — ctrl+k / "/" command palette.
// Jump to sections, open repos, cycle the old-school backgrounds.

import { PROJECTS, GITHUB_USER, BACKGROUNDS } from './data.js';
import { load, save } from './store.js';

/* ---------- background cycling (the resurrected bgswitch.js) ---------- */

let bgIndex = load('bg-index', 0) % BACKGROUNDS.length;

export function applyBg() {
	const src = BACKGROUNDS[bgIndex];
	const b = document.body;
	if (!src) {
		b.style.backgroundImage = '';
		b.classList.remove('has-bg');
		return;
	}
	const isGif = src.endsWith('.gif');
	b.classList.add('has-bg');
	b.style.backgroundImage = `url(${src})`;
	b.style.backgroundSize = isGif ? 'auto' : 'cover';
	b.style.backgroundRepeat = isGif ? 'repeat' : 'no-repeat';
	b.style.backgroundPosition = isGif ? 'top left' : 'center center';
	b.style.backgroundAttachment = 'fixed';
}

export function cycleBg() {
	bgIndex = (bgIndex + 1) % BACKGROUNDS.length;
	save('bg-index', bgIndex);
	applyBg();
}

/* ---------- commands ---------- */

function buildCommands() {
	const cmds = [
		{ label: 'go: projects', hint: 'jump', run: () => jump('s-projects') },
		{ label: 'go: stack', hint: 'jump', run: () => jump('s-stack') },
		{ label: 'go: certs', hint: 'jump', run: () => jump('s-certs') },
		{ label: 'go: comps', hint: 'jump', run: () => jump('s-comps') },
		{ label: 'go: timeline', hint: 'jump', run: () => jump('s-timeline') },
		{ label: 'open: github profile', hint: 'link', run: () => open(`https://github.com/${GITHUB_USER}`) },
		{ label: 'bg: cycle background', hint: 'fun', run: cycleBg },
	];
	for (const p of PROJECTS) {
		cmds.push({
			label: `repo: ${p.name}`,
			hint: p.tags.join(', '),
			run: () => open(`https://github.com/${GITHUB_USER}/${p.repo}`),
		});
	}
	return cmds;
}

const jump = (id) => {
	document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
const open = (url) => window.open(url, '_blank', 'noopener');

/* ---------- UI ---------- */

export function initPalette() {
	const overlay = document.getElementById('palette');
	const input = document.getElementById('palette-input');
	const list = document.getElementById('palette-results');
	const commands = buildCommands();
	let filtered = commands;
	let selected = 0;

	function openPalette() {
		overlay.hidden = false;
		input.value = '';
		filter('');
		input.focus();
	}
	function closePalette() {
		overlay.hidden = true;
	}

	function filter(q) {
		q = q.trim().toLowerCase();
		filtered = q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands;
		selected = 0;
		renderList();
	}

	function renderList() {
		list.innerHTML = '';
		filtered.forEach((c, i) => {
			const li = document.createElement('li');
			li.setAttribute('role', 'option');
			li.setAttribute('aria-selected', String(i === selected));
			if (i === selected) li.classList.add('selected');
			li.innerHTML = `<span>${c.label}</span><span class="cmd-hint">${c.hint}</span>`;
			li.addEventListener('click', () => {
				closePalette();
				c.run();
			});
			li.addEventListener('mousemove', () => {
				if (selected !== i) { selected = i; renderList(); }
			});
			list.append(li);
		});
		if (!filtered.length) {
			list.innerHTML = '<li class="cmd-empty">no matches</li>';
		}
	}

	input.addEventListener('input', () => filter(input.value));
	input.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowDown') { e.preventDefault(); selected = Math.min(selected + 1, filtered.length - 1); renderList(); }
		else if (e.key === 'ArrowUp') { e.preventDefault(); selected = Math.max(selected - 1, 0); renderList(); }
		else if (e.key === 'Enter' && filtered[selected]) { closePalette(); filtered[selected].run(); }
		else if (e.key === 'Escape') closePalette();
	});

	overlay.addEventListener('click', (e) => {
		if (e.target === overlay) closePalette();
	});

	document.addEventListener('keydown', (e) => {
		const typing = /input|textarea/i.test(document.activeElement?.tagName || '');
		if (e.key === 'Escape' && !overlay.hidden) {
			closePalette();
		} else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			overlay.hidden ? openPalette() : closePalette();
		} else if (e.key === '/' && !typing && overlay.hidden) {
			e.preventDefault();
			openPalette();
		}
	});

	// footer button shares the bg command
	document.getElementById('bg-cycle')?.addEventListener('click', cycleBg);

	applyBg();
}
