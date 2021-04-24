import { useRef } from 'react'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '../GlobalStyles'
import { QueryClient, QueryClientProvider } from 'react-query'
import { theme } from '../theme'
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
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#2563EB" />
      </Head>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
            <GlobalStyles />
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}
