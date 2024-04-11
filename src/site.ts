export default `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="author" content="Timothy Foster, Auroratide" />
		<meta name="description" content="A game about identifying humans and robots" />
		<title>Turing Test | A game about identifying humans and robots</title>

		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link href="https://fonts.googleapis.com/css2?family=Sono:wght@200..800&family=Tilt+Neon&display=swap" rel="stylesheet" />

		<link rel="stylesheet" href="https://unpkg.com/@auroratide/typewritten-text/lib/style.css" />
		<script type="module" src="https://unpkg.com/@auroratide/typewritten-text/lib/define.js"></script>

		<style>
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
				gap: 1em;
			}

			#profile picture {
				aspect-ratio: 1 / 1;
				max-width: 12.5em;
				border: 0.5em solid currentColor;
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

				li {
					color: var(--c);
					border-inline-start: 0.25em solid currentColor;
					padding-inline: 0.5em;

					p:first-child { margin: 0; }
				}

				.them { --c: var(--c-primary); }
				.you { --c: var(--c-secondary); }
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

			.danger {
				--c: var(--c-danger);
				text-transform: uppercase;
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
		</style>
	</head>
	<body>
		<div class="container">
			<header class="hgroup">
				<h1>Turing Test</h1>
				<p>A game about identifying humans and robots.</p>
			</header>
			<main>
				<article id="intro-card" hidden>
					<section id="intro-card-01">
						<h2>Turing Test</h2>
						<p>A game about identifying humans and robots.</p>
						<button class="next-page">Start Game</button>
					</section>
					<section id="intro-card-02" hidden>
						<h2>Welcome.</h2>
						<p><typewritten-text type-speed="30" paused>Hello Employee {EMPLOYEE_NUM}. Welcome to your first day as a <code>HUMAN/ROBOT IDENTIFICATION SPECIALIST</code>. As you may know, this job was invented to prevent civilian deaths during the AI War. For the safety of us all, it is imperitive that you use your inferential skills to identify any robots in our most ambiguous cases.</typewritten-text></p>
						<button class="next-page">How does my job work?</button>
					</section>
					<section id="intro-card-03" hidden>
						<h2>Being an indentification specialist.</h2>
						<p><typewritten-text type-speed="30" paused>You will interview subjects one at a time about any matter you deem appropriate.</typewritten-text></p>
						<p><typewritten-text type-speed="30" paused>Since you have just started, we will cross-examine some of your submissions blah blah</typewritten-text></p>
						<button class="next-page">How do I know if the subject is a robot?</button>
					</section>
					<section id="intro-card-04" hidden>
						<h2>Identifying robots and humans.</h2>
						<p><typewritten-text type-speed="30" paused>That's precisely why we hired you, Employee {EMPLOYEE_NUM}. Use your intuition and experience to make the right judgement.</typewritten-text></p>
						<button class="next-page">Let's get started.</button>
					</section>
				</article>
				<article class="column">
					<section id="profile">
						<h2>Subject Profile</h2>
						<div class="row">
							<dl class="flex filled-fields">
								<div>
									<dt>Name</dt>
									<dd>Esprie</dd>
								</div>
								<div>
									<dt>ID</dt>
									<dd>JASKI-18003</dd>
								</div>
								<div>
									<dt>Height</dt>
									<dd>5' 2"</dd>
								</div>
								<div>
									<dt>Weight</dt>
									<dd>100 lbs</dd>
								</div>
								<div>
									<dt><abbr title="Date of Birth">DOB</abbr></dt>
									<dd><time>2084-06-14</time></dd>
								</div>
								<div>
									<dt>Occupation</dt>
									<dd>Soldier</dd>
								</div>
								<div class="span">
									<dt>Notes</dt>
									<dd>Arbitrary notes</dd>
								</div>
							</dl>
							<picture>
								<img src="https://auroratide.com/assets/art/esprie/cover.png" alt="Subject Portrait" />
							</picture>
						</div>
					</section>
					<section id="interview-log">
						<h2>Interview Log</h2>
						<ol class="chat-log">
							<li class="them">
								<p><strong>Esprie</strong></p>
								<p>This is some kind of response.</p>
							</li>
							<li class="you">
								<p><strong>You</strong></p>
								<p>This is was my question?</p>
							</li>
							<li class="them">
								<p><strong>Esprie</strong></p>
								<p>Well, I don't know about that.</p>
							</li>
						</ol>
					</section>
					<section id="player-actions" class="column">
						<form class="column">
							<div class="row">
								<label for="interview-question"><abbr title="Question">Q</abbr>:</label>
								<textarea id="interview-question" name="interview-question" class="flex" placeholder="Type your question here..." rows="2"></textarea>
								<button type="submit">Ask</button>
							</div>
							<div class="row">
								<button type="button" class="full-width danger">End Interview</button>
							</div>
						</form>
						<aside>
							<p>Example questions to help start the interview:</p>
							<div class="two-columns">
								<button class="sample-question">What is your favorite color?</button>
								<button class="sample-question">What is your favorite color?</button>
								<button class="sample-question">What is your favorite color?</button>
								<button class="sample-question">What is your favorite color?</button>
							</div>
						</aside>
					</section>
				</article>
			</main>
			<footer>
				<p><small>&copy; 2024 Timothy Foster, Auroratide (all rights reserved)</small></p>
			</footer>
		</div>

		<script>
			function transition(from, to) {
				from.toggleAttribute('hidden', true)
				to.removeAttribute('hidden')
				to.querySelector('typewritten-text')?.type()
			}

			const Intro = {
				card: () => document.querySelector('#intro-card'),
				p1: () => document.querySelector('#intro-card-01'),
				p2: () => document.querySelector('#intro-card-02'),
				p3: () => document.querySelector('#intro-card-03'),
				p4: () => document.querySelector('#intro-card-04'),
				nextButton: (page) => page.querySelector('.next-page'),
			}

			// Intro.card().removeAttribute('hidden')
			Intro.nextButton(Intro.p1()).addEventListener('click', () => transition(Intro.p1(), Intro.p2()))
			Intro.nextButton(Intro.p2()).addEventListener('click', () => transition(Intro.p2(), Intro.p3()))
			Intro.nextButton(Intro.p3()).addEventListener('click', () => transition(Intro.p3(), Intro.p4()))
		</script>
	</body>
</html>

`
