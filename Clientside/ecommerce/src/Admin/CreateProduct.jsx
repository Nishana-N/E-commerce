import React from 'react'
import Layout from '../Components/Layouts/Layout'
import Adminmenu from '../Components/Layouts/Adminmenu'

const CreateProduct = () => {
  return (
    <div>
        <Layout title={"Dashboard Create Product"}>
            <div className='row'>
                <div className='col-md-3'>
                    <Adminmenu/>
                </div>
                <div className='col-md-9'>
                    <h1>Create Product</h1>
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default CreateProduct