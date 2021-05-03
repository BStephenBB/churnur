import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
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
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}

	a {
		text-decoration: none;
	}

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
