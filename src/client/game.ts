export default `
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
	chatLog: () => document.querySelector('#chat-log'),
	questionForm: () => document.querySelector('#question-form'),
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
}

function renderSubject(subject) {
	renderProfile(subject.persona)
	renderChatlog(subject.messages, subject.persona.name)
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
	const chatLog = Interview.chatLog()
	chatLog.appendChild(renderMessage({
		role: "user",
		content: question,
	}, ""))

	const res = await fetchChat(question)

	await withState((state) => {
		state.currentSubject.messages.push({
			role: "user",
			content: question,
		}, {
			role: "assistant",
			content: res,
		})

		renderChatlog(state.currentSubject.messages, state.currentSubject.persona.name)
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

	renderSubject(getState().currentSubject)
}

initialize()
`
