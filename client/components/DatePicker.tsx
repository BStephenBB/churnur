import React, { useState } from 'react'
import {
  GetBackForwardPropsOptions,
  GetDatePropsOptions,
  Props,
  useDayzed,
} from 'dayzed'
import { ArrowLeft, ArrowRight } from '../icons'
import type { Calendar } from 'dayzed'
import styled from 'styled-components'

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(6, ${({ theme }) => theme.space(12)});
  grid-template-columns: repeat(7, ${({ theme }) => theme.space(12)});
`

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.space(3)};
  box-shadow: ${({ theme }) => theme.shadow.large};
  display: inline-block;
`

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const DateButton = styled.button<{ selected: boolean; today: boolean }>`
  border-radius: 100%;
  color: ${({ theme }) => theme.color.text};
  transition: all 0.15s ease;
  font-variation-settings: 'wght' ${(props) => (props.selected ? '600' : '500')};
  border: 2px solid ${({ theme }) => theme.color.white};
  background: ${({ selected, today, theme }) =>
    selected
      ? theme.color.blue2
      : today
      ? theme.color.green2
      : theme.color.white};
  &:hover {
    border-color: ${({ theme, today, selected }) =>
      today || selected ? undefined : theme.color.gray6};
  }
  &:active {
    border-color: ${({ theme }) => theme.color.blue4};
  }
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
}: {
  calendars: Calendar[]
  getBackProps: (options: GetBackForwardPropsOptions) => Record<string, any>
  getForwardProps: (options: GetBackForwardPropsOptions) => Record<string, any>
  getDateProps: (data: GetDatePropsOptions) => Record<string, any>
}) {
  if (calendars.length) {
    return (
      <>
        {calendars.map((calendar) => (
          <Wrapper key={`${calendar.month}${calendar.year}`}>
            <TopWrapper>
              <button {...getBackProps({ calendars })}>
                <ArrowLeft />
              </button>
              <div>
                {monthNamesShort[calendar.month]} {calendar.year}
              </div>
              <button {...getForwardProps({ calendars })}>
                <ArrowRight />
              </button>
            </TopWrapper>
            <div style={{ width: '100%', display: 'flex' }}>
              {weekdayNamesShort.map((weekday, index) => (
                <div
                  key={`${calendar.month}${calendar.year}${index}`}
                  style={{
                    display: 'inline-block',
                    textAlign: 'center',
                    width: '48px',
                    border: 'none',
                    background: 'transparent',
                  }}
                >
                  {weekday}
                </div>
              ))}
            </div>
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
                      today={today}
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

function Datepicker(props: Omit<Props, 'children' | 'render'>) {
  const dayzedData = useDayzed(props)
  return <CalendarUi {...dayzedData} />
}

export const SingleDate = () => {
  const [selectedDate, setSelectedDate] = useState<undefined | Date>(undefined)

  const _handleOnDateSelected = ({
    selected,
    selectable,
    date,
  }: {
    selected: boolean
    selectable: boolean
    date: Date
  }) => {
    setSelectedDate(date)
  }

  return (
    <div>
      <Datepicker
        selected={selectedDate}
        onDateSelected={_handleOnDateSelected}
      />
    </div>
  )
}
/* {selectedDate && ( */
/*       <div style={{ paddingTop: 20, textAlign: 'center' }}> */
/*       <p>Selected:</p> */
/*       <p>{`${selectedDate?.toLocaleDateString()}`}</p> */
/*       </div> */
/* )} */
