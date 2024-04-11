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

		<link rel="stylesheet" href="/styles.css" />

		<link rel="stylesheet" href="https://unpkg.com/@auroratide/typewritten-text/lib/style.css" />
		<script type="module" src="https://unpkg.com/@auroratide/typewritten-text/lib/define.js"></script>
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
