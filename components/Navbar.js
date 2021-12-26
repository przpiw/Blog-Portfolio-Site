import Link from 'next/link'
import { useState } from 'react'
import { items } from '../content/navbar'
const Navbar = () => {
  const [toggle, setToggle] = useState(true)
  return (
    <nav className='px-6 py-4 drop-shadow-sm  shadow-slate-700/10 ring-1 ring-gray-900/5'>
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
          {items.map((item, index) => (
            <Link key={index} href={`/${item.href}`}>
              <a className='my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0'>
                {item.name}
              </a>
            </Link>
          ))}
          <a
            className='my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0'
            href='mailto: abc@example.com'
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
