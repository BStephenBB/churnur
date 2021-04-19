import { useRef } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '../GlobalStyles'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { QueryClient as ReactQueryClient } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import type { AppProps } from 'next/app'

// TODO maybe look into page props types (just `any` rn)
export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<null | ReactQueryClient>(null)

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={{}}>
          <Component {...pageProps} />
          <GlobalStyles />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
