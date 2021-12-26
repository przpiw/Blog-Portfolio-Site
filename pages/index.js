import Bio from '../components/Bio'
import Layout from '../components/Layout'
import Meta from '../components/Meta'

export default function Home() {
  return (
    <div className='w-full'>
      <Meta
        title='Damian Piwowarczyk | Personal Portfolio'
        keywords='Fullstack-developer Engineer Graduate Adelaide'
      />
      <Layout>
        <main className=' px-8 sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96 pt-24 h-full " style="opacity: 1; transform: none;"'>
          <Bio />
        </main>
      </Layout>
    </div>
  )
}
