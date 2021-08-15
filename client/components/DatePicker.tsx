import React, { useRef, useEffect } from 'react'
import {
  GetBackForwardPropsOptions,
  GetDatePropsOptions,
  Props,
  useDayzed,
} from 'dayzed'
import { ArrowLeft, ArrowRight } from '../icons'
import type { Calendar } from 'dayzed'
import styled from 'styled-components'
import { Text } from './Text'

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, auto);
  padding: ${({ theme }) => theme.space(2)};
  background: ${({ theme }) => theme.color.white};
`

const Wrapper = styled.div<{ show: boolean; isOverflowing: boolean }>`
  box-shadow: ${({ theme }) => theme.shadow.medium};
  border-radius: 6px;
  overflow: hidden;
  position: absolute;
  z-index: 10;
  top: ${({ isOverflowing, theme }) =>
    isOverflowing ? theme.space(-6) : `calc(100% + ${theme.space(2)})`};
  left: 50%;
  transition: ${({ isOverflowing }) =>
    isOverflowing ? undefined : 'transform 0.15s ease'};
  transform: translateX(-50%)
    translateY(
      ${({ show, isOverflowing }) =>
        isOverflowing ? '-100%' : show ? '4px' : '0px'}
    );
  opacity: ${(props) => (props.show ? '1' : '0')};
  pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
`

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.space(2)} 0;
`

const SQUARE_SIZE = 12

const DaysOfWeekWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: ${({ theme }) => theme.space(1)} 0;
  margin-top: ${({ theme }) => theme.space(2)};

  & > * {
    text-align: center;
    width: ${({ theme }) => theme.space(SQUARE_SIZE)};
    font-variation-settings: 'wght' 550;
  }
`

const DateButton = styled.button<{ selected: boolean }>`
  border-radius: 100%;
  height: ${({ theme }) => theme.space(SQUARE_SIZE)};
  width: ${({ theme }) => theme.space(SQUARE_SIZE)};
  color: ${({ theme }) => theme.color.text};
  transition: all 0.15s ease;
  font-variation-settings: 'wght' ${(props) => (props.selected ? '600' : '500')};
  border: 2px solid ${({ theme }) => theme.color.white};
  background: ${({ selected, theme }) =>
    selected ? theme.color.gray8 : theme.color.white};
  color: ${({ selected, theme }) =>
    selected ? theme.color.white : theme.color.text};
  &:hover {
    border-color: ${({ theme, selected }) =>
      selected ? undefined : theme.color.gray7};
  }
  &:active {
    background: ${({ theme }) => theme.color.gray2};
    border-color: ${({ theme }) => theme.color.gray2};
  }
`

const ArrowButton = styled.button`
  width: ${({ theme }) => theme.space(SQUARE_SIZE)};
`

const TopWrapper = styled.div`
  background: ${({ theme }) => theme.color.gray2};
  padding: ${({ theme }) => theme.space(2)} ${({ theme }) => theme.space(2)}
    ${({ theme }) => theme.space(2)}; ;
`

const monthNamesShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
const weekdayNamesShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function CalendarUi({
  calendars,
  getBackProps,
  getForwardProps,
  getDateProps,
  show,
  inputRef,
  hideDatePicker,
}: {
  calendars: Calendar[]
  getBackProps: (options: GetBackForwardPropsOptions) => Record<string, any>
  getForwardProps: (options: GetBackForwardPropsOptions) => Record<string, any>
  getDateProps: (data: GetDatePropsOptions) => Record<string, any>
  show: boolean
  inputRef: React.RefObject<HTMLInputElement>
  hideDatePicker: () => void
}) {
  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const clickedOutsideCalendar =
        calendarRef.current && !calendarRef.current.contains(e.target as Node)
      const clickedOutsideInput =
        inputRef.current && !inputRef.current.contains(e.target as Node)

      if (clickedOutsideCalendar && clickedOutsideInput) {
        hideDatePicker()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const isOverflowing = (() => {
    if (calendarRef.current) {
      const { top, height } = calendarRef.current.getBoundingClientRect()
      const yPosition = top + height
      return yPosition > window.innerHeight
    } else {
      return false
    }
  })()

  if (calendars.length) {
    return (
      <>
        {calendars.map((calendar) => (
          <Wrapper
            key={`${calendar.month}${calendar.year}`}
            show={show}
            ref={calendarRef}
            isOverflowing={isOverflowing}
          >
            <TopWrapper>
              <ControlsWrapper>
                <ArrowButton {...getBackProps({ calendars })}>
                  <ArrowLeft />
                </ArrowButton>
                <Text weight="medium">
                  {monthNamesShort[calendar.month]} {calendar.year}
                </Text>
                <ArrowButton {...getForwardProps({ calendars })}>
                  <ArrowRight />
                </ArrowButton>
              </ControlsWrapper>
              <DaysOfWeekWrapper>
                {weekdayNamesShort.map((weekday, index) => (
                  <div key={`${calendar.month}${calendar.year}${index}`}>
                    {weekday}
                  </div>
                ))}
              </DaysOfWeekWrapper>
            </TopWrapper>
            <CalendarWrapper>
              {calendar.weeks.map((week, weekIndex) =>
                week.map((dateObj, index) => {
                  let key = `${calendar.month}${calendar.year}${weekIndex}${index}`
                  if (!dateObj) {
                    return (
                      <div
                        key={key}
                        style={{
                          display: 'inline-block',
                          width: 'calc(100% / 7)',
                          border: 'none',
                          background: 'transparent',
                        }}
                      />
                    )
                  }
                  const { date, selected, selectable, today } = dateObj
                  let background = today ? 'cornflowerblue' : ''
                  background = selected ? 'purple' : background
                  return (
                    <DateButton
                      selected={selected}
                      key={key}
                      {...getDateProps({ dateObj })}
                    >
                      {selectable ? date.getDate() : 'X'}
                    </DateButton>
                  )
                })
              )}
            </CalendarWrapper>
          </Wrapper>
        ))}
      </>
    )
  }
  return null
}

export function Datepicker(
  props: Omit<
    Props & {
      show: boolean
      inputRef: React.RefObject<HTMLInputElement>
      hideDatePicker: () => void
    },
    'children' | 'render'
  >
) {
  const dayzedData = useDayzed(props)
  return (
    <CalendarUi
      {...dayzedData}
      show={props.show}
      inputRef={props.inputRef}
      hideDatePicker={props.hideDatePicker}
    />
  )
}

/* export const SingleDate = () => { */
/*   const [selectedDate, setSelectedDate] = useState<undefined | Date>(undefined) */
/*   const _handleOnDateSelected = ({ */
/*     selected, */
/*     selectable, */
/*     date, */
/*   }: { */
/*     selected: boolean */
/*     selectable: boolean */
/*     date: Date */
/*   }) => { */
/*     setSelectedDate(date) */
/*   } */
/*   return ( */
/*     <Datepicker */
/*       show={true} */
/*       selected={selectedDate} */
/*       onDateSelected={_handleOnDateSelected} */
/*     /> */
/*   ) */
/* } */

/* {selectedDate && ( */
/*       <div style={{ paddingTop: 20, textAlign: 'center' }}> */
/*       <p>Selected:</p> */
/*       <p>{`${selectedDate?.toLocaleDateString()}`}</p> */
/*       </div> */
/* )} */
