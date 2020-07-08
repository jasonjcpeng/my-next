
import Head from 'next/head'
import Layout, { siteTitle } from 'components/layout'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { LangLib } from 'interface'
import { fetchLangLib } from 'lib/lang'
import { useEffect, useState } from 'react'

export default function Home({
  langLib,
  config
}: {
  langLib: LangLib,
  config: any
}) {
  const [clientConfig, setClientConfig] = useState<{ [key: string]: any }>({});
  useEffect(() => {
  }, [])

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="">
        <p>{langLib?.system?.Insufficientdiamond}</p>
        <p>SSR id:{config?.iActivityId}-------------------&gt;configName:</p>
        <p>Client id:{clientConfig?.iActivityId}-------------------&gt;configName:</p>
        <p>
          <Link href="/about">
            <a >to about</a>
          </Link>
        </p>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const langLib = await fetchLangLib(context, 'index');
  return {
    props: {
      langLib: JSON.parse(langLib),
    }
  }
}