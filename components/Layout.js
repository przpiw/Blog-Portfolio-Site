import Navbar from './Navbar'
import Footer from './Footer'
const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className='layout-container'>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
