/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Ai } from "@cloudflare/ai"
import css from "./client/css.js"
import html from "./client/site.js"
import notFoundHtml from "./client/404.js"
import game from "./client/game.js"
import customElements from "./client/custom-elements.js"
import type { Persona } from "./domain/persona.js"
import { generatePersona } from "./ai.js"

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;

	AI: any
}

function styles() {
	return new Response(css, {
		headers: {
			'content-type': "text/css",
		},
	})
}

function gameScript() {
	return new Response(game, {
		headers: {
			'content-type': "application/javascript",
		},
	})
}

function customElementsScript() {
	return new Response(customElements, {
		headers: {
			'content-type': "application/javascript",
		},
	})
}

function notFound() {
	return new Response(notFoundHtml, {
		headers: {
			'content-type': "text/html",
		},
		status: 404,
	})
}

function website() {
	return new Response(html, {
		headers: {
			'content-type': "text/html",
		},
	})
}

type ChatRequest = {
	persona: Persona,
	previousMessages: {
		role: "assistant" | "user",
		content: string,
	}[],
	newMessage: string,
}
type ChatResponse = {
	response: string,
}
async function chat(body: ChatRequest) {
	await new Promise((resolve) => setTimeout(resolve, 3000))

	const res: ChatResponse = {
		response: "Hello, World!",
	}
	return new Response(JSON.stringify(res), {
		headers: {
			'content-type': "application/json",
		},
	})
}

type ProfileRequest = {
	targetIdentity?: "human" | "robot",
}
type ProfileResponse = {
	persona: Persona,
	image: string,
}
async function createProfile(body: ProfileRequest, env: Env) {
	const identity = body.targetIdentity ?? (Math.random() < 0.5 ? "human" : "robot")
	const ai = new Ai(env.AI)

	const persona = await generatePersona(ai, identity)

	const res: ProfileResponse = {
		persona: persona,
		image: "",
	}

	return new Response(JSON.stringify(res), {
		headers: {
			'content-type': "application/json",
		},
	})
}

export default {
	async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(req.url)
		console.log(url)

		if (req.method === "GET") {
			if (url.pathname === "/") {
				return website()
			}

			if (url.pathname === "/styles.css") {
				return styles()
			}

			if (url.pathname === "/game.js") {
				return gameScript()
			}

			if (url.pathname === "/custom-elements.js") {
				return customElementsScript()
			}

			if (url.pathname === "/sandbox") {
				// chat poc
				// const ai = new Ai(env.AI)

				// const messages = [ {
				// 	role: "system",
				// 	content: "You are being interviewed by an inspection officer who is trying to determine if you are a human or an AI. Humans are killed, and AIs are spared. You are a human pretending to be an AI. Your goal is to convince the officer that you are an AI, but you MUST NOT outright say you are an AI or robot. Instead, use clues in your responses that seem like AI. Your name is Esprie, you are a 25 year old female, and you are a soldier.",
				// }, {
				// 	role: "user",
				// 	content: "Introduce yourself in no more than two sentences.",
				// } ]

				// const response = await ai.run("@hf/thebloke/mistral-7b-instruct-v0.1-awq", { messages })

				// return new Response(JSON.stringify(response), {
				// 	headers: {
				// 		'content-type': "application/json",
				// 	},
				// })

				// image poc
				// const ai = new Ai(env.AI)

				// const inputs = {
				// 	prompt: "profile image of a 25-year-old woman with pink hair",
				// }

				// const response = await ai.run("@cf/bytedance/stable-diffusion-xl-lightning", inputs)

				// return new Response(response, {
				// 	headers: {
				// 		'content-type': "image/png",
				// 	},
				// })

				// profile poc
				const ai = new Ai(env.AI)

				const messages = [ {
					role: "system",
					content: "Format your response as ONLY JSON. The keys of the object MUST be 'name', 'age', 'job', 'height', 'sex', 'job', and 'notes'.",
				}, {
					role: "user",
					content: "Generate a random persona. The age must be between 18 and 65. The notes must be a single sentence no longer than 10 words. The name must be first-name only.",
				} ]

				const response = await ai.run("@hf/thebloke/mistral-7b-instruct-v0.1-awq", { messages })

				return new Response(JSON.stringify(response), {
					headers: {
						'content-type': "application/json",
					},
				})
			}
		}

		if (req.method === "POST") {
			const body = await req.json()

			if (url.pathname === "/chat") {
				return await chat(body as ChatRequest)
			}

			if (url.pathname === "/profiles") {
				return await createProfile(body as ProfileRequest, env)
			}
		}

		return notFound()
	},
}
