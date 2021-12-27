import Socials from './Socials'
const Footer = () => (
  <footer className='w-full flex flex-col items-center'>
    <Socials />
    <p className='text-sm mb-4 text-gray-500 hover:text-gray-800  transition-colors'>
      © {new Date().getFullYear()}, Built with{' '}
      <a href='https://nextjs.org/'>Next.js</a>
    </p>
  </footer>
)

export default Footer
