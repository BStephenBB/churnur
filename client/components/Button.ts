import styled from 'styled-components'

// TODO use react aria button
export const Button = styled.button`
  flex-grow: 0;
  height: ${({ theme }) => theme.space(10)};
  padding: ${({ theme }) => theme.space3};
  border-radius: 4px;
  display: flex;
  font-variation-settings: 'wght' 650;
  align-items: center;
  background: ${({ theme }) => theme.color.blue6};
  box-shadow: 0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%);
  color: ${({ theme }) => theme.color.white};
  letter-spacing: 0.025em;
  transition: all 0.15s ease;
  outline: 0 !important;
  &:hover {
    background: ${({ theme }) => theme.color.blue5};
    transform: translateY(-1px);
  }
  &:disabled {
    background: rgba(0, 0, 0, 0.1);
    cursor: not-allowed;
  }
`
