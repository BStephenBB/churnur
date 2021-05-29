import React, { useState } from 'react'
import {
  GetBackForwardPropsOptions,
  GetDatePropsOptions,
  Props,
  useDayzed,
} from 'dayzed'
import type { Calendar } from 'dayzed'
import styled from 'styled-components'

const DateButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 100%;
  &:hover {
    border: 1px solid ${({ theme }) => theme.color.blue4};
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
const weekdayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

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
      <div
        style={{
          maxWidth: 800,
          textAlign: 'center',
          border: '1px solid blue',
        }}
      >
        <div>
          <button {...getBackProps({ calendars })}>Back</button>
          <button {...getForwardProps({ calendars })}>Next</button>
        </div>
        {calendars.map((calendar) => (
          <div
            key={`${calendar.month}${calendar.year}`}
            style={{
              display: 'inline-block',
              width: '50%',
              padding: '0 10px 30px',
              border: '1px solid red',
              boxSizing: 'border-box',
            }}
          >
            <div>
              {monthNamesShort[calendar.month]} {calendar.year}
            </div>
            {weekdayNamesShort.map((weekday) => (
              <div
                key={`${calendar.month}${calendar.year}${weekday}`}
                style={{
                  display: 'inline-block',
                  width: 'calc(100% / 7)',
                  border: 'none',
                  background: 'transparent',
                }}
              >
                {weekday}
              </div>
            ))}
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
                background = !selectable ? 'teal' : background
                return (
                  <DateButton
                    style={{
                      background,
                    }}
                    key={key}
                    {...getDateProps({ dateObj })}
                  >
                    {selectable ? date.getDate() : 'X'}
                  </DateButton>
                )
              })
            )}
          </div>
        ))}
      </div>
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
      {selectedDate && (
        <div style={{ paddingTop: 20, textAlign: 'center' }}>
          <p>Selected:</p>
          <p>{`${selectedDate?.toLocaleDateString()}`}</p>
        </div>
      )}
    </div>
  )
}
