import Head from 'next/head'
const Meta = ({ title, keywords, description, canonical }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' key='desc' content={description} />
      <meta name='keywords' key='keywords' content={keywords} />
      <meta name='robots' key='robots' content='all' />
      <meta name='content-language' content='en' />
      <meta name key='charset' charset='utf-8' />
      <meta name='geo.placename' key='geo.placename' CONTENT='Adelaide' />
      <meta name='geo.region' key='geo.region' CONTENT='Australia'></meta>
      <meta name='twitter:title' content={title}></meta>
      <link rel='canonical' href={canonical} key='canonical' />
    </Head>
  )
}
Meta.defaultProps = {
  title: 'Software Developer Portfolio',
  description: 'Personal Portfolio and Blog',
  keywords:
    'software development, software developer blog, javascript, software developer portfolio',
}

export default Meta
