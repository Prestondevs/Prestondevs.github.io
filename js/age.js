// age.js — the live uptime / remaining counters.

import { BIRTH, LIFE_EXPECTANCY } from './data.js';

const MS_YEAR = 365.2425 * 86400000;

export function initAge() {
	const ageEl = document.getElementById('age');
	const leftEl = document.getElementById('left');
	if (!ageEl || !leftEl) return;

	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function render() {
		const a = (Date.now() - BIRTH.getTime()) / MS_YEAR;
		ageEl.textContent = a.toFixed(reduced ? 6 : 15);
		leftEl.textContent = (LIFE_EXPECTANCY - a).toFixed(reduced ? 6 : 15);
	}

	if (reduced) {
		render();
		setInterval(render, 1000); // calm 1Hz tick instead of rAF blur
	} else {
		(function tick() {
			render();
			requestAnimationFrame(tick);
		})();
	}
}
