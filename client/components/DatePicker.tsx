import React from 'react'
import {
  GetBackForwardPropsOptions,
  GetDatePropsOptions,
  Props,
  useDayzed,
} from 'dayzed'
import type { Calendar } from 'dayzed'
import styled from 'styled-components'

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
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
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
                let { date, selected, selectable, today } = dateObj
                let background = today ? 'cornflowerblue' : ''
                background = selected ? 'purple' : background
                background = !selectable ? 'teal' : background
                return (
                  <button
                    style={{
                      display: 'inline-block',
                      width: 'calc(100% / 7)',
                      border: 'none',
                      background,
                    }}
                    key={key}
                    {...getDateProps({ dateObj })}
                  >
                    {selectable ? date.getDate() : 'X'}
                  </button>
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

class Single extends React.Component {
  state: { selectedDate: Date | undefined } = { selectedDate: undefined }

  _handleOnDateSelected = ({
    selected,
    selectable,
    date,
  }: {
    selected: boolean
    selectable: boolean
    date: Date
  }) => {
    this.setState(() => ({ selectedDate: date }))
  }

  render() {
    const { selectedDate } = this.state
    return (
      <div>
        <Datepicker
          selected={this.state.selectedDate}
          onDateSelected={this._handleOnDateSelected}
        />
        {this.state.selectedDate && (
          <div style={{ paddingTop: 20, textAlign: 'center' }}>
            <p>Selected:</p>
            <p>{`${selectedDate?.toLocaleDateString()}`}</p>
          </div>
        )}
      </div>
    )
  }
}

export { Single }
