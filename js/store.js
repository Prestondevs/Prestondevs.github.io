// store.js — tiny safe wrapper around localStorage.
// Everything degrades gracefully if storage is unavailable.

export function load(key, fallback = null) {
	try {
		const raw = localStorage.getItem(key);
		return raw === null ? fallback : JSON.parse(raw);
	} catch {
		return fallback;
	}
}

export function save(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		/* storage unavailable — fine */
	}
}
