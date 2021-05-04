import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
	@font-face {
		font-family: 'Inter';
		src: url('/fonts/Inter.var.woff2') format('woff2');
		font-display: swap;
	}

	*,
	*:before,
	*:after {
		position: relative;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		-webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
	}

	html, body, #__next, #overlay-provider {
		height: 100%;
	}

	body {
		color: ${(props) => props.theme.color.text};
		font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif;
	}

	a {
		text-decoration: none;
	}

	button,
	input,
	select,
	textarea {
		font:inherit;
	}

	button {
		cursor: pointer;
		background: none;
		border: none;
	}
`
