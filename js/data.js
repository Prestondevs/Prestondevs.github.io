// ============================================================
// data.js — single source of truth.
// Add a project here and the grid, filters, timeline,
// and command palette all pick it up automatically.
// ============================================================

export const GITHUB_USER = 'Prestondevs';

export const PROJECTS = [
	{
		name: 'iris_lang',
		repo: 'iris_lang',
		year: 2026,
		tags: ['c++', 'compilers'],
		desc: 'my own language. compiles <code>.ir</code> to x86-64 asm, assembles, links, runs. written in C++.',
	},
	{
		name: 'crackme_SBHA16',
		repo: 'crackme_SBHA16',
		year: 2026,
		tags: ['c++', 're', 'crackme'],
		desc: 'crackme built around SBHA (software-based hardware abstraction) + xor decoding. supposed to be painful for static tools.',
	},
	{
		name: 'SBHA_resolver',
		repo: 'SBHA_resolver',
		year: 2026,
		tags: ['re', 'tooling'],
		wip: true,
		desc: 'z3 solver that eats SBHA-obfuscated logic and spits out the key.',
	},
	{
		name: 'bobs_gambling',
		repo: 'crackme_bobsgambling',
		year: 2026,
		tags: ['c++', 'crackme'],
		desc: 'crackme that teaches signed overflow in C++. undefined behavior IS the puzzle.',
	},
	{
		name: 'verysecurelogin',
		repo: 'crackme_verysecurelogin',
		year: 2026,
		tags: ['c#', 'crackme'],
		desc: 'C# gui crackme i wrote for my club.',
	},
	{
		name: 'ss_password_manager',
		repo: 'ss_password_manager',
		year: 2025,
		tags: ['java', 'security'],
		desc: 'password manager in java. simple, secure.',
	},
	{
		name: 'dayzero_bot',
		repo: 'dayzero_discord_bot',
		year: 2026,
		tags: ['python'],
		desc: 'discord bot for my security club. python.',
	},
	{
		name: 'goldbachs',
		repo: 'Goldbachsproposition',
		year: 2025,
		tags: ['math'],
		desc: "breaking goldbach's conjecture.",
	},
];

export const STACK = [
	{ icon: 'devicon-cplusplus-plain', label: 'C++' },
	{ icon: 'devicon-c-plain', label: 'C' },
	{ icon: 'devicon-python-plain', label: 'py' },
	{ icon: 'devicon-java-plain', label: 'java' },
	{ icon: 'devicon-csharp-plain', label: 'C#' },
	{ icon: 'devicon-bash-plain', label: 'bash' },
	{ icon: 'devicon-react-original', label: 'react' },
	{ icon: 'devicon-flask-original', label: 'flask' },
	{ icon: 'devicon-git-plain', label: 'git' },
	{ icon: 'devicon-docker-plain', label: 'docker' },
	{ icon: 'devicon-linux-plain', label: 'linux' },
	{ icon: 'devicon-vim-plain', label: 'vim' },
	{ icon: 'devicon-neovim-plain', label: 'nvim' },
];

export const CERTS = [
	{ name: 'GSEC', span: '2024–2028' },
	{ name: 'GFACT', span: '2023–2027' },
	{ name: 'IT Specialist: Python', span: '2023–2027' },
];

export const COMPS = [
	{ place: '1st', name: 'cyber.org' },
	{ place: '4th', name: 'auburn cyberfire' },
	{ name: 'CCDC ×3' },
	{ name: 'NCL ×2' },
	{ name: 'cyberforce ×2' },
	{ name: 'CTF@CIT' },
	{ name: 'MITRE eCTF' },
	{ name: 'UA CTF' },
	{ name: 'cyberseed' },
	{ name: 'hivestorm' },
];

// extra years to show on the timeline even with no projects
export const TIMELINE_YEARS = [2024, 2023];

// life math
export const BIRTH = new Date('2006-04-23T00:00:00');
export const LIFE_EXPECTANCY = 81;

// background easter egg (your old bgswitch.js, resurrected)
export const BACKGROUNDS = [
	null, // default: no image
	'img/bg/bg.gif',
	'img/bg/Bliss.png',
	'img/bg/Radiance.png',
];
