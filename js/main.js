// main.js — entry point. Each feature lives in its own module.

import { initAge } from './age.js';
import {
	renderProjects, renderFilters, renderStack,
	renderCerts, renderComps, renderTimeline, initCollapse,
} from './render.js';
import { initGithubStats } from './github.js';
import { initPalette } from './palette.js';

renderFilters();
renderProjects();
renderStack();
renderCerts();
renderComps();
renderTimeline();

initCollapse();
initAge();
initPalette();
initGithubStats();
