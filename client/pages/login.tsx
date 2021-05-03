import Link from 'next/link'
import styled from 'styled-components'
import { GoogleIcon } from '../icons'

const GoogleButton = styled.a`
  background: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};
  font-size: 25px;
  font-weight: 500;
  border-radius: 8px;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 12px 12px;

  & svg {
    margin-right: 12px;
  }
`

export default function Dashboard() {
  return (
    <div>
      <Link href="/">home</Link>
      <GoogleButton href="http://localhost:3000/login/google">
        <GoogleIcon />
        Login with Google
      </GoogleButton>
    </div>
  )
}
