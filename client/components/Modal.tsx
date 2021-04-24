import React, { useRef, useState } from 'react'
import { useOverlayTriggerState } from '@react-stately/overlays'
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

export function Modal() {
  const [cardName, setCardName] = useState('')
  const [cardLimit, setCardLimit] = useState('')
  const [totalSpend, setTotalSpend] = useState('')
  const [minimumSpendingRequirement, setMinimumSpendingRequirement] = useState(
    ''
  )
  const [signupBonusDate, setSignupBonusDate] = useState('')

  const state = useOverlayTriggerState({})
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const { buttonProps: openButtonProps } = useButton(
    {
      onPress: () => state.open(),
    },
    openButtonRef
  )

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
        }
      },
    },
    closeButtonRef
  )

  // TODO actually abstract this
  return (
    <>
      <Button {...openButtonProps} ref={openButtonRef}>
        + New card
      </Button>
      {state.isOpen ? (
        <OverlayContainer>
          <ModalDialog
            title="Enter card information"
            isOpen={state.isOpen}
            onClose={state.close}
            isDismissable={true}
            role="dialog"
          >
            <form style={{ display: 'flex', flexDirection: 'column' }}>
              <label>
                Card Name:
                <input
                  placeholder="ex: Chase Sapphire Reserve"
                  value={cardName}
                  onChange={(event) => {
                    setCardName(event.target.value)
                  }}
                />
              </label>
              <label>
                Card Limit:
                <input
                  placeholder="ex: 3000.00"
                  value={cardLimit}
                  onChange={(event) => {
                    setCardLimit(event.target.value)
                  }}
                />
              </label>
              <label>
                Total Spend:
                <input
                  placeholder="ex: 4321.12"
                  value={totalSpend}
                  onChange={(event) => {
                    setTotalSpend(event.target.value)
                  }}
                />
              </label>
              <label>
                Minimum Spending Requirement:
                <input
                  placeholder="ex: 8000.00"
                  value={minimumSpendingRequirement}
                  onChange={(event) => {
                    setMinimumSpendingRequirement(event.target.value)
                  }}
                />
              </label>
              <label>
                Signup Bonus Due Date:
                <input
                  placeholder="yyyy-mm-dd"
                  value={signupBonusDate}
                  onChange={(event) => {
                    setSignupBonusDate(event.target.value)
                  }}
                />
              </label>
              <Button
                {...closeButtonProps}
                ref={closeButtonRef}
                disabled={!isCompleteInformation}
              >
                Create card
              </Button>
            </form>
          </ModalDialog>
        </OverlayContainer>
      ) : null}
    </>
  )
}
