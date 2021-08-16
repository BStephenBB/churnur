import styled from 'styled-components'

/* TODO not sure if these should be exported from components/index */

export const TableWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.color.gray2};
  border-top: 1px solid ${({ theme }) => theme.color.gray1};
`

export const TableRow = styled.div`
  height: ${({ theme }) => theme.space(20)};
  padding: 0 ${({ theme }) => theme.space4};
  display: flex;
  align-items: center;
  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray2};
  }
`

export const TableHeader = styled.div`
  padding: 0 ${({ theme }) => theme.space4};
  display: flex;
  height: ${({ theme }) => theme.space(16)};
  align-items: center;
  background: ${({ theme }) => theme.color.gray1};
  border-bottom: 2px solid ${({ theme }) => theme.color.gray2};
`

const ALIGNMENT_OPTIONS = {
  left: 'left',
  right: 'right',
  center: 'center',
} as const

export const DefaultCell = styled.div<{ align?: 'left' | 'right' | 'center' }>`
  flex-shrink: 0;
  flex-grow: 1;
  padding: ${({ theme }) => theme.space2};
  text-align: ${(props) =>
    props.align ? ALIGNMENT_OPTIONS[props.align] : ALIGNMENT_OPTIONS['left']};
`

export const DefaultHeaderCell = styled.div<{
  align?: 'left' | 'right' | 'center'
}>`
  flex-shrink: 0;
  padding: ${({ theme }) => theme.space2};
  flex-grow: 1;
  font-variation-settings: 'wght' 600;
  font-size: ${({ theme }) => theme.text[1]};
  color: ${({ theme }) => theme.color.gray5};
  text-align: ${(props) =>
    props.align ? ALIGNMENT_OPTIONS[props.align] : ALIGNMENT_OPTIONS['left']};
`
