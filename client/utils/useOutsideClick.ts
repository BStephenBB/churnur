import { useEffect } from 'react'

export const useOutsideClick = ({
  ref,
  action,
}: {
  ref: React.RefObject<HTMLElement>
  action: () => void
}) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        action()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      // cleanup
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, action])
}
