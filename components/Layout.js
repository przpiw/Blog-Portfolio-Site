import Navbar from './Navbar'
import Footer from './Footer'
const Layout = ({ children }) => {
  return (
    <main>
      <Navbar />
      <main className='layout-container'>{children}</main>
      <Footer />
    </main>
  )
}

export default Layout
