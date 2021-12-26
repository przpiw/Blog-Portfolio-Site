import Link from 'next/link'

const BlogItem = ({ post, index }) => {
  return (
    <Link key={index} href={`blog/${post.slug}`}>
      <div key={post.slug} className='mt-6'>
        <div className='max-w-100 px-10 py-4 mx-auto bg-white hover:bg-gray-100 rounded-lg shadow-md'>
          <span className='text-xs text-gray-400'>{post.date}</span>
          <div className='mt-2'>
            <a
              href='#'
              className='  md:text-xl text-base font-bold text-gray-700 hover:underline'
            >
              {post.title}
            </a>
            <p className='mt-2 text-xs md:text-base text-gray-600'>
              {post.excerpt}
            </p>
          </div>
          <div className='mt-4 mb-2 flex flex-row'></div>
        </div>
      </div>
    </Link>
  )
}

export default BlogItem
