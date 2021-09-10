import Head from 'next/head'
import Header from './header'
import Footer from './footer'
import { Container } from 'react-bootstrap'

export default function Layout({ children, title }) {
  const defaultTitle = 'シャッフル1on1'
  const headTitle = title ? `${title} | ${defaultTitle}` : defaultTitle

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <script src="https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js" async="async" defer="defer"></script>
      </Head>

      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  )
}
