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
import { useRouter } from 'next/dist/client/router'
import { logout } from '../utils'
import { Card, Cards } from '../types'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
})

const formatMoney = (value: string) => {
  return formatter.format(Number(value))
}

const makeCardTableColumns = ({
  openCardModal,
  setEditingCardId,
  setCardBeingEdited,
}: {
  openCardModal: () => void
  setEditingCardId: React.Dispatch<React.SetStateAction<number | null>>
  setCardBeingEdited: (cardInfo: CardRepresentation) => void
}): Column<Card>[] => {
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
    {
      // may just change this to an option cell
      Header: '--',
      accessor: 'id',
      width: 200,
      Cell: function Cell(props: CellProps<Card, string>) {
        console.log(props)
        return (
          <button
            onClick={() => {
              // TODO this whole edit thing should be a column officially
              const {
                id,
                name,
                creditLimit,
                totalSpend,
                minimumSpendingRequirement,
                signupBonusDueDate,
              } = props.row.original
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
            <EditIcon title={`edit ${props.row.original.name} card`} />
          </button>
        )
      },
    },
  ]
  return columns
}

const getUsersCards = async () => {
  const result = await window.fetch(`http://localhost:3000/cards`, {
    method: 'GET',
    headers: {
      /* 'Access-Control-Allow-Origin': '*', */
    },
    credentials: 'include',
    // TODO make a fetch wrapper
  })
  const json = await result.json()
  if (result.ok) {
    return json
  } else {
    return Promise.reject(json)
  }
}

const CardsTable = ({
  data,
  columns,
}: {
  data: Cards
  columns: Column<Card>[]
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<Card>(
    {
      columns: columns,
      data: data,
    },
    useBlockLayout
  )

  return (
    <div {...getTableProps()}>
      <div style={{ padding: '12px 0', borderBottom: '2px solid' }}>
        {headerGroups.map((headerGroup) => {
          return (
            <div {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <div {...column.getHeaderProps()}>
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
            <div
              {...row.getRowProps()}
              style={{
                height: '72px',
                borderBottom: '1px solid #333',
                display: 'flex',
                alignItems: 'center',
              }}
            >
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

// TODO optimize re-rendering
export default function Dashboard() {
  const [editingCardId, setEditingCardId] = useState<null | number>(null)
  const newCardModalState = useOverlayTriggerState({})
  const editCardModalState = useOverlayTriggerState({})
  const { data: cards, status, error } = useQuery<
    Card[],
    { statusCode: number; error: string; message: string }
  >('cards', getUsersCards, {
    refetchOnWindowFocus: false,
    retry: false, // TODO probably want some amt of retry?
  })

  const router = useRouter()

  const memoizedCards = useMemo(() => cards, [cards])

  const memoizedColumns = useMemo(() => {
    return makeCardTableColumns({
      openCardModal: editCardModalState.open,
      setEditingCardId,
      setCardBeingEdited: (cardInfo: CardRepresentation) => {
        cardReducerResult[1]({
          type: CardActionType.SET_CARD,
          payload: cardInfo,
        })
      },
    })
    // TODO check this dep array
  }, [])

  const cardReducerResult = useCardReducer()

  // modal open button
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const { buttonProps: openButtonProps } = useButton(
    {
      onPress: () => newCardModalState.open(),
    },
    openButtonRef
  )

  const isError = status === 'error' && error !== null

  if (error?.error === 'Unauthorized') {
    router.push('/login')
  }

  if (status === 'loading') {
    return <div>loading...</div>
  }

  console.log(cards)

  return (
    <Wrapper>
      <div style={{ display: 'flex' }}>
        <h2 style={{ marginBottom: '20px' }}>Churnur</h2>
        <Button {...openButtonProps} ref={openButtonRef}>
          + Add card
        </Button>
      </div>
      {isError ? (
        <div style={{ color: 'red' }}>
          {error === null ? 'Error!' : 'Error: ' + error.message}
        </div>
      ) : (
        <>
          {/* <Button onClick={logout}>logout</Button> */}
          <CardsTable data={memoizedCards ?? []} columns={memoizedColumns} />
          <Modal state={newCardModalState} />
          <EditCardModal
            cardId={editingCardId}
            state={editCardModalState}
            cardReducerResult={cardReducerResult}
          />
        </>
      )}
    </Wrapper>
  )
}
