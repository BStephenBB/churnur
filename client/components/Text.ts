import styled from 'styled-components'

type Sizes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

// TODO think about these
const DEFAULT_ELEMENT_FOR_SIZE: Record<Sizes, string> = {
  0: 'div',
  1: 'div',
  2: 'div',
  3: 'h5',
  4: 'h4',
  5: 'h3',
  6: 'h2',
  7: 'h1',
} as const

const WEIGHTS = {
  light: 'light',
  default: 'default',
  medium: 'medium',
  bold: 'bold',
  heavy: 'heavy',
} as const

// TODO weight and align; make good

type TextProps = { size?: Sizes; weight?: keyof typeof WEIGHTS; align?: string }

// maybe use 1.5 linexport height
// TODO add weight
export const Text = styled.div.attrs<TextProps>(({ size }) => ({
  // TODO add more logic to still allow `as` to override?
  as: size ? DEFAULT_ELEMENT_FOR_SIZE[size] : 'div',
}))<TextProps>`
  font-size: ${({ size, theme }) => theme.text[size ?? 2]};
  line-height: 1.25;
  text-align: ${(props) => (props.align ? 'center' : undefined)};
`
