import styled from 'styled-components'

// TODO use react aria button
export const Button = styled.button`
  padding: 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};
`
