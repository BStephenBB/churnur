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

const WEIGHT_TO_SIZE: Record<keyof typeof WEIGHTS, string> = {
  [WEIGHTS.light]: '300',
  [WEIGHTS.default]: '400',
  [WEIGHTS.medium]: '550',
  [WEIGHTS.bold]: '600',
  [WEIGHTS.heavy]: '650',
}

// TODO weight and align; make good

type TextProps = {
  size?: Sizes
  mdSize?: Sizes
  weight?: keyof typeof WEIGHTS
  align?: string
  as?: string
}

// maybe use 1.5 linexport height
export const Text = styled.div.attrs<TextProps>(({ size, as }) => ({
  // TODO add more logic to still allow `as` to override?
  as: as ? as : DEFAULT_ELEMENT_FOR_SIZE[size ?? 2],
}))<TextProps>`
  font-size: ${({ size, theme }) => theme.text[size ?? 2]};
  line-height: 1.25;
  text-align: ${(props) => (props.align ? 'center' : undefined)};
  font-variation-settings: 'wght'
    ${({ weight }) =>
      weight ? WEIGHT_TO_SIZE[weight] : WEIGHT_TO_SIZE.default};

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    font-size: ${({ mdSize, theme }) =>
      mdSize ? theme.text[mdSize] : undefined};
  }
`
