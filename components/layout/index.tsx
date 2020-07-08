import Head from 'next/head'
import styles from './layout.module.scss'

const name = '[Your Name]'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {
          <>
            <img
              src="/static/images/profile.jpg"
              className={`${styles.headerHomeImage}`}
              alt={name}
            />
            <h1>{name}</h1>
          </>
        }
      </header>
      <main>{children}</main>
    </div>
  )
}
