export default `
customElements.define('typing-text', class extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' }).innerHTML = \`
			<style>
				:host { display: inline-block; }

				.visually-hidden {
					clip-path: inset(50%);
					height: 1px;
					width: 1px;
					margin: -1px;
					overflow: hidden;
					padding: 0;
					position: absolute;
				}

				/* https://css-loaders.com/dots/ */
				.indicator {
					opacity: 0.75;
					display: inline-block;
					width: 2em;
					aspect-ratio: 4;
					--_g: no-repeat radial-gradient(circle closest-side, currentColor 90%, transparent);
					background:
						var(--_g) 0%   50%,
						var(--_g) 50%  50%,
						var(--_g) 100% 50%;
					background-size: calc(100% / 3) 100%;
					animation: flashing-dots 1s infinite linear;
				}

				@keyframes flashing-dots {
					33% { background-size: calc(100%/3) 0%  , calc(100%/3) 100%, calc(100%/3) 100% }
					50% { background-size: calc(100%/3) 100%, calc(100%/3) 0%  , calc(100%/3) 100% }
					66% { background-size: calc(100%/3) 100%, calc(100%/3) 100%, calc(100%/3) 0%   }
				}

				@media (prefers-reduced-motion: reduce) {
					.visually-hidden {
						clip-path: none;
						position: static;
						overflow: visible;
						margin: 0;
						height: auto;
						width: auto;
						opacity: 0.75;
					}

					.indicator { display: none; }
				}
			</style>
			<span class="visually-hidden"><slot>typing</slot></span>
			<span class="indicator"></span>
		\`
	}
})
`
