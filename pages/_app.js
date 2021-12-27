import '../styles/globals.css'
import Router from 'next/router'
import { useEffect } from 'react'
import { GTMPageView } from '../utils/gmt'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChange = (url) => GTMPageView(url)
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
