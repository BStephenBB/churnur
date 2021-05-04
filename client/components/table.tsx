import React from 'react'
import styled from 'styled-components'

/* TODO not sure if these should be exported from components/index */

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

export const DefaultCell = styled.div`
  flex-shrink: 0;
`
