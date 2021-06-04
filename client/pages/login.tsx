import styled from 'styled-components'
import { Button, Text } from '../components'
import { GoogleIcon } from '../icons'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color.gray1};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Card = styled.div`
  display: flex;
  width: ${({ theme }) => theme.space(90)};
  height: ${({ theme }) => theme.space(55)};
  background: ${({ theme }) => theme.color.white};
  box-shadow: ${({ theme }) => theme.shadow.medium};
  border-radius: 4px;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.space4};
  padding-bottom: ${({ theme }) => theme.space5};
`

const GoogleButton = styled(Button).attrs(() => ({ variant: 'PRIMARY' }))`
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.text[2]};
  padding: ${({ theme }) => theme.space1};
  border-radius: 4px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-top: ${({ theme }) => theme.space3};

  & svg {
    position: absolute;
    left: ${({ theme }) => theme.space(1)};
  }
`

const SERVER_DOMAIN = process.env.SERVER_DOMAIN

export default function Dashboard() {
  return (
    <Wrapper>
      <Card>
        <Text size={6}>Churnur</Text>
        <GoogleButton href={`http://${SERVER_DOMAIN}/login/google`} as="a">
          <GoogleIcon />
          Login with Google
        </GoogleButton>
        <Text size={1} align="center" style={{ marginTop: 'auto' }}>
          By logging in, you agree to our Terms of Services and Privacy Policy.
        </Text>
      </Card>
    </Wrapper>
  )
}
