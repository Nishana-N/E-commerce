import React from 'react'
import Layout from '../Components/Layouts/Layout'
import Adminmenu from '../Components/Layouts/Adminmenu'

const CreateCategory = () => {
  return (
    <div>
        <Layout title={"Dashboard Create Category"}>
            <div className='row'>
                <div className='col-md-3'>
                    <Adminmenu/>
                </div>
                <div className='col-md-9'>
                    <h1>Create Category</h1>
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default CreateCategory