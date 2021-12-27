import '../styles/globals.css'
import TagManager from 'react-gtm-module'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID })
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
