import React, { useState } from 'react'
import Layout from '../Components/Layouts/Layout'
import { useAuth } from '../Context/Auth'

const Home = () => {
  const [auth,setAuth] = useAuth();
  return (
    <div>
        <Layout title={"Best Offers"}>
          <h1>Home page</h1>
          <pre>{JSON.stringify(auth,null,4)}</pre>
        </Layout>
    </div>
  )
}

export default Home;