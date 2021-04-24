import React from 'react'
import { useOverlayTriggerState } from '@react-stately/overlays'
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayProvider,
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
  let { title, children } = props

  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  let ref = React.useRef(null)
  let { overlayProps } = useOverlay(props, ref)

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll()
  let { modalProps } = useModal()

  // Get props for the dialog and its title
  let { dialogProps, titleProps } = useDialog(props, ref)

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

function Example() {
  let state = useOverlayTriggerState({})
  let openButtonRef = React.useRef(null)
  let closeButtonRef = React.useRef(null)

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // dialog closes.
  let { buttonProps: openButtonProps } = useButton(
    {
      onPress: () => state.open(),
    },
    openButtonRef
  )

  let { buttonProps: closeButtonProps } = useButton(
    {
      onPress: () => state.close(),
    },
    closeButtonRef
  )

  return (
    <>
      <button {...openButtonProps} ref={openButtonRef}>
        Open Dialog
      </button>
      {state.isOpen ? (
        <OverlayContainer>
          <ModalDialog
            title="Enter your name"
            isOpen={state.isOpen}
            onClose={state.close}
            isDismissable={true}
            role="dialog"
          >
            <form style={{ display: 'flex', flexDirection: 'column' }}>
              <label>
                First Name: <input placeholder="John" />
              </label>
              <label>
                Last Name: <input placeholder="Smith" />
              </label>
              <button
                {...closeButtonProps}
                ref={closeButtonRef}
                style={{ marginTop: 10 }}
              >
                Submit
              </button>
            </form>
          </ModalDialog>
        </OverlayContainer>
      ) : null}
    </>
  )
}

// Application must be wrapped in an OverlayProvider so that it can be
// hidden from screen readers when a modal opens.
//;<OverlayProvider>
//  <Example />
//</OverlayProvider>
