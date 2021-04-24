import { useEffect, useState, useMemo } from 'react'
import { useQuery } from 'react-query'
import type { CellProps, Column, HeaderProps } from 'react-table'
import { useBlockLayout, useTable } from 'react-table'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

type Card = {
  id: number
  name: string
  creditLimit: number
  totalSpend: number
  minimumSpendingRequirement: number
  signupBonusDueDate: string
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
  {
    Header: 'Sign up Bonus Due Date',
    accessor: 'signupBonusDueDate',
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

const CardsTable = ({ data }: { data: Cards }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<Card>({ columns: columns, data: data }, useBlockLayout)

  return (
    <div {...getTableProps()} className="table">
      <div className="header">
        {headerGroups.map((headerGroup) => {
          return (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => {
                return (
                  <div {...column.getHeaderProps()} className="th">
                    {column.render('Header')}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      <div {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
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

  if (status === 'loading' || memoizedCards === undefined) {
    return null
  }

  console.log(cards)

  return (
    <Wrapper>
      <h2 css="margin-bottom: 20px;">Churnur</h2>
      <CardsTable data={memoizedCards} />
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
