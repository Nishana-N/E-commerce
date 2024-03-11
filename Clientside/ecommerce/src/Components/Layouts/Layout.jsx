import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Helmet from 'react-helmet'

const Layout = ({children,title}) => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8'/>
        <title>{title}</title>
      </Helmet>
        <Header/>
        <div>{children}</div>
        <Footer/>
    </div>
  )
}

Layout.defaultProps = {
  title :"e- Commerceapp",
 
}

export default Layout;