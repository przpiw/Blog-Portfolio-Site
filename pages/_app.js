import '../styles/globals.css'
import TagManager from 'react-gtm-module'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: process.env.GTM_ID })
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
