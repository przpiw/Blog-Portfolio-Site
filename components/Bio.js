import Socials from './Socials'
import Link from 'next/link'
const Bio = () => {
  return (
    <div className='mt-14 lg:mt-32 font-light w-full text-gray-600 '>
      <h1 className='text-4xl sm:text-5xl lg:text-6xl mb-2 false text-black'>
        Hello, I'm Damian
      </h1>
      <p className='text-2xl sm:text-3xl lg:text-4xl w-11/12 sm:w-5/6 md:w-11/12 lg:w-4/5 xl:w-3/5'>
        I'm a software engineering graduate living in South Australia.
      </p>
      <Socials />
      <section className='text-base sm:text-lg font-light leading-relaxed lg:w-4/5 2xl:w-2/3 text-gray-600  mt-24 md:mt-32 xl:mt-44'>
        <h2 className='text-3xl md:text-3xl mb-4 text-black '>About</h2>
        <p className='my-2'>
          Currently working part-time as IT tech support where I most of the
          time help people to solve varius technical issues.
        </p>
        <p className='my-2'>
          In my spare time I experiment with new technologies, write blogs and
          tutorials where I share my ideas and help others to understand
          concepts that are useful for developers.
        </p>
      </section>
      <section className='text-base sm:text-lg font-light leading-relaxed lg:w-4/5 2xl:w-2/3 text-gray-600  mt-20 pb-20'>
        <Link href='/blog'>
          <h2 className='text-3xl md:text-3xl mb-4 text-black hover:text-blue-500'>
            Latest Articles
          </h2>
        </Link>
      </section>
    </div>
  )
}

export default Bio
