import { getPostBySlug, getAllPosts } from '../../lib/api'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import Image from 'next/image'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Meta from '../../components/Meta'
export default function Post({ post }) {
  return (
    <div>
      <Layout>
        <Meta
          title={post.title}
          description={post.title}
          keywords={post.keywords}
        />
        <div className='relative w-full px-6 py-12 bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 md:max-w-3xl md:mx-auto lg:max-w-3xl lg:pt-16 lg:pb-28'>
          <main className='flex justify-center  w-full '>
            <article className='prose md:prose prose-sm w-full '>
              <h1 className='py-2 text-base md:text-2xlg text-center'>
                {post.title}
              </h1>
              <div>
                <Image
                  src={post.coverImage}
                  width={1000}
                  height={400}
                  alt='cover-image'
                />
                <div className='flex flex-col text-sm text-gray-600'>
                  <div className='pb-1'>Published by {post.author}</div>
                  <div className='text-left text-xs text-gray-500'>
                    Posted on {post.date}
                  </div>
                </div>
                <ReactMarkdown
                  children={post.content}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag='div'
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    },
                  }}
                />
              </div>
            </article>
          </main>
        </div>
      </Layout>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'coverImage',
  ])
  const content = post.content
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
