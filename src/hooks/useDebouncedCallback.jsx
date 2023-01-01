import debounce from 'lodash/debounce'
import { useCallback } from 'react'

export const useDebouncedCallback = (func) =>
  useCallback(
    debounce((nextValue) => func(nextValue), 300),
    []
  )
