import Socials from './Socials'
import Link from 'next/link'
const Footer = () => (
  <footer className='w-full flex flex-col items-center'>
    <Socials />

    <Link href='/blog/rewriting-my-website-with-a-devto-cms'>
      <p className='text-sm mb-4 text-gray-300 hover:text-gray-800  transition-colors'>
        © {new Date().getFullYear()}, Built with{' '}
        <a href='https://nextjs.org/'>Next.js</a>
      </p>
    </Link>
  </footer>
)

export default Footer
