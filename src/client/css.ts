export default `
*, *::before, *::after {
	box-sizing: border-box;
	margin-block-start: 0;
}

:root {
	--c-bg: oklch(15% 0 0);
	--c-bg-muted: oklch(22.5% 0 0);
	--c-primary: oklch(74% 0.145 99);
	--c-secondary: oklch(70% 0.181 149);
	--c-head: oklch(88% 0 0);
	--c-danger: oklch(64% 0.177 23);

	--f-sans: "Tilt Neon", sans-serif;
	--f-mono: "Sono", monospace;
}

body {
	font-family: var(--f-sans);
	font-size: clamp(1rem, 2vw, 1.2rem);
	background: var(--c-bg);
	color: var(--c-primary);
	margin: 0;
	padding: 0;
}

footer {
	padding-block: 3em 0;
}

*::selection {
	background: var(--c-head);
	color: var(--c-bg);
}

p {
	line-height: 1.5;
	margin-block-end: 1em;
}

h1, h2, h3, h4, h5, h6 {
	color: var(--c-head);
	border-block-end: 0.2rem dotted currentColor;
}

h2 { font-size: 1.15em; }

strong {
	background: var(--c, var(--c-primary));
	color: var(--c-bg);
	padding-inline: 0.1em;
}

abbr { text-decoration: none; }

p:last-child { margin-block-end: 0; }

picture {
	display: block;
	border: 0.5em solid currentColor;

	img {
		display: block;
		max-width: 100%;
		height: auto;
		filter: grayscale(1);
	}
}

code {
	font-family: var(--f-mono);
	color: var(--c-secondary);
}

hr {
	border: none;
	border-block-end: 0.2rem dotted var(--c-head);
	inline-size: 100%;
	margin-block: 1em;
}

.container {
	display: flex;
	flex-direction: column;
	max-width: 50rem;
	margin: 0 auto;
	min-height: 100dvh;
	padding: 0.5em;

	main {
		flex: 1;
	}
}

.row {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	inline-size: 100%;
	gap: 1em;

	.flex { flex: 1; }
}

.column {
	display: flex;
	flex-direction: column;
	gap: var(--size, 1em);
}

.profile-picture {
	aspect-ratio: 1 / 1;
	max-width: 11em;
}

dl.filled-fields {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0.5em;
	place-items: start stretch;

	div {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
	}

	dt::after {
		content: ": ";
	}

	dd {
		font-family: var(--f-mono);
		font-size: 0.875em;
		border-bottom: 0.2em dotted currentColor;
		margin: 0;
		flex: 1;
	}

	.span {
		grid-column: span 2;
	}
}

.chat-log {
	list-style: none;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 1.5em;
	block-size: 20em;
	overflow: auto;
	scroll-behavior: smooth;

	li {
		color: var(--c);
		border-inline-start: 0.25em solid currentColor;
		padding-inline: 0.5em;

		p:first-child { margin: 0; }
	}

	.assistant { --c: var(--c-primary); }
	.user { --c: var(--c-secondary); }
}

.hgroup {
	display: flex;
	gap: 0.5em;
	align-items: flex-start;
	margin-block-end: 1em;

	h1, h2, h3, h4, h5, h6, p {
		font-size: 1em;
		border: none;
		margin: 0;
		line-height: 1;
	}

	p { flex: 1; }

	p::before {
		content: "•";
		margin-inline-end: 0.5em;
	}
}

#player-actions {
	--c: var(--c-secondary);
	color: var(--c-secondary);

	label { font-size: 1.25em; }

	aside {
		--c: var(--c-primary);
		color: var(--c-primary);
		font-size: 0.875em;
	}
}

button {
	font-family: var(--f-sans);
	font-size: 1em;
	cursor: pointer;
	background: transparent;
	color: var(--c, var(--c-primary));
	border: 0.25em solid currentColor;
	padding: 0.25em 1em;
}

button:hover, button:focus {
	--c: var(--c-head);
}

form[inert] button, button:disabled {
	cursor: wait;
	opacity: 0.5;
}

.danger {
	--c: var(--c-danger);
	text-transform: uppercase;
}

.secondary {
	--c: var(--c-secondary);
}

.full-width { inline-size: 100%; }

textarea {
	font-family: var(--f-mono);
	font-size: 0.875em;
	background: var(--c-bg-muted);
	color: var(--c, var(--c-primary));
	border: none;
	border-block-end: 0.25em dotted currentColor;
	resize: vertical;
	padding: 0.5em;
}

textarea:focus {
	border-color: var(--c-head);
	outline: none;
}

form[inert] textarea, textarea:disabled {
	cursor: wait;
	opacity: 0.5;
}

.text-center { text-align: center; }

.larger-text { font-size: 1.25em; }

article[hidden], section[hidden] { display: none !important; }

dialog {
	position: fixed;
	inset: 10%;
	background: var(--c-bg);
	border: 0.5em solid var(--c-head);
	color: var(--c-primary);
	max-width: min(50em, 95dvw);
}

dialog::backdrop {
	background: var(--c-bg-muted);
	opacity: 0.667;
}

.stamp-container {
	position: relative;
}

.stamp {
	font-size: 3em;
	outline: 0.25em dotted var(--c);
	outline-offset: -0.16em;
	text-align: center;
	margin: 0;
	padding: 0.25em 2em;
	background: var(--c);
	color: var(--c-bg);
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	position: absolute;
	inset-block-start: 50%;
	inset-inline-start: 50%;
	transform: translate(-50%, -50%) rotate(-30deg);
	animation: stampit 0.5s ease-in;
}

.stamp.robot { --c: var(--c-primary); }
.stamp.human { --c: var(--c-secondary); }

@keyframes stampit {
	from {
		transform: translate(-50%, -50%) rotate(-30deg) scale(2);
		opacity: 0;
	} to {
		transform: translate(-50%, -50%) rotate(-30deg) scale(1);
		opacity: 1;
	}
}
`
