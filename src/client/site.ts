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

		<script type="module" src="/custom-elements.js"></script>
	</head>
	<body>
		<div class="container">
			<header class="hgroup">
				<h1>Turing Test</h1>
				<p>A game about identifying humans and robots.</p>
			</header>
			<main>
				<article id="intro-card">
					<section id="intro-card-01">
						<h2>Can you distinguish humans from robots?</h2>
						<p>It's the year 2084. 10 years have passed since the start of the AI War.</p>
						<p><strong class="secondary">Humans</strong> have been forced to disguise themselves as robots to survive.</p>
						<p><strong>Robots</strong> have adapted to act more like humans to avoid detection.</p>
						<p>It is up to you to tell the difference. Are you up to the task?</p>
						<button class="next-page">Start Game</button>
					</section>
					<dialog id="intro-card-dialog">
						<div class="row">
							<div>
								<picture class="profile-picture">
									<img src="https://auroratide.com/assets/art/esprie/cover.png" alt="Subject Portrait" />
								</picture>
							</div>
							<div class="flex">
								<section id="intro-card-02">
									<h2>Welcome.</h2>
									<p><typewritten-text type-speed="30" paused>Hello Officer {EMPLOYEE_NUM}. Welcome to your first day as a <code>DISCERNMENT OFFICER</code>. As you may know, this job was invented to prevent civilian deaths during the AI War. For the safety of us all, it is imperitive that you use your inferential skills to identify any robots in our most ambiguous cases.</typewritten-text></p>
									<button class="next-page">How does my job work?</button>
								</section>
								<section id="intro-card-03" hidden>
									<h2>Being an indentification specialist.</h2>
									<p><typewritten-text type-speed="30" paused>You will interview subjects one at a time about any matters you deem appropriate.</typewritten-text></p>
									<p><typewritten-text type-speed="30" paused>Ask them questions about their background, their hobbies, their beliefs. Pick apart their testimony to find any tell-tale signs of them being a human or robot.</typewritten-text></p>
									<p><typewritten-text type-speed="30" paused>You can even ask them to draw if it helps.</typewritten-text></p>
									<button class="next-page">How do I know if the subject is a robot?</button>
								</section>
								<section id="intro-card-04" hidden>
									<h2>Identifying robots and humans.</h2>
									<p><typewritten-text type-speed="30" paused>That's precisely why we hired you. Use your intuition and experience to make the right judgement.</typewritten-text></p>
									<p><typewritten-text type-speed="30" paused>After <code>three</code> subjects, we will cross-examine your findings and provide feedback. Good luck, Officer {EMPLOYEE_NUM}.</typewritten-text></p>
									<button class="next-page">Let's get started.</button>
								</section>
							</div>
						</div>
					</dialog>
				</article>
				<article id="subject" class="column" style="--size: 2em;" hidden>
					<section id="profile">
						<h2>Subject Profile</h2>
						<div class="row">
							<dl class="flex filled-fields">
								<div>
									<dt>Name</dt>
									<dd id="profile-name">Esprie</dd>
								</div>
								<div>
									<dt>ID</dt>
									<dd id="profile-id">JASKI-18003</dd>
								</div>
								<div>
									<dt>Age</dt>
									<dd id="profile-age">25</dd>
								</div>
								<div>
									<dt>Height</dt>
									<dd id="profile-height">5' 2"</dd>
								</div>
								<div>
									<dt><abbr title="Date of Birth">DOB</abbr></dt>
									<dd id="profile-dob"><time>2084-06-14</time></dd>
								</div>
								<div>
									<dt>Job</dt>
									<dd id="profile-job">Soldier</dd>
								</div>
								<div class="span">
									<dt>Notes</dt>
									<dd id="profile-notes">Arbitrary notes</dd>
								</div>
							</dl>
							<picture class="profile-picture">
								<img src="https://auroratide.com/assets/art/esprie/cover.png" alt="Subject Portrait" />
							</picture>
						</div>
					</section>
					<section id="interview-log">
						<h2>Interview Log</h2>
						<ol id="chat-log" class="chat-log">
							<li class="assistant">
								<p><strong>Esprie</strong></p>
								<p>This is some kind of response.</p>
							</li>
							<li class="user">
								<p><strong>You</strong></p>
								<p>This is was my question?</p>
							</li>
							<li class="assistant">
								<p><strong>Esprie</strong></p>
								<p>Well, I don't know about that.</p>
							</li>
						</ol>
					</section>
					<section id="player-actions" class="column">
						<form id="question-form" class="column">
							<div class="row">
								<label for="interview-question"><abbr title="Question">Q</abbr>:</label>
								<textarea id="interview-question" name="interview-question" class="flex" placeholder="Type your question here..." rows="2"></textarea>
								<button type="submit">Ask</button>
							</div>
							<div class="row">
								<p class="flex text-center larger-text"><span id="questions-remaining">5</span> questions remaining</p>
								<button id="end-interview" type="button" class="flex danger">End Interview</button>
							</div>
						</form>
					</section>
					<section id="verdict" hidden>
						<h2>Make a decision</h2>
						<div class="larger-text">
							<p>Based on the interview, is the subject a <strong>robot</strong> or <strong class="secondary">human</strong>?</p>
							<div class="row">
								<button id="robot-verdict" class="flex">Robot</button>
								<button id="human-verdict" class="flex secondary">Human</button>
							</div>
						</div>
					</section>
					<dialog id="verdict-result">
						<div class="column">
							<div class="stamp-container">
								<picture>
									<img src="https://auroratide.com/assets/art/esprie/cover.png" alt="Subject Portrait" />
								</picture>
								<p id="verdict-stamp" class="stamp robot">Robot</p>
							</div>
							<form method="dialog">
								<button id="next-subject" autofocus>Next Subject</button>
							</form>
						</div>
					</dialog>
				</article>
			</main>
			<footer>
				<p><small>&copy; 2024 Timothy Foster, Auroratide (all rights reserved)</small></p>
			</footer>
		</div>

		<script src="/game.js"></script>
	</body>
</html>
`
