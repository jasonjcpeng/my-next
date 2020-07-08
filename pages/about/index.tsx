
import Head from 'next/head'
import Layout, { siteTitle } from 'components/layout'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { LangLib } from 'interface'
import { fetchLangLib } from 'lib/lang'

export default function About({
  langLib,
}: {
  langLib: LangLib
  config: any
}) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="">
        <p>{langLib?.about?.Cancel}</p>
        <p>
          ActiveConfig<br />
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const langLib = await fetchLangLib(context, 'about');
  return {
    props: {
      langLib: JSON.parse(langLib),
    }
  }
}
