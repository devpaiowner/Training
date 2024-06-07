'use client'
import { Provider } from 'react-redux';
import store from '@/Store'
import './globals.css'
import './Assets/scss/style.scss'
import Script from 'next/script';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Spinner from '@/Component/Layouts/Spinner';


// import Layout from '@/Component/Layouts/Layout';
const Layout = dynamic(() => import('@/Component/Layouts/Layout'), { ssr: false })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="images/favicon.ico" type="image/x-icon" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> */}
        <title>Playxchip</title>
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <link rel="stylesheet" type="text/css" href="css/loader.css" />
      </head>
      <body className='bg-gredient1'>
        <Provider store={store}>
          <Layout>
            {!isLoaded && <Spinner />}
            {children}
          </Layout>
        </Provider>
        <Script type="text/javascript" src="js/jquery.min.js "> </Script>
        <Script type="text/javascript" src="js/bootstrap.bundle.min.js"></Script>
        {/* <Script type="text/javascript" src="js/owl.carousel.min.js "></Script> */}
        {/* <Script type="text/javascript" src="js/custom.js "></Script> */}

        <Script
          strategy="afterInteractive"
          src="https://embed.tawk.to/65532325958be55aeaaf65a6/1hf6c2j0t"
          charSet="UTF-8"
        // crossOrigin="*"
        />

      </body>
    </html>
  )
}
