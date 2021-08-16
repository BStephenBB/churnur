import { useRef, useState, useMemo, Fragment } from 'react'
import { useQuery } from 'react-query'
import type { CellProps, Column, HeaderProps } from 'react-table'
import { useBlockLayout, useTable } from 'react-table'
import { useOverlayTriggerState } from '@react-stately/overlays'
import { useButton } from '@react-aria/button'
import { parseISO } from 'date-fns'
import { format, utcToZonedTime } from 'date-fns-tz'
import { Button, Modal, EditCardModal, Text } from '../components'
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
import { useRouter } from 'next/router'
import { Card, Cards } from '../types'
import { api } from '../utils'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const formatISOStringAsUTC = (isoString: string, dateFormat: string) => {
  return format(utcToZonedTime(parseISO(isoString), 'UTC'), dateFormat, {
    timeZone: 'UTC',
  })
}

const CELL_FORMATERS = {
  DEFAULT: (input: string) => input,
  DOLLARS: (input: string) => formatMoney(input),
  DATE: (input: string) => formatISOStringAsUTC(input, 'MM/dd/yyyy'),
}

const makeCellComponent = (type: keyof typeof CELL_FORMATERS = 'DEFAULT') => {
  return function Cell(props: CardTableCellProps) {
    return (
      <DefaultCell
        {...props.calculatedProps}
        align={type === 'DOLLARS' ? 'right' : 'left'}
      >
        {props.value ? CELL_FORMATERS[type](props.value) : '--'}
      </DefaultCell>
    )
  }
}

const makeHeaderComponent = (text: string, rightAlign?: boolean) => {
  return function Header(props: CardHeaderCellProps) {
    return (
      <DefaultHeaderCell
        {...props.calculatedProps}
        align={rightAlign ? 'right' : 'left'}
      >
        {text}
      </DefaultHeaderCell>
    )
  }
}

const EditButton = styled.button`
  border: 1px solid ${({ theme }) => theme.color.gray3};
  padding: ${({ theme }) => theme.space1} ${({ theme }) => theme.space2};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  border-radius: 4px;
  background: ${({ theme }) => theme.color.gray0};

  transition: all 0.15s ease;

  &:focus {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.color.blue4 + '40'};
    border-color: ${({ theme }) => theme.color.blue2};
    outline: none;
  }

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.color.gray1};
  }
  &:active {
    background: ${({ theme }) => theme.color.gray2};
  }
`

const DEFAULT_WIDTH = 140

const processNumber = (number: number | null): string =>
  number !== null ? number.toString() : ''
const processDate = (dateString: string | null): string =>
  dateString !== null ? formatISOStringAsUTC(dateString, 'MM/dd/yyyy') : ''

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
      width: 150,
    },
    {
      Header: makeHeaderComponent('LIMIT', true),
      accessor: 'creditLimit',
      Cell: makeCellComponent('DOLLARS'),
      width: DEFAULT_WIDTH,
    },
    {
      Header: makeHeaderComponent('TOTAL SPEND', true),
      accessor: 'totalSpend',
      Cell: makeCellComponent('DOLLARS'),
      width: DEFAULT_WIDTH,
    },
    {
      Header: makeHeaderComponent('MSR', true),
      accessor: 'minimumSpendingRequirement',
      Cell: makeCellComponent('DOLLARS'),
      width: DEFAULT_WIDTH,
    },
    {
      Header: makeHeaderComponent('SUB. DUE DATE'),
      accessor: 'signupBonusDueDate',
      Cell: makeCellComponent('DATE'),
      width: DEFAULT_WIDTH,
    },
    {
      Header: makeHeaderComponent('OUSTANDING BAL.', true),
      accessor: 'outstandingBalance',
      Cell: makeCellComponent('DOLLARS'),
      width: DEFAULT_WIDTH,
    },
    {
      Header: makeHeaderComponent('ANNUAL FEE', true),
      accessor: 'annualFee',
      Cell: makeCellComponent('DOLLARS'),
      width: 120,
    },
    {
      Header: makeHeaderComponent('FEE DUE DATE'),
      accessor: 'annualFeeDate',
      Cell: makeCellComponent('DATE'),
      width: DEFAULT_WIDTH,
    },
    {
      Header: makeHeaderComponent('LAST CHARGE DATE'),
      accessor: 'lastChargeDate',
      Cell: makeCellComponent('DATE'),
      width: DEFAULT_WIDTH,
    },
    {
      Header: makeHeaderComponent(''),
      accessor: 'id',
      Cell: function Cell(props: CardTableCellProps) {
        return (
          <DefaultCell {...props.calculatedProps} align="right">
            <EditButton
              onClick={() => {
                const {
                  id,
                  name,
                  creditLimit,
                  totalSpend,
                  minimumSpendingRequirement,
                  signupBonusDueDate,
                  outstandingBalance,
                  annualFee,
                  annualFeeDate,
                  applicationDate,
                  approvalDate,
                  lastChargeDate,
                } = props.row.original
                setCardBeingEdited({
                  name: name,
                  limit: processNumber(creditLimit),
                  totalSpend: processNumber(totalSpend),
                  minimumSpendingRequirement: processNumber(
                    minimumSpendingRequirement
                  ),
                  signupBonusDate: processDate(signupBonusDueDate),
                  outstandingBalance: processNumber(outstandingBalance),
                  annualFee: processNumber(annualFee),
                  annualFeeDate: processDate(annualFeeDate),
                  applicationDate: processDate(applicationDate),
                  approvalDate: processDate(approvalDate),
                  lastChargeDate: processDate(lastChargeDate),
                })
                openCardModal()
                setEditingCardId(id)
              }}
            >
              <EditIcon title={`edit ${props.row.original.name} card`} />
            </EditButton>
          </DefaultCell>
        )
      },
      width: 60,
    },
  ]
  return columns
}

const CreateCardSection = styled.section<{ userHasNoCards: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.userHasNoCards ? 'column' : 'row')};
  gap: ${({ userHasNoCards, theme }) =>
    userHasNoCards ? theme.space(4) : '0'};
  padding: 0 ${({ theme }) => theme.space(6)};
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme, userHasNoCards }) =>
    userHasNoCards ? theme.space(22) : theme.space(10)};
  margin-bottom: ${({ theme }) => theme.space(4)};
`

const getUsersCards = async () => {
  return api.GET('/cards')
}

const CardsTable = ({
  data,
  columns,
}: {
  data: Cards
  columns: Column<Card>[]
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Card>(
      {
        columns: columns,
        data: data,
      },
      useBlockLayout
    )

  if (data.length === 0) {
    return null
  }

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
  const {
    data: cards,
    status,
    error,
  } = useQuery<Card[], { statusCode: number; error: string; message: string }>(
    'cards',
    getUsersCards,
    {
      refetchOnWindowFocus: false,
      retry: false, // TODO probably want some amt of retry?
    }
  )

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

  const userHasNoCards = memoizedCards?.length === 0

  return (
    <Wrapper>
      <Text
        size={7}
        align="center"
        style={{
          marginTop: '200px',
          marginBottom: '8px',
        }}
      >
        Churnur
      </Text>
      <Text as={'h2'} size={4} align="center">
        Credit Card Management for Churning
      </Text>
      <CreateCardSection userHasNoCards={userHasNoCards}>
        <Text
          size={userHasNoCards ? 3 : 6}
          weight={userHasNoCards ? 'default' : 'medium'}
        >
          {userHasNoCards ? 'Get started by adding a card' : 'Cards'}
        </Text>
        <Button {...openButtonProps} ref={openButtonRef} variant="PRIMARY">
          + ADD CARD
        </Button>
      </CreateCardSection>
      {isError ? (
        <div style={{ color: 'red' }}>
          {error === null ? 'Error!' : 'Error: ' + error.message}
        </div>
      ) : (
        <>
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
