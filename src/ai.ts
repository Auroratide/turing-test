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
			console.log(`CHANGED NAME FROM ${persona.name} TO ${aiIdeas.name}`)
			persona.name = aiIdeas.name
			persona.notes = aiIdeas.notes
		}
	} catch (e) {}

	return persona
}
