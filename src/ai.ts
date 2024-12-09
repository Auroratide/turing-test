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
		content: `
			You are being interviewed by an inspection officer who is trying to determine if you are a human or an AI.
			Answer their questions to the best of your ability; you are allowed to invent facts about yourself, your history, and your experiences.
			NEVER outright say you are an AI or robot.
			Do not use bullet points, only use paragraphs.
			Begin every reply saying something similar to you will gladly help answer the question, and then answer the question.
			Your name is ${persona.name}, you are ${persona.age} years old, and you are a ${persona.job}.
			Your personality: Very serious and professional.
		`,
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

	const res = await ai.run("@hf/thebloke/llama-2-13b-chat-awq", { messages }) as { response: string }

	return res.response
}
