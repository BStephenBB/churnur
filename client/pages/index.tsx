import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

const getUser = async () => {
  const result = await window.fetch('http://localhost:3000/user/1', {
    method: 'GET',
    headers: {
      /* 'Access-Control-Allow-Origin': '*', */
    },
  })
  console.log(result)
  const json = await result.json()
  console.log(json)
  return json
}

export default function Dashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser()
  }, [])

  return <Title>Dashboard</Title>
}
