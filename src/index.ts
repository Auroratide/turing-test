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
import css from "./css.js"
import html from "./site.js"
import notFoundHtml from "./404.js"

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

export default {
	async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(req.url)
		console.log(url)

		if (url.pathname === "/") {
			return website()
		}

		if (url.pathname === "/styles.css") {
			return styles()
		}
		// const ai = new Ai(env.AI)

		// const response = await ai.run("@cf/meta/llama-2-7b-chat-int8", {
		// 	prompt: "What is the origin of the phrase Hello, World",
		// })

		// ai.run("",)

		// return new Response(JSON.stringify(response))

		return notFound()
	},
}
