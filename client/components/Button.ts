import styled from 'styled-components'

// TODO other button states and disabled state
const BUTTON_TYPES = {
  PRIMARY: {
    colors: {
      default: {
        background: 'blue6',
        text: 'white',
      },
      hover: {
        background: 'blue5', // hover and focus will always be same for now
      },
      pressed: {
        background: 'blue7',
      },
    },
  },
  DEFAULT: {
    colors: {
      default: {
        background: 'gray1',
        text: 'gray5',
      },
      hover: {
        background: 'gray2', // hover and focus will always be same for now
      },
      pressed: {
        background: 'gray3',
      },
    },
  },
  // OUTLINE: 'OUTLINE',
  // DANGER: 'DANGER',
} as const

// height 36px is a good default size probably

// TODO use react aria button
export const Button = styled.button<{ variant?: keyof typeof BUTTON_TYPES }>`
  flex-grow: 0;
  height: ${({ theme }) => theme.space(10)};
  padding: ${({ theme }) => theme.space3};
  border-radius: 4px;
  display: flex;
  font-variation-settings: 'wght' 650;
  align-items: center;
  background: ${({ theme, variant }) =>
    theme.color[BUTTON_TYPES[variant ?? 'DEFAULT'].colors.default.background]};
  box-shadow: 0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%);
  color: ${({ theme, variant }) =>
    theme.color[BUTTON_TYPES[variant ?? 'DEFAULT'].colors.default.text]};
  letter-spacing: 0.025em;
  transition: all 0.15s ease;
  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    background: ${({ theme, variant }) =>
      theme.color[BUTTON_TYPES[variant ?? 'DEFAULT'].colors.hover.background]};
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgb(50 50 93 / 10%), 0 3px 6px rgb(0 0 0 / 8%);
  }
  &:active {
    background: ${({ theme, variant }) =>
      theme.color[
        BUTTON_TYPES[variant ?? 'DEFAULT'].colors.pressed.background
      ]};
    transform: translateY(1px);
    box-shadow: 0 6px 12px -2px rgb(50 50 93 / 25%),
      0 3px 7px -3px rgb(0 0 0 / 30%);
  }
  &:disabled {
    background: ${({ theme }) => theme.color.gray3};
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`
