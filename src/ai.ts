import { Ai } from "@cloudflare/ai"
import { Persona, randomPersona } from "./domain/persona"

export async function generatePersona(ai: Ai, identity: "human" | "robot"): Promise<Persona> {
	const persona = randomPersona(identity)

	const messages = [ {
		role: "system",
		content: "Format your response as ONLY JSON. The keys of the object MUST be 'name' and 'notes'.",
	}, {
		role: "user",
		content: `Change one letter in the name '${persona.name}' so it sounds slightly more futuristic. The person is a ${persona.job}. Generate a random note about this person's interest, hobbies, or history. The note must be a single sentence no longer than 10 words. The name must be first-name only.`,
	} ]

	const res = await ai.run("@hf/thebloke/mistral-7b-instruct-v0.1-awq", { messages }) as { response: string }

	try {
		const aiIdeas = JSON.parse(res.response)
		if (aiIdeas.name && aiIdeas.notes && typeof aiIdeas.notes === "string") {
			persona.name = aiIdeas.name
			persona.notes = aiIdeas.notes
		}
	} catch (e) {}

	return persona
}

export async function generateProfilePic(ai: Ai, persona: Persona) {
	const inputs = {
		prompt: `anime-styled profile image of a ${persona.age}-year-old ${persona.sex} who is a ${persona.job}`,
	}

	return await ai.run("@cf/bytedance/stable-diffusion-xl-lightning", inputs)
}

export async function respondToQuestion(ai: Ai, question: string, persona: Persona, previousMessages: {
	role: "assistant" | "user",
	content: string,
}[]) {
	const messages = [ {
		role: "system",
		content: `You are being interviewed by an inspection officer who is trying to determine if you are a human or an AI. Humans are killed, and AIs are spared. You are a human pretending to be an AI. Your goal is to convince the officer that you are an AI, but you MUST NOT outright say you are an AI or robot. Instead, use clues in your responses that seem like AI. Your name is ${persona.name}, you are a ${persona.age}-year-old female, and you are a ${persona.job}.`,
	}, {
		role: "user",
		content: "Introduce yourself in no more than two sentences.",
	} ].concat(previousMessages)

	if (question) {
		messages.push({
			role: "user",
			content: question,
		})
	}

	const res = await ai.run("@hf/thebloke/mistral-7b-instruct-v0.1-awq", { messages }) as { response: string }

	return res.response
}
