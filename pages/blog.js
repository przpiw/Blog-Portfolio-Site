import Layout from '../components/Layout'
import BlogItem from '../components/BlogItem'
import { getAllPosts } from '../lib/api'
import Meta from '../components/Meta'
import { useRouter } from 'next/router'

export default function Blog({ allPosts }) {
  return (
    <>
      <Layout>
        <Meta
          title='Damian Piwowarczyk Latest Blog articles'
          description='Full-stack developer blog'
          keywords='Javascript React NextJS Articles'
          canonical={process.env.NEXT_PUBLIC_SITE_URL + useRouter().pathname}
        />
        <main className='flex flex-row justify-center h-full mb-18'>
          <section className=' w-1/6 md:block hidden mr-16 ' />
          <section className=' md:w-3/6 w-3/4 '>
            <div className='max-w-4xl px-10 py-6 mx-auto   w-full flex flex-row justify-between'>
              <h1 className='text-2xl md:text-2xl lg:text-3xl mb-2 false text-gray-700'>
                Latest Articles
              </h1>
            </div>
            {allPosts.map((post, index) => (
              <BlogItem post={post} key={index} />
            ))}
            &nbsp;
          </section>

          <section className=' w-1/6 md:block hidden ml-16 mt-28 '></section>
        </main>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
