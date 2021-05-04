import { useRef, useState, useMemo, Fragment } from 'react'
import { useQuery } from 'react-query'
import type { CellProps, Column, HeaderProps } from 'react-table'
import { useBlockLayout, useTable } from 'react-table'
import { useOverlayTriggerState } from '@react-stately/overlays'
import { useButton } from '@react-aria/button'
import { format } from 'date-fns'
import { Button, Modal, EditCardModal } from '../components'
import {
  TableRow,
  TableHeader,
  DefaultCell,
  DefaultHeaderCell,
  TableWrapper,
} from '../components/table'
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

type CardTableCellProps = CellProps<Card, string> & {
  calculatedProps: {
    key: string
    role: 'cell'
    style: Record<string, string>
  }
}

type CardHeaderCellProps = HeaderProps<Card> & {
  calculatedProps: {
    key: string
    colSpan: number
    role: 'columnheader'
    style: Record<string, string>
  }
}

const CELL_FORMATERS = {
  DEFAULT: (input: string) => input,
  DOLLARS: (input: string) => formatMoney(input),
  DATE: (input: string) => format(new Date(input), 'MMM do, yyyy'),
  /* DATE: (input: string) => format(new Date(input), 'MM-dd-yyyy'), */
}

const makeCellComponent = (type: keyof typeof CELL_FORMATERS = 'DEFAULT') => {
  return function Cell(props: CardTableCellProps) {
    return (
      <DefaultCell {...props.calculatedProps}>
        {CELL_FORMATERS[type](props.value)}
      </DefaultCell>
    )
  }
}

const makeHeaderComponent = (text: string) => {
  return function Header(props: CardHeaderCellProps) {
    return (
      <DefaultHeaderCell {...props.calculatedProps}>{text}</DefaultHeaderCell>
    )
  }
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
      Header: makeHeaderComponent('NAME'),
      accessor: 'name',
      Cell: makeCellComponent(),
    },
    {
      Header: makeHeaderComponent('LIMIT'),
      accessor: 'creditLimit',
      Cell: makeCellComponent('DOLLARS'),
    },
    {
      Header: makeHeaderComponent('TOTAL SPEND'),
      accessor: 'totalSpend',
      Cell: makeCellComponent('DOLLARS'),
    },
    {
      Header: makeHeaderComponent('MSP'),
      accessor: 'minimumSpendingRequirement',
      Cell: makeCellComponent('DOLLARS'),
    },
    {
      Header: makeHeaderComponent('SUB. DUE DATE'),
      accessor: 'signupBonusDueDate',
      Cell: makeCellComponent('DATE'),
    },
    {
      Header: makeHeaderComponent(''),
      accessor: 'id',
      Cell: function Cell(props: CardTableCellProps) {
        return (
          <DefaultCell {...props.calculatedProps} align="right">
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
          </DefaultCell>
        )
      },
    },
  ]
  return columns
}

const Test = styled.div`
  font-size: ${({ theme }) => theme.text[6]};
  font-variation-settings: 'wght' 650;
  margin-bottom: ${({ theme }) => theme.space3};
`

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
    <TableWrapper {...getTableProps()}>
      {headerGroups.map((headerGroup) => {
        // there is only 1 header, maybe do this in a way w/out mapping...?
        const headerProps = headerGroup.getHeaderGroupProps()
        const { style, ...rest } = headerProps // need to remove the style prop
        return (
          <TableHeader {...rest}>
            {headerGroup.headers.map((column) => {
              return (
                <Fragment key={column.id}>
                  {column.render('Header', {
                    calculatedProps: column.getHeaderProps(),
                  })}
                </Fragment>
              )
            })}
          </TableHeader>
        )
      })}

      <div {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          const rowProps = row.getRowProps()
          const { style, ...rest } = rowProps // need to remove the style prop
          return (
            <TableRow {...rest}>
              {row.cells.map((cell) => {
                return (
                  <Fragment key={cell.column.id}>
                    {cell.render('Cell', {
                      calculatedProps: cell.getCellProps(),
                    })}
                  </Fragment>
                )
              })}
            </TableRow>
          )
        })}
      </div>
    </TableWrapper>
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
      <div
        style={{
          display: 'flex',
          padding: '0 24px',
          justifyContent: 'space-between',
        }}
      >
        <Test>Cards</Test>
        <Button {...openButtonProps} ref={openButtonRef}>
          + ADD CARD
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
