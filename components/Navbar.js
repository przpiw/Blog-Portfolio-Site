import Link from 'next/link'
import { useState } from 'react'
const Navbar = () => {
  const [toggle, setToggle] = useState(true)
  return (
    <nav
      aria-label='banner'
      className='px-6 py-4 drop-shadow-sm  shadow-slate-700/10 ring-1 ring-gray-900/5'
    >
      <div className='container flex flex-col mx-auto md:flex-row md:items-center md:justify-between'>
        <a
          onClick={() => setToggle(!toggle)}
          className='text-lg hover:text-blue-500 '
        >
          &#60; &#47; &#62;
        </a>

        <div
          className={`flex-col  md:flex md:flex-row md:-mx-4  ${
            toggle ? 'hidden' : 'flex'
          }`}
        >
          <Link href='/'>
            <a className='my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0'>
              About
            </a>
          </Link>
          <Link href='/blog'>
            <a className='my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0'>
              Blog
            </a>
          </Link>
          <Link href='/portfolio'>
            <a className='my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0'>
              Portfolio
            </a>
          </Link>

          <a
            className='my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0'
            href='mailto: przpiw@gmail.com'
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
