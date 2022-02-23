import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <link rel="icon" href="/ico.svg" />
    </Head>
    <Component {...pageProps} />

  </>
}

export default MyApp
