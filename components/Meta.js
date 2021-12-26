import Head from 'next/head'
const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' key='desc' content={description} />
      <meta name='keywords' key='keywords' content={keywords} />
      <meta name='robots' key='robots' content='all' />
    </Head>
  )
}
Meta.defaultProps = {
  title: 'Software Dev Portfolio',
  description: 'Full stack dev blog',
  keywords: 'software development, engineering, javascript, portfolio',
}

export default Meta
