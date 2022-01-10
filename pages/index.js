import Bio from '../components/Bio'
import Layout from '../components/Layout'
import Meta from '../components/Meta'
import { useRouter } from 'next/router'
export default function Home() {
  return (
    <main className='w-full'>
      <Meta
        title='Damian Piwowarczyk | Personal Portfolio'
        keywords='Fullstack-developer Engineer Graduate Adelaide'
        canonical={process.env.NEXT_PUBLIC_SITE_URL + useRouter().pathname}
      />
      <Layout>
        <main className=' px-8 sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96 pt-24 h-full " style="opacity: 1; transform: none;"'>
          <Bio />
        </main>
      </Layout>
    </main>
  )
}
