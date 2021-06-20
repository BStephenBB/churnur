import React from 'react'
import { Item } from '@react-stately/collections'
import { mergeProps } from '@react-aria/utils'
import { useButton } from '@react-aria/button'
import { useComboBoxState } from '@react-stately/combobox'
import type { ComboBoxStateProps } from '@react-stately/combobox'
import { useFilter } from '@react-aria/i18n'
import { useComboBox } from '@react-aria/combobox'
import { useListBox, useOption } from '@react-aria/listbox'
import { useOverlay, DismissButton } from '@react-aria/overlays'

// TODO improve some of the any types when you're a lil less lazy

export function ComboBox(props: ComboBoxStateProps<{}> & { label: string }) {
  // Get a basic "contains" filter function for input value
  // and option text comparison
  let { contains } = useFilter({ sensitivity: 'base' })

  // Create state based on the incoming props and the filter function
  let state = useComboBoxState({
    ...props,
    defaultFilter: contains,
  })

  let triggerRef = React.useRef<HTMLButtonElement>(null)
  let inputRef = React.useRef<HTMLInputElement>(null)
  let listBoxRef = React.useRef<HTMLUListElement>(null)
  let popoverRef = React.useRef<HTMLDivElement>(null)

  // Get props for child elements from useComboBox
  let {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps,
    labelProps,
  } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef: triggerRef,
      listBoxRef,
      popoverRef,
      menuTrigger: 'input',
    },
    state
  )

  // Get props for the trigger button based on the
  // button props from useComboBox
  let { buttonProps } = useButton(triggerProps, triggerRef)

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      <label {...labelProps}>{props.label}</label>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <input
          {...inputProps}
          ref={inputRef}
          style={{
            height: 22,
            boxSizing: 'border-box',
            marginRight: 0,
          }}
        />
        <button
          {...buttonProps}
          ref={triggerRef}
          style={{
            height: 22,
            marginLeft: 0,
          }}
        >
          <span aria-hidden="true" style={{ padding: '0 2px' }}>
            ▼
          </span>
        </button>
        {state.isOpen && (
          <ListBoxPopup
            {...listBoxProps}
            // Use virtual focus to get aria-activedescendant tracking and
            // ensure focus doesn't leave the input field
            shouldUseVirtualFocus
            listBoxRef={listBoxRef}
            popoverRef={popoverRef}
            state={state}
          />
        )}
      </div>
    </div>
  )
}

function ListBoxPopup(props: any) {
  let {
    popoverRef,
    listBoxRef,
    state,
    shouldUseVirtualFocus,
    ...otherProps
  } = props

  // Get props for the list box.
  // Prevent focus moving to list box via shouldUseVirtualFocus
  let { listBoxProps } = useListBox(
    {
      autoFocus: state.focusStrategy,
      disallowEmptySelection: true,
      shouldUseVirtualFocus,
      ...otherProps,
    },
    state,
    listBoxRef
  )

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  let { overlayProps } = useOverlay(
    {
      onClose: () => state.close(),
      shouldCloseOnBlur: true,
      isOpen: state.isOpen,
      isDismissable: true,
    },
    popoverRef
  )

  // Add a hidden <DismissButton> component at the end of the list
  // to allow screen reader users to dismiss the popup easily.
  return (
    <div {...overlayProps} ref={popoverRef}>
      <ul
        {...mergeProps(listBoxProps, otherProps)}
        ref={listBoxRef}
        style={{
          position: 'absolute',
          width: '100%',
          margin: '4px 0 0 0',
          padding: 0,
          listStyle: 'none',
          border: '1px solid gray',
          background: 'lightgray',
        }}
      >
        {[...state.collection].map((item) => (
          <Option
            shouldUseVirtualFocus
            key={item.key}
            item={item}
            state={state}
          />
        ))}
      </ul>
      <DismissButton onDismiss={() => state.close()} />
    </div>
  )
}

function Option({
  item,
  state,
  shouldUseVirtualFocus,
}: {
  item: any
  state: any
  shouldUseVirtualFocus: boolean
}) {
  let ref = React.useRef<HTMLLIElement>(null)
  let isDisabled = state.disabledKeys.has(item.key)
  let isSelected = state.selectionManager.isSelected(item.key)
  // Track focus via focusedKey state instead of with focus event listeners
  // since focus never leaves the text input in a ComboBox
  let isFocused = state.selectionManager.focusedKey === item.key

  // Get props for the option element.
  // Prevent options from receiving browser focus via shouldUseVirtualFocus.
  let { optionProps } = useOption(
    {
      key: item.key,
      isDisabled,
      isSelected,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
      shouldUseVirtualFocus,
    },
    state,
    ref
  )

  let backgroundColor
  let color = 'black'

  if (isSelected) {
    backgroundColor = 'blueviolet'
    color = 'white'
  } else if (isFocused) {
    backgroundColor = 'gray'
  } else if (isDisabled) {
    backgroundColor = 'transparent'
    color = 'gray'
  }

  return (
    <li
      {...optionProps}
      ref={ref}
      style={{
        background: backgroundColor,
        color: color,
        padding: '2px 5px',
        outline: 'none',
        cursor: 'pointer',
      }}
    >
      {item.rendered}
    </li>
  )
}
