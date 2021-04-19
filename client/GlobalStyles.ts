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
		background: blue;
	}

	button {
		cursor: pointer;
	}
`
