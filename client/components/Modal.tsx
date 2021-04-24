import React from 'react'
import { useOverlayTriggerState } from '@react-stately/overlays'
import { Button } from './index'
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayContainer,
} from '@react-aria/overlays'
import { useDialog } from '@react-aria/dialog'
import { FocusScope } from '@react-aria/focus'
import { useButton } from '@react-aria/button'

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
  const ref = React.useRef(null)
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
  const state = useOverlayTriggerState({})
  const openButtonRef = React.useRef<HTMLButtonElement>(null)
  const closeButtonRef = React.useRef<HTMLButtonElement>(null)

  const { buttonProps: openButtonProps } = useButton(
    {
      onPress: () => state.open(),
    },
    openButtonRef
  )

  const { buttonProps: closeButtonProps } = useButton(
    {
      onPress: () => {
        console.log('hi')
        state.close()
      },
    },
    closeButtonRef
  )

  // TODO actually abstract this
  return (
    <>
      <Button {...openButtonProps} ref={openButtonRef}>
        + New Card
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
                Card Name: <input placeholder="ex: Chase Sapphire Reserve" />
              </label>
              <label>
                Card Limit: <input placeholder="ex: 3000.00" />
              </label>
              <label>
                Total Spend: <input placeholder="ex: 4321.12" />
              </label>
              <label>
                Minimum Spending Requirement:
                <input placeholder="ex: 8000.00" />
              </label>
              <label>
                Signup Bonus Due Date:
                <input placeholder="yyyy-mm-dd" />
              </label>
              <Button {...closeButtonProps} ref={closeButtonRef}>
                Submit
              </Button>
            </form>
          </ModalDialog>
        </OverlayContainer>
      ) : null}
    </>
  )
}
