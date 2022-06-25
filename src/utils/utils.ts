export function uid() {
	let rando = new Uint32Array(3);
	window.crypto.getRandomValues(rando);
	return (
		performance.now().toString(36) +
		Array.from(rando)
			.map(val => val.toString(36))
			.join("")
	).replace(/\./g, "");
}
