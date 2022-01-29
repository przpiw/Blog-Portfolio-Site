import Layout from '../components/Layout'
import Image from 'next/image'
import Meta from '../components/Meta'
import { useRouter } from 'next/router'
import { imgLoader } from '../utils/imgLoader'
import Show from '../components/Icons/Show'
export default function Portfolio() {
  return (
    <>
      <Layout>
        <Meta
          title='Damian Piwowarczyk Portfolio'
          description='Full-stack developer project potfolio'
          keywords='Javascript React NextJS Project Portfolio'
          canonical={process.env.NEXT_PUBLIC_SITE_URL + useRouter().pathname}
        />
        <main className='flex flex-row justify-center h-full mb-18'>
          <section className=' w-1/6 md:block hidden mr-16 ' />
          <section className='h-full md:w-3/6 w-3/4 pb-96'>
            <div className='max-w-4xl px-10 py-6 mx-auto  w-full flex flex-row justify-between'>
              <h1 className='text-2xl md:text-2xl lg:text-3xl mb-2 false text-gray-700'>
                Latest Projects
              </h1>
            </div>
            {/* {allPosts.map((post, index) => (
              <BlogItem post={post} key={index} />
            ))} */}
            <div className='flex flex-row justify-around gap-5 flex-wrap'>
              <div className='group relative'>
                <Image
                  loader={imgLoader}
                  src='https://i.imgur.com/Qi1NteS.png'
                  width={250}
                  height={250}
                  className='grayscale transition duration-400 group-hover:grayscale-0'
                />
                {/* <div className='absolute text-center   text-white top-0 left-0 right-0 bg-gray-500'>
                  Project Name
                </div> */}
                <div className='absolute top-0 right-0 pt-1   w-16 h-8'>
                  <div className='flex flex-row   mt-1 w-8 '>
                    <a
                      href='https://github.com/przpiw/SurveyApplication'
                      target='github'
                      rel='noopener noreferrer nofollow'
                      className='hover:text-gray-800  transition-colors mr-3'
                    >
                      <svg
                        color='#FFF'
                        aria-label='Project Repo'
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 496 512'
                        height='22px'
                        width='22px'
                        xmlns='http://www.w3.org/2000/svg'
                        alt='github'
                      >
                        <path d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'></path>
                      </svg>
                    </a>
                    <a
                      href='https://damiandev.space/auth/login'
                      target='demo'
                      rel='noopener noreferrer nofollow'
                      className='hover:text-gray-800  transition-colors mr-3'
                    >
                      <Show />
                    </a>
                  </div>
                </div>
                <div className=' absolute text-center bottom-0 left-0 right-0 opacity-80  transition h-1/3 duration-200 group-hover:bg-gray-400 '>
                  <div className='bg-gray-500 mb-2 text-white font-semibold border-b-2 transition blur-sm  duration-1000 hidden group-hover:block group-hover:blur-none'>
                    Wellbeing Surveys
                  </div>
                  <div className=' relative flex-row justify-between flex-wrap hidden group-hover:flex'>
                    <div className='font-bold  px-1'>
                      <span class='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-500 relative inline-block'>
                        <span class='relative text-white'>React</span>
                      </span>
                    </div>
                    <div className='font-bold  px-1'>
                      <span class='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-800 relative inline-block'>
                        <span class='relative text-white'>Node</span>
                      </span>
                    </div>
                    <div className='font-bold  px-1'>
                      <span class='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block'>
                        <span class='relative text-white'>Mongo</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='group relative'>
                <Image
                  loader={imgLoader}
                  src='https://i.imgur.com/Du8PPZb.png'
                  width={250}
                  height={250}
                  className='grayscale transition duration-400 group-hover:grayscale-0'
                />
                {/* <div className='absolute text-center   text-white top-0 left-0 right-0 bg-gray-500'>
                  Project Name
                </div> */}
                <div className='absolute top-0 right-0 pt-1 ml-2 bg-gray-900 opacity-70 w-20 h-9'>
                  <div className='flex flex-row  ml-2 mt-1 w-8 '>
                    <a
                      href='https://github.com/przpiw/PDFResumeBuilder'
                      target='github'
                      rel='noopener noreferrer nofollow'
                      className='hover:text-gray-800  transition-colors mr-3 '
                    >
                      <svg
                        color='#FFF'
                        aria-label='Project Repo'
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 496 512'
                        height='22px'
                        width='22px'
                        xmlns='http://www.w3.org/2000/svg'
                        alt='github'
                      >
                        <path d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'></path>
                      </svg>
                    </a>
                    <a
                      href='https://vercel.com/przpiw/pdfr-esume-builder'
                      target='demo'
                      rel='noopener noreferrer nofollow'
                      className='hover:text-gray-800  transition-colors mr-3'
                    >
                      <Show />
                    </a>
                  </div>
                </div>
                <div className=' absolute text-center bottom-0 left-0 right-0 opacity-80  transition h-1/3 duration-200 group-hover:bg-gray-400 '>
                  <div className='bg-gray-500 mb-2 text-white font-semibold border-b-2 transition blur-sm  duration-1000 hidden group-hover:block group-hover:blur-none'>
                    Resume Builder
                  </div>
                  <div className=' relative flex-row justify-between flex-wrap hidden group-hover:flex'>
                    <div className='font-bold  px-1'>
                      <span class='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-500 relative inline-block'>
                        <span class='relative text-white'>React</span>
                      </span>
                    </div>
                    <div className='font-bold  px-1'>
                      <span class='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-800 relative inline-block'>
                        <span class='relative text-white'>Next</span>
                      </span>
                    </div>
                    <div className='font-bold  px-1'>
                      <span class='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block'>
                        <span class='relative text-white'>TailwindCSS</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            &nbsp;
          </section>

          <section className=' w-1/6 md:block hidden ml-16 mt-28 '></section>
        </main>
      </Layout>
    </>
  )
}

// export async function getStaticProps() {
//   const allPosts = getAllPosts([
//     'title',
//     'date',
//     'slug',
//     'author',
//     'coverImage',
//     'excerpt',
//   ])

//   return {
//     props: { allPosts },
//   }
// }
