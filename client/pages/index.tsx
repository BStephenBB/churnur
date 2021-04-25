import { useRef, useState, useMemo } from 'react'
import { useQuery } from 'react-query'
import type { CellProps, Column, HeaderProps } from 'react-table'
import { useBlockLayout, useTable } from 'react-table'
import { useOverlayTriggerState } from '@react-stately/overlays'
import { useButton } from '@react-aria/button'
import { format } from 'date-fns'
import { Button, Modal, EditCardModal } from '../components'
import { EditIcon } from '../icons'
import { useCardReducer, CardActionType } from '../components/Modal'
import type { CardRepresentation } from '../components/Modal'
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

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
})

const formatMoney = (value: string) => {
  return formatter.format(Number(value))
}

const columns: Column<Card>[] = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Limit',
    accessor: 'creditLimit',
    width: 100,
    Cell: function Cell(props: CellProps<Card, string>) {
      return <div>{formatMoney(props.value)}</div>
    },
  },
  {
    Header: 'Total Spend',
    accessor: 'totalSpend',
    width: 108,
    Cell: function Cell(props: CellProps<Card, string>) {
      return <div>{formatMoney(props.value)}</div>
    },
  },
  {
    Header: 'Min. Spending Requirement',
    accessor: 'minimumSpendingRequirement',
    width: 224,
    Cell: function Cell(props: CellProps<Card, string>) {
      return <div>{formatMoney(props.value)}</div>
    },
  },
  {
    Header: 'Sign up Bonus Due Date',
    accessor: 'signupBonusDueDate',
    width: 200,
    Cell: function Cell(props: CellProps<Card, string>) {
      return <div>{format(new Date(props.value), 'MM/dd/yyyy')}</div>
    },
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
  data,
  openCardModal,
  setEditingCardId,
  setCardBeingEdited,
}: {
  data: Cards
  openCardModal: () => void
  setEditingCardId: React.Dispatch<React.SetStateAction<number | null>>
  setCardBeingEdited: (cardInfo: CardRepresentation) => void
}) => {
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
              <div>Edit</div>
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
              <div>
                <button
                  onClick={() => {
                    const {
                      id,
                      name,
                      creditLimit,
                      totalSpend,
                      minimumSpendingRequirement,
                      signupBonusDueDate,
                    } = row.original
                    setCardBeingEdited({
                      name: name,
                      limit: creditLimit.toString(),
                      totalSpend: totalSpend.toString(),
                      minimumSpendingRequirement: minimumSpendingRequirement.toString(),
                      signupBonusDate: signupBonusDueDate,
                    })
                    openCardModal()
                    setEditingCardId(id)
                  }}
                >
                  <EditIcon title={`edit ${row.original.name} card`} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// TODO optimize re-rendering
export default function Dashboard() {
  const [editingCardId, setEditingCardId] = useState<null | number>(null)
  const newCardModalState = useOverlayTriggerState({})
  const editCardModalState = useOverlayTriggerState({})
  const { data: cards, status } = useQuery<Card[]>('cards', getUsersCards, {
    refetchOnWindowFocus: false,
  })

  const memoizedCards = useMemo(() => cards, [cards])

  const cardReducerResult = useCardReducer()

  // modal open button
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const { buttonProps: openButtonProps } = useButton(
    {
      onPress: () => newCardModalState.open(),
    },
    openButtonRef
  )

  if (status === 'loading' || memoizedCards === undefined) {
    return null
  }

  console.log(cards)

  return (
    <Wrapper>
      <h2 style={{ marginBottom: '20px' }}>Churnur</h2>
      <CardsTable
        data={memoizedCards}
        openCardModal={editCardModalState.open}
        setEditingCardId={setEditingCardId}
        setCardBeingEdited={(cardInfo: CardRepresentation) => {
          cardReducerResult[1]({
            type: CardActionType.SET_CARD,
            payload: cardInfo,
          })
        }}
      />
      <Button {...openButtonProps} ref={openButtonRef}>
        + New card
      </Button>
      <Modal state={newCardModalState} />
      <EditCardModal
        cardId={editingCardId}
        state={editCardModalState}
        cardReducerResult={cardReducerResult}
      />
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
