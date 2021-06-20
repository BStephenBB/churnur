import { useState, useRef } from 'react'
import styled, { DefaultTheme } from 'styled-components'
import type { FocusEvent } from 'react'
import type { StyledComponentProps } from 'styled-components'
import { Datepicker } from './DatePicker'
import { format } from 'date-fns'
import { CalendarIcon } from '../icons'

// TODO use react-aria for this (for input)

const Wrapper = styled.div`
  display: flex;
  height: ${({ theme }) => theme.space(10)};
  border-radius: 4px;
`

const Box = styled.div`
  flex-basis: ${({ theme }) => theme.space(9)};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.color.gray1};
  color: ${({ theme }) => theme.color.gray6};
  border-top: 1px solid ${({ theme }) => theme.color.gray3};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray3};
  border-left: 1px solid ${({ theme }) => theme.color.gray3};
  height: 100%;
  border-radius: 4px 0 0 4px;
  font-variation-settings: 'wght' 550;
  font-size: ${({ theme }) => theme.text['1']};
`

export const Label = styled.label`
  margin-bottom: ${({ theme }) => theme.space1};
  display: block;
  font-variation-settings: 'wght' 500;
`

// TODO disabled state
export const InputElement = styled.input<{
  hasBox: boolean
  isNumeric: boolean
  fullWidth?: boolean
}>`
  padding: 0 ${({ theme }) => theme.space(3)};
  display: block;
  flex-grow: 1;
  min-width: 0;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : undefined)};
  height: ${({ theme }) => theme.space(10)};
  border-radius: ${({ hasBox }) => (hasBox ? '0 4px 4px 0' : '4px')};
  border: 1px solid ${({ theme }) => theme.color.gray3};
  outline: none !important;
  transition: 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  text-align: ${(props) => (props.isNumeric ? 'right' : 'left')};

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.color.blue3};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.color.blue4 + '40'};
  }
`

export enum InputTypes {
  DOLLAR = 'DOLLAR',
  TEXT = 'TEXT',
  DATE = 'DATE',
}

const INPUT_TYPE_SYMBOL = {
  [InputTypes.DOLLAR]: '$',
  [InputTypes.TEXT]: null,
  [InputTypes.DATE]: <CalendarIcon />,
}

// TODO clean up all the meh logic in this component
export const Input = (
  props: StyledComponentProps<
    'input',
    DefaultTheme,
    { type?: InputTypes; label: string; setDate?: (date: string) => void },
    never
  >
) => {
  const { type, label, setDate, ...rest } = props
  let acctualType = type ?? InputTypes.TEXT

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const hideDatePicker = () => {
    setIsDatePickerOpen(false)
  }

  const _handleOnDateSelected = ({
    /* selected, */
    /* selectable, */
    date,
  }: {
    /* selected: boolean */
    /* selectable: boolean */
    date: Date
  }) => {
    if (setDate !== undefined) {
      setDate(format(date, 'MM/dd/yyyy'))
    }
    hideDatePicker()
  }

  const dateInputRef = useRef<HTMLInputElement>(null)

  if (type === InputTypes.DATE) {
    return (
      <div>
        <Label>{label}</Label>
        <Wrapper>
          {acctualType === InputTypes.TEXT ? null : (
            <Box>{INPUT_TYPE_SYMBOL[acctualType]}</Box>
          )}
          <InputElement
            {...rest}
            ref={dateInputRef}
            hasBox={acctualType !== InputTypes.TEXT}
            isNumeric={acctualType === InputTypes.DOLLAR}
            onFocus={(event: FocusEvent<HTMLInputElement>) => {
              // TODO why doesn't the react type suport `.select()`?
              event.target.select()
              setIsDatePickerOpen(true)
            }}
            onBlur={() => {
              /* setIsDatePickerOpen(false) */
            }}
          />
          <Datepicker
            inputRef={dateInputRef}
            show={isDatePickerOpen}
            selected={new Date(rest.value as string)}
            date={rest.value ? new Date(rest.value as string) : new Date()}
            onDateSelected={_handleOnDateSelected}
            hideDatePicker={hideDatePicker}
          />
        </Wrapper>
      </div>
    )
  } else {
    return (
      <div>
        <Label>{label}</Label>
        <Wrapper>
          {acctualType === InputTypes.TEXT ? null : (
            <Box>{INPUT_TYPE_SYMBOL[acctualType]}</Box>
          )}
          <InputElement
            {...rest}
            hasBox={acctualType !== InputTypes.TEXT}
            isNumeric={acctualType === InputTypes.DOLLAR}
            onFocus={(event: FocusEvent<HTMLInputElement>) => {
              // TODO why doesn't the react type suport `.select()`?
              event.target.select()
            }}
          />
        </Wrapper>
      </div>
    )
  }
}
