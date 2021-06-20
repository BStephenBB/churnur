import React from 'react'
import styled from 'styled-components'
import { InputElement, Label } from './Input'
import { mergeProps } from '@react-aria/utils'
import { useComboBoxState } from '@react-stately/combobox'
import type { Color } from '../theme'
import type { ComboBoxStateProps } from '@react-stately/combobox'
import { useFilter } from '@react-aria/i18n'
import { useComboBox } from '@react-aria/combobox'
import { useListBox, useOption } from '@react-aria/listbox'
import { useOverlay, DismissButton } from '@react-aria/overlays'

// TODO improve some of the any types when you're a lil less lazy

const ComboboxWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex-grow: 1;
`

const ComboInputAndListWrapper = styled.div`
  position: relative;
  display: inline-block;
`

const ListWrapper = styled.ul`
  position: absolute;
  width: 100%;
  z-index: 1;
  margin-top: ${({ theme }) => theme.space2};
  padding: 0;
  list-style: none;
  box-shadow: ${({ theme }) => theme.shadow.large};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.gray2};
  background: ${({ theme }) => theme.color.white};
`

const ListItem = styled.li<{ backgroundColor: Color; color: Color }>`
  background: ${({ backgroundColor, theme }) => theme.color[backgroundColor]};
  color: ${({ color, theme }) => theme.color[color]};
  padding: ${({ theme }) => theme.space(3)} ${({ theme }) => theme.space3};
  outline: none;
  font-variation-settings: 'wght' 450;
  cursor: pointer;
  font-size: ${({ theme }) => theme.text[1]};
  &:first-of-type {
    border-radius: 4px 4px 0 0;
  }
  &:last-of-type {
    border-radius: 0 0 4px 4px;
  }
  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray2};
  }
`

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
  let { inputProps, listBoxProps, labelProps } = useComboBox(
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

  return (
    <ComboboxWrapper>
      <Label {...labelProps}>{props.label}</Label>
      <ComboInputAndListWrapper>
        <InputElement
          {...inputProps}
          ref={inputRef}
          hasBox={false}
          isNumeric={false}
          fullWidth={true}
        />
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
      </ComboInputAndListWrapper>
    </ComboboxWrapper>
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
      <ListWrapper {...mergeProps(listBoxProps, otherProps)} ref={listBoxRef}>
        {[...state.collection].map((item) => (
          <Option
            shouldUseVirtualFocus
            key={item.key}
            item={item}
            state={state}
          />
        ))}
      </ListWrapper>
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

  let backgroundColor: Color = 'white'
  let color: Color = 'black'

  if (isSelected) {
    backgroundColor = 'gray2'
  } else if (isFocused) {
    backgroundColor = 'gray1'
  } else if (isDisabled) {
    // TODO if we actually want a disabled one, then these colors should be changed
    backgroundColor = 'gray4'
    color = 'gray3'
  }

  return (
    <ListItem
      {...optionProps}
      ref={ref}
      color={color}
      backgroundColor={backgroundColor}
    >
      {item.rendered}
    </ListItem>
  )
}
