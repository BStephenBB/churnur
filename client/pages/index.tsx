import { useEffect, useState, useMemo } from 'react'
import { useQuery } from 'react-query'
import type { CellProps, Column, HeaderProps } from 'react-table'
import { useSortBy, useTable } from 'react-table'
import styled from 'styled-components'

const Wrapper = styled.div``

type Card = {
  id: number
  name: string
  creditLimit: number
  totalSpend: number
  minimumSpendingRequirement: number
}

type Cards = Card[]

const currentUser = '1'

const columns: Column<Card>[] = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Limit',
    accessor: 'creditLimit',
  },
  {
    Header: 'Total Spend',
    accessor: 'totalSpend',
  },
  {
    Header: 'Min. Spending Requirement',
    accessor: 'minimumSpendingRequirement',
  },
]

const getUsersCards = async () => {
  const result = await window.fetch(
    `http://localhost:3000/user/${currentUser}/cards`,
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

const CardsTable = ({
  columns,
  data,
}: {
  columns: Column<Card>[]
  data: Cards
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<Card>({ columns: columns, data: data })

  return (
    <div {...getTableProps()} className="table">
      <div className="header">
        {headerGroups.map((headerGroup) => {
          return (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => {
                return column.render('Header')
              })}
            </div>
          )
        })}
      </div>
      <div {...getTableBodyProps()}>
        {rows.map((row) => {
          return (
            <div className="row" {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <div {...cell.getCellProps()}>{cell.render('Cell')}</div>
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { data: cards, status } = useQuery<Card[]>('cards', getUsersCards, {
    refetchOnWindowFocus: false,
  })

  const memoizedCards = useMemo(() => cards, [cards])

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
