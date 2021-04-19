import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
	*,
	*:before,
	*:after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		-webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
	}

	input,
	select,
	textarea {
		font:inherit;
	}

	body {
		color: ${(props) => props.theme.color.text};
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}

	button {
		cursor: pointer;
	}
`
