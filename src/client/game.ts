export default `
const MAX_QUESTIONS = 5

let state = {
	player: {
		name: "981237",
	},
	currentSubject: {
		persona: {
			id: "asdasd",
			name: "Esprie",
			age: 25,
			height: "5' 2\\"",
			sex: "Female",
			dob: "2084-06-14",
			job: "Soldier",
			notes: "None",
			personality: "A bit reserved. Believes making every sentence a maximum of seven words makes her sound more like an AI.",
		},
		messages: [ {
			role: "assistant",
			content: "Hello, I am Esprie, a 25-year-old female soldier. I am here to assist you with your inspection.",
		}, {
			role: "user",
			content: "Tell me about your job as a soldier.",
		}, {
			role: "assistant",
			content: "Can we talk about something else?",
		} ],
	},
}

async function withState(fn) {
	const s = structuredClone(state)
	await fn(s)
	state = structuredClone(s)
}

function getState() {
	return structuredClone(state)
}

async function wait(seconds) {
	await new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

const Profile = {
	name: () => document.querySelector('#profile-name'),
	id: () => document.querySelector('#profile-id'),
	age: () => document.querySelector('#profile-age'),
	height: () => document.querySelector('#profile-height'),
	dob: () => document.querySelector('#profile-dob'),
	job: () => document.querySelector('#profile-job'),
	notes: () => document.querySelector('#profile-notes'),
}

const Interview = {
	section: () => document.querySelector('#player-actions'),
	chatLog: () => document.querySelector('#chat-log'),
	questionForm: () => document.querySelector('#question-form'),
	questionsRemaining: () => document.querySelector('#questions-remaining'),
	endInterview: () => document.querySelector('#end-interview'),
}

const Verdict = {
	section: () => document.querySelector('#verdict'),
	dialog: () => document.querySelector('#verdict-result'),
	robot: () => document.querySelector('#robot-verdict'),
	human: () => document.querySelector('#human-verdict'),
	nextSubject: () => document.querySelector('#next-subject'),
	stamp: () => document.querySelector('#verdict-stamp'),
}

function getQuestionsRemaining(messages) {
	return MAX_QUESTIONS - messages.filter((it) => it.role === "user").length
}

function renderProfile(persona) {
	Profile.name().textContent = persona.name
	Profile.id().textContent = persona.id
	Profile.age().textContent = persona.age
	Profile.height().textContent = persona.height
	Profile.dob().textContent = persona.dob
	Profile.job().textContent = persona.job
	Profile.notes().textContent = persona.notes
}

function renderMessage(message, personaName) {
	const li = document.createElement('li')
	li.classList.add(message.role)
	li.innerHTML = \`
		<p><strong>\${message.role === "assistant" ? personaName : "You"}</strong></p>
		<p>\${message.content}</p>
	\`

	return li
}

function renderChatlog(messages, personaName) {
	const chatLog = Interview.chatLog()
	chatLog.innerHTML = ''
	messages.forEach((message) => {
		chatLog.appendChild(renderMessage(message, personaName))
	})

	chatLog.scrollTop = chatLog.scrollHeight
	renderQuestionsRemaining(messages)
}

function renderQuestionsRemaining(messages) {
	Interview.questionsRemaining().textContent = MAX_QUESTIONS - messages.filter((it) => it.role === "user").length
}

function renderSubject(subject) {
	renderProfile(subject.persona)
	renderChatlog(subject.messages, subject.persona.name)
}

function endInterview() {
	Interview.section().hidden = true
	Interview.section().inert = true
	Verdict.section().hidden = false
}

function renderVerdict(verdict) {
	Verdict.dialog().showModal()
	Verdict.stamp().textContent = verdict
	Verdict.stamp().classList.remove("robot", "human")
	Verdict.stamp().classList.add(verdict)
}

async function fetchChat(newMessage) {
	const state = getState()
	const res = await fetch("/chat", {
		method: "POST",
		body: JSON.stringify({
			persona: state.currentSubject.persona,
			previousMessages: state.currentSubject.messages,
			newMessage: newMessage,
		})
	})
	const json = await res.json()
	return json.response
}

async function submitQuestion(question) {
	Interview.questionForm().inert = true
	const chatLog = Interview.chatLog()

	await withState((state) => {
		state.currentSubject.messages.push({
			role: "user",
			content: question,
		})
		renderChatlog(state.currentSubject.messages, state.currentSubject.persona.name)
	})

	await wait(1)
	chatLog.appendChild(renderMessage({
		role: "assistant",
		content: "<typing-text>typing</typing-text>",
	}, getState().currentSubject.persona.name))
	chatLog.scrollTop = chatLog.scrollHeight

	const res = await fetchChat(question)

	Interview.questionForm().inert = false

	await withState((state) => {
		state.currentSubject.messages.push({
			role: "assistant",
			content: res,
		})

		renderChatlog(state.currentSubject.messages, state.currentSubject.persona.name)

		if (getQuestionsRemaining(state.currentSubject.messages) <= 0) {
			endInterview()
		}
	})
}

function initialize() {
	Interview.questionForm().addEventListener('submit', async (e) => {
		e.preventDefault()
		const form = new FormData(Interview.questionForm())
		const question = form.get('interview-question')
		e.target.reset()

		submitQuestion(question)
	})

	Interview.endInterview().addEventListener('click', endInterview)
	Verdict.robot().addEventListener("click", () => renderVerdict("robot"))
	Verdict.human().addEventListener("click", () => renderVerdict("human"))

	renderSubject(getState().currentSubject)
}

initialize()
`
