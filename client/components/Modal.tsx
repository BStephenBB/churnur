import React, { useReducer, useRef, useState } from 'react'
import { useOverlayTriggerState } from '@react-stately/overlays'
import type { OverlayTriggerState } from '@react-stately/overlays'
import { Button } from './index'
import { formatISO } from 'date-fns'
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayContainer,
} from '@react-aria/overlays'
import { useDialog } from '@react-aria/dialog'
import { FocusScope } from '@react-aria/focus'
import { useButton } from '@react-aria/button'
import { CardModalModes } from '../pages/index'

const currentUser = '1'

const addCard = async (cardData: {
  userId: number
  cardName: string
  creditLimit?: number
  totalSpend?: number
  minimumSpendingRequirement?: number
  signupBonusDueDate?: string
}) => {
  const result = await window.fetch(`http://localhost:3000/card`, {
    method: 'POST',
    headers: {
      /* 'Access-Control-Allow-Origin': '*', */
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cardData),
  })
  const json = await result.json()
  console.log('add card response')
  console.log(json)
  return json
}

function ModalDialog(props: {
  title: string
  children: React.ReactElement
  isOpen: boolean
  onClose: () => void
  isDismissable: boolean
  role: 'dialog'
}) {
  const { title, children } = props

  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  const ref = useRef(null)
  const { overlayProps } = useOverlay(props, ref)

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll()
  const { modalProps } = useModal()

  // Get props for the dialog and its title
  const { dialogProps, titleProps } = useDialog(props, ref)

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
          style={{
            background: 'white',
            color: 'black',
            padding: 30,
            borderRadius: '8px',
          }}
        >
          <h3 {...titleProps} style={{ marginTop: 0 }}>
            {title}
          </h3>
          {children}
        </div>
      </FocusScope>
    </div>
  )
}

type CardRepresentation = {
  name: string
  limit: string
  totalSpend: string
  minimumSpendingRequirement: string
  signupBonusDate: string
}

const emptyCard: CardRepresentation = {
  name: '',
  limit: '',
  totalSpend: '',
  minimumSpendingRequirement: '',
  signupBonusDate: '',
}

export enum CardActionType {
  SET_NAME = 'UPDATE_NAME',
  SET_LIMIT = 'UPDATE_LIMIT',
  SET_TOTAL_SPEND = 'UPDATE_TOTAL_SPEND',
  SET_MINIMUM_SPENDING_REQUIREMENT = 'SET_MINIMUM_SPENDING_REQUIREMENT',
  SET_SIGNUP_BONUS_DATE = 'SET_SIGNUP_BONUS_DATE',
  CLEAR = 'CLEAR',
}

// clean up and unify types at some point, want a way to not need to pass a payload based on action and have specific types for actions etc.
type CardAction = {
  type: CardActionType
  payload: string
}

const cardReducer = (previousState: CardRepresentation, action: CardAction) => {
  switch (action.type) {
    case CardActionType.SET_NAME:
      return { ...previousState, name: action.payload }
    case CardActionType.SET_LIMIT:
      return { ...previousState, limit: action.payload }
    case CardActionType.SET_TOTAL_SPEND:
      return { ...previousState, totalSpend: action.payload }
    case CardActionType.SET_MINIMUM_SPENDING_REQUIREMENT:
      return { ...previousState, minimumSpendingRequirement: action.payload }
    case CardActionType.SET_SIGNUP_BONUS_DATE:
      return { ...previousState, signupBonusDate: action.payload }
    case CardActionType.CLEAR:
      return previousState
    default:
      // maybe throw an error here?
      // for now, just return the old state
      return previousState
  }
}

export function Modal({
  state,
  mode,
}: {
  state: OverlayTriggerState
  mode: CardModalModes
}) {
  const [card, dispatchCardAction] = useReducer(cardReducer, emptyCard)
  const [cardName, setCardName] = useState('')
  const [cardLimit, setCardLimit] = useState('')
  const [totalSpend, setTotalSpend] = useState('')
  const [minimumSpendingRequirement, setMinimumSpendingRequirement] = useState(
    ''
  )
  const [signupBonusDate, setSignupBonusDate] = useState('')

  const clearModal = () => {
    setCardName('')
    setCardLimit('')
    setTotalSpend('')
    setMinimumSpendingRequirement('')
    setSignupBonusDate('')
  }

  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const isCompleteInformation =
    cardName.trim() !== '' &&
    cardLimit.trim() !== '' &&
    totalSpend.trim() !== '' &&
    minimumSpendingRequirement.trim() !== '' &&
    signupBonusDate.trim() !== ''

  const { buttonProps: closeButtonProps } = useButton(
    {
      onPress: () => {
        if (isCompleteInformation) {
          console.log('trying to make card')
          addCard({
            userId: Number(currentUser),
            cardName: cardName.trim(),
            creditLimit: cardLimit.trim()
              ? Number(cardLimit.trim())
              : undefined,
            totalSpend: totalSpend.trim()
              ? Number(totalSpend.trim())
              : undefined,
            minimumSpendingRequirement: minimumSpendingRequirement.trim()
              ? Number(minimumSpendingRequirement.trim())
              : undefined,
            signupBonusDueDate: signupBonusDate.trim()
              ? formatISO(new Date(signupBonusDate))
              : undefined,
          })
          state.close()
          clearModal()
        }
      },
    },
    closeButtonRef
  )

  // TODO actually abstract this
  return (
    <>
      {state.isOpen ? (
        <OverlayContainer>
          <ModalDialog
            title="Enter card information"
            isOpen={state.isOpen}
            onClose={() => {
              state.close()
              clearModal()
            }}
            isDismissable={true}
            role="dialog"
          >
            <form style={{ display: 'flex', flexDirection: 'column' }}>
              <label>
                Card Name:
                <input
                  placeholder="ex: Chase Sapphire Reserve"
                  value={card.name}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_NAME,
                      payload: event.target.value,
                    })
                  }}
                />
              </label>
              <label>
                Card Limit:
                <input
                  placeholder="ex: 3000.00"
                  value={card.limit}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_LIMIT,
                      payload: event.target.value,
                    })
                  }}
                />
              </label>
              <label>
                Total Spend:
                <input
                  placeholder="ex: 4321.12"
                  value={card.totalSpend}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_TOTAL_SPEND,
                      payload: event.target.value,
                    })
                  }}
                />
              </label>
              <label>
                Minimum Spending Requirement:
                <input
                  placeholder="ex: 8000.00"
                  value={card.minimumSpendingRequirement}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_MINIMUM_SPENDING_REQUIREMENT,
                      payload: event.target.value,
                    })
                  }}
                />
              </label>
              <label>
                Signup Bonus Due Date:
                <input
                  placeholder="yyyy-mm-dd"
                  value={card.signupBonusDate}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_SIGNUP_BONUS_DATE,
                      payload: event.target.value,
                    })
                  }}
                />
              </label>
              <Button
                {...closeButtonProps}
                ref={closeButtonRef}
                disabled={!isCompleteInformation}
              >
                {mode === CardModalModes.CREATE
                  ? 'Create card'
                  : 'Save changes'}
              </Button>
            </form>
          </ModalDialog>
        </OverlayContainer>
      ) : null}
    </>
  )
}
