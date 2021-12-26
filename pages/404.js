import Layout from '../components/Layout'
import Link from 'next/link'
const NotFoundPage = () => {
  return (
    <div className='layout-404'>
      <h1 className='text-3xl'>404</h1>
      <h2>Sorry, there is nothing here</h2>
      <Link href='/'>
        <a className='text-blue-500 hover:text-blue-800'>Go Back Home</a>
      </Link>
    </div>
  )
}

export default NotFoundPage
