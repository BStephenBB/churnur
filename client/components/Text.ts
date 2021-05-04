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

type TextProps = { size?: Sizes }
// maybe use 1.5 linexport height
export const Text = styled.div.attrs<TextProps>(({ size }) => ({
  as: size ? DEFAULT_ELEMENT_FOR_SIZE[size] : 'div',
}))<TextProps>`
  font-size: ${({ size, theme }) => theme.text[size ?? 2]};
  line-height: 1.25;
`
