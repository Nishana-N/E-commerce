import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layouts/Layout';
import { Button } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Category = () => {
    const [categories, setCategories] = useState([]);
    

    const getAllCategory = async () => {
        try {
          const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category")
          if (data.success) {
            setCategories(data.category)
          }
        } catch (error) {
          console.log(error);
          
        }
      };

      useEffect(() => {
        getAllCategory();
      }, [])
      
  return (
    <div>
        <Layout title={"Category lists"}>
            <div className='container'>
                {
                    categories.map((item) => (
                        <div key={item._id}>
                        <Link to={`/category/${item.slug}`}><Button>{item.name}</Button></Link> 
                        </div>
                        
                    ))
                }
            </div>
        </Layout>

    </div>
  )
}

export default Category