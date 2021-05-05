import styled, { DefaultTheme } from 'styled-components'
import type { StyledComponentProps, StyledComponent } from 'styled-components'
import type { ComponentType } from 'react'

// TODO use react-aria for this

const Wrapper = styled.div`
  display: flex;
  height: ${({ theme }) => theme.space(10)};
  border-radius: 4px;
  width: ${({ theme }) => theme.space(48)};
`
const Box = styled.div`
  width: ${({ theme }) => theme.space(8)};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.color.gray1};
  color: ${({ theme }) => theme.color.gray6};
  border-top: 1px solid ${({ theme }) => theme.color.gray3};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray3};
  border-left: 1px solid ${({ theme }) => theme.color.gray3};
  height: 100%;
  flex-shrink: 0;
  border-radius: 4px 0 0 4px;
  font-variation-settings: 'wght' 550;
  font-size: ${({ theme }) => theme.text['1']};
`

export enum InputTypes {
  DOLLAR = 'DOLLAR',
  TEXT = 'TEXT',
  DATE = 'DATE',
}

export const Input_ = (
  props: StyledComponentProps<
    'input',
    DefaultTheme,
    { type?: InputTypes },
    never
  >
) => {
  const { type, ...rest } = props
  let acctualType = type ?? InputTypes.TEXT
  return (
    <Wrapper>
      {acctualType === InputTypes.TEXT ? null : <Box>$</Box>}
      <Input {...rest} hasBox={acctualType !== InputTypes.TEXT} />
    </Wrapper>
  )
}
// TODO disabled state
export const Input = styled.input<{ hasBox: boolean }>`
  display: block;
  flex-grow: 0;
  min-width: 0;
  height: ${({ theme }) => theme.space(10)};
  border-radius: ${({ hasBox }) => (hasBox ? '0 4px 4px 0' : '4px')};
  border: 1px solid ${({ theme }) => theme.color.gray3};
  padding: 0 ${({ theme }) => theme.space(3)};
  outline: none !important;
  transition: 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.color.blue3};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.color.blue4 + '40'};
  }
`
