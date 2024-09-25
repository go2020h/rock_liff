import '../styles/globals.css'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null)
  const [liffError, setLiffError] = useState(null)

  useEffect(() => {
    console.log('LIFF ID:', process.env.NEXT_PUBLIC_LIFF_ID)
    import('@line/liff')
      .then((module) => {
        const liff = module.default
        console.log('LIFF init...')
        if (!process.env.NEXT_PUBLIC_LIFF_ID) {
          throw new Error('LIFF ID is not set')
        }
        return liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
      })
      .then(() => {
        console.log('LIFF init succeeded.')
        import('@line/liff').then((module) => {
          setLiffObject(module.default)
        })
      })
      .catch((error) => {
        console.log('LIFF init failed.')
        console.error('Error details:', error)
        setLiffError(error.toString())
      })
  }, [])

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject
  pageProps.liffError = liffError
  return <Component {...pageProps} />
}

export default MyApp
