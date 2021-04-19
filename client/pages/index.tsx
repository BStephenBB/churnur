import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'

const Wrapper = styled.div``

type Card = {
  id: number
  name: string
}

const currentUser = '1'

const getCardsForUser = async (userId: string) => {
  const result = await window.fetch(
    `http://localhost:3000/user/${userId}/cards`,
    {
      method: 'GET',
      headers: {
        /* 'Access-Control-Allow-Origin': '*', */
      },
    }
  )
  const json = await result.json()
  return json
}

/* const getUser = async () => { */
/*   const result = await window.fetch('http://localhost:3000/user/1', { */
/*     method: 'GET', */
/*     headers: { */
/*       /1* 'Access-Control-Allow-Origin': '*', *1/ */
/*     }, */
/*   }) */
/*   console.log(result) */
/*   const json = await result.json() */
/*   console.log(json) */
/*   return json */
/* } */

export default function Dashboard() {
  const { data: cards, status } = useQuery<Card[]>(
    'cards',
    () => getCardsForUser(currentUser),
    {
      refetchOnWindowFocus: false,
    }
  )

  if (status === 'loading' || cards === undefined) {
    return null
  }

  console.log(cards)

  return (
    <Wrapper>
      <h2>Churnur</h2>
      {cards.map((card) => {
        const { id, name } = card
        return <div key={id}>{name}</div>
      })}
    </Wrapper>
  )
}
